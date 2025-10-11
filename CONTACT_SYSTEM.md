# 📧 Sistema de Contacto Seguro - Resumen de Implementación

## ✅ Componentes Implementados

### 1. 📝 Formulario de Contacto (`/src/components/ContactForm/index.tsx`)

**Características:**
- ✨ Modal interactivo con animaciones de Framer Motion
- 🎨 Diseño moderno y responsivo
- ✅ Validación en tiempo real (HTML5)
- 🤖 hCaptcha invisible integrado
- 📊 Estados de envío (loading, success, error)
- ♿ Accesible (ARIA labels, focus management)

**Campos del formulario:**
- Nombre (2-100 caracteres)
- Email (validación de formato)
- Asunto (3-200 caracteres)
- Mensaje (10-2000 caracteres)

**Experiencia de usuario:**
```
Usuario hace clic en "Get in touch"
    ↓
Se abre modal con formulario
    ↓
Usuario completa campos
    ↓
hCaptcha se ejecuta invisiblemente
    ↓
Mensaje se envía
    ↓
Confirmación visual (verde/rojo)
    ↓
Modal se cierra automáticamente (éxito)
```

---

### 2. 🔌 API Route (`/src/app/api/contact/route.ts`)

**Endpoints:**
- `POST /api/contact` - Enviar mensaje
- `GET /api/contact` - Rechazado (405)

**Capas de seguridad:**

#### a) Rate Limiting
```typescript
Límite: 5 mensajes cada 15 minutos por IP
Store: Map en memoria (mejorable con Redis)
Headers: X-RateLimit-Remaining, Retry-After
```

#### b) hCaptcha Server-Side Verification
```typescript
Verifica token con API de hCaptcha
Endpoint: https://hcaptcha.com/siteverify
Rechaza si falla la verificación
```

#### c) Honeypot Detection
```typescript
Campos trampa: website, phone_number, company
Si están llenos = BOT detectado
Respuesta: "Éxito" falso (confunde al bot)
```

#### d) Spam Detection
```typescript
Patrones detectados:
- Farmacia: viagra, cialis, pharmacy
- Cripto: crypto.*wallet, bitcoin.*investment
- Clickbait: click.*here.*now, buy.*now
- URLs sospechosas (>50 caracteres)
- Números de tarjetas de crédito
```

#### e) Validación con Zod
```typescript
Schema estricto con:
- Tipos de datos
- Longitudes min/max
- Formatos (email)
- Campos requeridos
```

#### f) Logging de Seguridad
```typescript
Registra:
- IP del remitente
- Timestamp
- Eventos de seguridad (honeypot, spam)
- ID del email enviado
- Errores de validación
```

---

### 3. 🎨 Integración en Footer (`/src/components/Footer/index.tsx`)

**Cambios realizados:**

**Antes:**
```typescript
onClick={() => window.location.href = "mailto:contact@andresvelez.co"}
```

**Después:**
```typescript
onClick={() => setShowContactForm(true)}
// Abre modal con formulario seguro
```

**Botones disponibles:**
1. **"Get in touch"** (botón redondo azul) → Abre formulario
2. **"contact@andresvelez.co"** → Abre formulario
3. **"Enviar email directo"** → Abre cliente de correo (mailto)

**Modal:**
- Fondo con blur
- Click fuera para cerrar
- Animaciones suaves
- Responsive (mobile/desktop)

---

## 🔐 Variables de Entorno Requeridas

```env
# hCaptcha (obtener en https://dashboard.hcaptcha.com/)
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=tu_clave_publica
HCAPTCHA_SECRET_KEY=tu_clave_secreta

# Resend (obtener en https://resend.com/api-keys)
RESEND_API_KEY=re_tu_clave_api

# Configuración
CONTACT_EMAIL=contact@andresvelez.co
NEXT_PUBLIC_BASE_URL=https://www.andresvelez.co
```

**📄 Ver guía completa:** [`ENV_SETUP.md`](./ENV_SETUP.md)

---

## 📦 Dependencias Instaladas

```json
{
  "@hcaptcha/react-hcaptcha": "^1.12.1",  // Componente React de hCaptcha
  "resend": "^6.1.2",                      // SDK para envío de emails
  "zod": "^4.1.12"                         // Validación de schemas
}
```

---

## 🚀 Flujo Completo del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│ 1. USUARIO HACE CLIC EN "GET IN TOUCH"                     │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. SE ABRE MODAL CON FORMULARIO                            │
│    - Campos vacíos                                          │
│    - hCaptcha cargado (invisible)                          │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. USUARIO COMPLETA CAMPOS                                  │
│    ✓ Nombre                                                 │
│    ✓ Email                                                  │
│    ✓ Asunto                                                 │
│    ✓ Mensaje                                                │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. USUARIO HACE CLIC EN "ENVIAR MENSAJE"                   │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. VALIDACIÓN FRONTEND                                      │
│    - HTML5 validation                                       │
│    - React state validation                                 │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│ 6. hCAPTCHA SE EJECUTA (INVISIBLE)                          │
│    - Analiza comportamiento del usuario                     │
│    - Genera token de verificación                           │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│ 7. POST A /api/contact                                      │
│    Headers:                                                 │
│    - Content-Type: application/json                         │
│    - X-Forwarded-For: [IP]                                 │
│                                                             │
│    Body:                                                    │
│    - name, email, subject, message                          │
│    - captchaToken                                           │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│ 8. BACKEND: VERIFICAR RATE LIMIT                            │
│    - Obtener IP del request                                 │
│    - Consultar Map de rate limits                           │
│    - Si > 5 mensajes en 15 min → RECHAZAR (429)           │
│    - Si OK → Incrementar contador                           │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│ 9. BACKEND: VERIFICAR HONEYPOT                              │
│    - Revisar campos: website, phone_number, company        │
│    - Si alguno tiene contenido → BOT DETECTADO             │
│    - Retornar "éxito" falso (confundir al bot)            │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│ 10. BACKEND: VALIDAR CON ZOD                                │
│     - Verificar tipos de datos                              │
│     - Verificar longitudes                                  │
│     - Verificar formato de email                            │
│     - Si falla → RECHAZAR (400) con detalles               │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│ 11. BACKEND: VERIFICAR hCAPTCHA                             │
│     - POST a https://hcaptcha.com/siteverify               │
│     - Enviar token + secret key                             │
│     - Si falla → RECHAZAR (400)                            │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│ 12. BACKEND: DETECTAR SPAM                                  │
│     - Analizar texto con patrones regex                     │
│     - Detectar: viagra, crypto, clickbait, etc.            │
│     - Si es spam → Log + "éxito" falso                     │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│ 13. BACKEND: ENVIAR EMAIL CON RESEND                        │
│     - Formatear email HTML                                  │
│     - From: noreply@resend.dev (cambiar con dominio)       │
│     - To: contact@andresvelez.co                            │
│     - Reply-To: email del usuario                           │
│     - Incluir metadata: IP, timestamp                       │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│ 14. BACKEND: LOG DEL EVENTO                                 │
│     console.log("Email sent successfully")                  │
│     - IP del remitente                                      │
│     - ID del email                                          │
│     - Timestamp                                             │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│ 15. RESPUESTA AL FRONTEND                                   │
│     Status: 200                                             │
│     Body: { success: true, message: "..." }                │
│     Headers: X-RateLimit-Remaining: 4                      │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│ 16. FRONTEND: MOSTRAR ÉXITO                                 │
│     - Mensaje verde con checkmark                           │
│     - "¡Mensaje enviado con éxito!"                        │
│     - Resetear formulario                                   │
│     - Cerrar modal en 3 segundos                            │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Cómo Probar el Sistema

### Desarrollo Local

1. **Configurar variables de entorno:**
```bash
# Crear .env.local
cp .env.example .env.local

# Editar con tus claves
nano .env.local
```

2. **Iniciar servidor:**
```bash
bun dev
```

3. **Probar formulario:**
- Navega a `http://localhost:3000`
- Scroll hasta el footer
- Click en "Get in touch"
- Completa el formulario
- Enviar

4. **Verificar logs:**
```bash
# En la consola verás:
[POST] /api/contact
Email sent successfully. ID: re_xxx, From IP: ::1
```

5. **Revisar email:**
- Abre tu bandeja de entrada en `CONTACT_EMAIL`
- Deberías recibir el mensaje

---

### Probar Rate Limiting

```bash
# Enviar 6 mensajes rápidamente
# El 6to será rechazado con:
{
  "success": false,
  "message": "Demasiadas solicitudes. Por favor, intenta de nuevo más tarde."
}
# Status: 429
# Header: Retry-After: 900
```

---

### Probar Detección de Spam

Intenta enviar un mensaje con:
- Palabras: "viagra", "cialis", "crypto wallet"
- URLs muy largas
- Resultado: "Éxito" (pero no se envía realmente)

---

## 📊 Estadísticas de Seguridad

| Capa de Protección | Nivel | Implementado |
|-------------------|-------|--------------|
| hCaptcha Invisible | 🔒🔒🔒🔒🔒 | ✅ |
| Rate Limiting | 🔒🔒🔒🔒⚪ | ✅ |
| Honeypot Fields | 🔒🔒🔒⚪⚪ | ✅ |
| Spam Detection | 🔒🔒🔒🔒⚪ | ✅ |
| Validación Zod | 🔒🔒🔒🔒🔒 | ✅ |
| Logging | 🔒🔒🔒⚪⚪ | ✅ |

**Nivel de seguridad general:** 🔒🔒🔒🔒⚪ (4/5)

---

## 🚨 Mantenimiento

### Monitoreo Regular

**Revisar logs semanalmente:**
```bash
grep "Honeypot triggered" logs.txt
grep "Spam detected" logs.txt
grep "429" logs.txt  # Rate limit exceeded
```

**Métricas a monitorear:**
- Número de mensajes legítimos vs spam
- IPs bloqueadas por rate limiting
- Detecciones de honeypot
- Errores de validación

### Actualizar Dependencias

```bash
# Cada mes
bun update @hcaptcha/react-hcaptcha
bun update resend
bun update zod
```

---

## 🎓 Referencias

- **hCaptcha:** [https://docs.hcaptcha.com/](https://docs.hcaptcha.com/)
- **Resend:** [https://resend.com/docs](https://resend.com/docs)
- **Zod:** [https://zod.dev/](https://zod.dev/)
- **Rate Limiting:** [ENV_SETUP.md](./ENV_SETUP.md)
- **Seguridad:** [SECURITY.md](./SECURITY.md)

---

## ✅ Checklist de Deployment

- [ ] Obtener claves de hCaptcha
- [ ] Obtener API key de Resend
- [ ] Configurar dominio en Resend (opcional)
- [ ] Agregar variables en Vercel/hosting
- [ ] Probar formulario en producción
- [ ] Verificar recepción de emails
- [ ] Probar rate limiting
- [ ] Monitorear logs los primeros días
- [ ] Configurar alertas (opcional)

---

**🎉 ¡Sistema de contacto seguro completamente implementado!**

Para más detalles técnicos, consulta:
- [`SECURITY.md`](./SECURITY.md) - Análisis profundo de seguridad
- [`ENV_SETUP.md`](./ENV_SETUP.md) - Guía de configuración

