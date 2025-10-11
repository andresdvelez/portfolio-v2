import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// Inicializar Resend solo si la API key está disponible
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// Rate limiting store (en producción, usa Redis o similar)
const rateLimitStore = new Map<
  string,
  { count: number; resetTime: number }
>();

// Validación del schema con Zod
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre es demasiado largo"),
  email: z.string().email("Email inválido").max(100),
  company: z.string().max(100).optional(),
  interestedIn: z.string().max(100).optional(),
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(2000, "El mensaje es demasiado largo"),
  captchaToken: z.string().min(1, "Token de captcha requerido"),
});

// Función para verificar hCaptcha
async function verifyHCaptcha(token: string): Promise<boolean> {
  // En desarrollo, permitir el bypass del captcha si no hay secret key
  if (process.env.NODE_ENV === 'development' && !process.env.HCAPTCHA_SECRET_KEY) {
    console.warn('⚠️ DEV MODE: hCaptcha bypass activado (no hay HCAPTCHA_SECRET_KEY)');
    return true;
  }

  try {
    const response = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `response=${token}&secret=${process.env.HCAPTCHA_SECRET_KEY}`,
    });

    const data = await response.json();
    
    // Log para debugging
    if (!data.success) {
      console.warn('❌ hCaptcha validation failed:', data);
    }
    
    return data.success === true;
  } catch (error) {
    console.error("Error verificando hCaptcha:", error);
    return false;
  }
}

// Rate limiting: 5 mensajes por IP cada 15 minutos
function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
} {
  const now = Date.now();
  const limit = 5;
  const windowMs = 15 * 60 * 1000; // 15 minutos

  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { allowed: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: limit - record.count };
}

// Limpiar registros viejos cada hora
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}, 60 * 60 * 1000);

// Detectar contenido spam (básico)
function detectSpam(text: string): boolean {
  const spamPatterns = [
    /viagra|cialis|pharmacy/i,
    /crypto.*wallet|bitcoin.*investment/i,
    /click.*here.*now|buy.*now/i,
    /(http|https):\/\/[^\s]{50,}/g, // URLs muy largas
    /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/, // Números de tarjeta
  ];

  return spamPatterns.some((pattern) => pattern.test(text));
}

// Honeypot field check (campo oculto que los bots suelen llenar)
function checkHoneypot(body: any): boolean {
  return !!body.website || !!body.phone_number;
}

export async function POST(request: NextRequest) {
  try {
    // Obtener IP del cliente
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Verificar rate limit
    const { allowed, remaining } = checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Demasiadas solicitudes. Por favor, intenta de nuevo más tarde.",
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Remaining": "0",
            "Retry-After": "900", // 15 minutos
          },
        }
      );
    }

    const body = await request.json();

    // Verificar honeypot (campo oculto anti-bot)
    if (checkHoneypot(body)) {
      console.warn(`Honeypot triggered from IP: ${ip}`);
      // Devolver éxito falso para confundir a los bots
      return NextResponse.json(
        { success: true, message: "Mensaje enviado" },
        { status: 200 }
      );
    }

    // Validar datos con Zod
    const validatedData = contactSchema.parse(body);

    // Verificar hCaptcha
    const isCaptchaValid = await verifyHCaptcha(validatedData.captchaToken);
    if (!isCaptchaValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Verificación de captcha fallida. Por favor, intenta de nuevo.",
        },
        { status: 400 }
      );
    }

    // Detectar spam
    const fullText = `${validatedData.name} ${validatedData.email} ${validatedData.company || ''} ${validatedData.interestedIn || ''} ${validatedData.message}`;
    if (detectSpam(fullText)) {
      console.warn(`Spam detected from IP: ${ip}`);
      // Log pero no revelar al usuario que fue detectado como spam
      return NextResponse.json(
        { success: true, message: "Mensaje enviado" },
        { status: 200 }
      );
    }

    // Verificar que Resend esté configurado
    if (!resend) {
      console.error("RESEND_API_KEY no está configurado");
      return NextResponse.json(
        {
          success: false,
          message:
            "El servicio de email no está configurado. Por favor, contacta al administrador.",
        },
        { status: 503 }
      );
    }

    // Enviar email usando Resend
    const { data, error } = await resend.emails.send({
      from: "Portafolio <onboarding@resend.dev>", // Cambiar cuando tengas dominio verificado
      to: [process.env.CONTACT_EMAIL || "contact@andresvelez.co"],
      replyTo: validatedData.email,
      subject: `[Portafolio] New message from ${validatedData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <h2 style="color: #1f2937; margin-top: 0; border-bottom: 3px solid #3b82f6; padding-bottom: 10px;">
              Nuevo mensaje de contacto
            </h2>
            
            <div style="margin: 20px 0; padding: 15px; background-color: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 4px;">
              <p style="margin: 5px 0; color: #1f2937;"><strong style="color: #3b82f6;">Name:</strong> ${validatedData.name}</p>
              <p style="margin: 5px 0; color: #1f2937;"><strong style="color: #3b82f6;">Email:</strong> ${validatedData.email}</p>
              ${validatedData.company ? `<p style="margin: 5px 0; color: #1f2937;"><strong style="color: #3b82f6;">Company:</strong> ${validatedData.company}</p>` : ""}
              ${validatedData.interestedIn ? `<p style="margin: 5px 0; color: #1f2937;"><strong style="color: #3b82f6;">Interested in:</strong> ${validatedData.interestedIn}</p>` : ""}
            </div>

            <div style="margin: 20px 0;">
              <h3 style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Message:</h3>
              <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${validatedData.message}</p>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
              <p style="margin: 3px 0;">IP: ${ip}</p>
              <p style="margin: 3px 0;">Fecha: ${new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" })}</p>
            </div>
          </div>
          
          <p style="text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px;">
            Este mensaje fue enviado desde tu portafolio en andresvelez.co
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Error enviando email:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Error al enviar el mensaje. Por favor, intenta de nuevo.",
        },
        { status: 500 }
      );
    }

    console.log(`Email sent successfully. ID: ${data?.id}, From IP: ${ip}`);

    return NextResponse.json(
      {
        success: true,
        message: "Mensaje enviado con éxito",
      },
      {
        status: 200,
        headers: {
          "X-RateLimit-Remaining": remaining.toString(),
        },
      }
    );
  } catch (error) {
    console.error("Error en /api/contact:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Datos inválidos",
          errors: error.issues.map((e) => e.message),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Error interno del servidor",
      },
      { status: 500 }
    );
  }
}

// Rechazar otros métodos HTTP
export async function GET() {
  return NextResponse.json(
    { success: false, message: "Método no permitido" },
    { status: 405 }
  );
}

