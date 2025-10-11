# 🔐 Configuración de Variables de Entorno

Para que el sistema de contacto funcione correctamente, necesitas configurar las siguientes variables de entorno.

## 📋 Variables Requeridas

Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:

```env
# URL base del sitio (para producción)
NEXT_PUBLIC_BASE_URL=https://www.andresvelez.co

# hCaptcha Keys
# Obtén tus claves en: https://dashboard.hcaptcha.com/
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=tu_hcaptcha_site_key_aqui
HCAPTCHA_SECRET_KEY=tu_hcaptcha_secret_key_aqui

# Resend API Key
# Obtén tu clave en: https://resend.com/api-keys
RESEND_API_KEY=re_tu_resend_api_key_aqui

# Email de contacto donde recibirás los mensajes
CONTACT_EMAIL=contact@andresvelez.co
```

## 🛠️ Cómo Obtener las Claves

### 1️⃣ hCaptcha

1. Ve a [hCaptcha Dashboard](https://dashboard.hcaptcha.com/)
2. Inicia sesión o crea una cuenta
3. Haz clic en "New Site"
4. Configura tu sitio:
   - **Hostname**: `andresvelez.co` (sin www)
   - También agrega: `www.andresvelez.co` y `localhost` (para desarrollo)
5. Copia las claves:
   - `NEXT_PUBLIC_HCAPTCHA_SITE_KEY`: Clave pública (va en el frontend)
   - `HCAPTCHA_SECRET_KEY`: Clave secreta (solo en el backend)

### 2️⃣ Resend

1. Ve a [Resend](https://resend.com/)
2. Crea una cuenta o inicia sesión
3. Ve a [API Keys](https://resend.com/api-keys)
4. Haz clic en "Create API Key"
5. Dale un nombre descriptivo (ej: "Portafolio Contact Form")
6. Copia la clave y pégala en `RESEND_API_KEY`

**Nota:** Para enviar emails desde tu propio dominio:
- Ve a [Domains](https://resend.com/domains) en Resend
- Agrega tu dominio `andresvelez.co`
- Configura los registros DNS requeridos
- Una vez verificado, actualiza el email "from" en `/src/app/api/contact/route.ts` línea 118:
  ```typescript
  from: "Portafolio <noreply@andresvelez.co>", // Cambia esto
  ```

### 3️⃣ Variables Adicionales

- `NEXT_PUBLIC_BASE_URL`: URL de tu sitio en producción
- `CONTACT_EMAIL`: Email donde recibirás los mensajes del formulario

## 🚀 Desarrollo Local

Para desarrollo local, tu `.env.local` debería verse así:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=tu_clave_aqui
HCAPTCHA_SECRET_KEY=tu_clave_aqui
RESEND_API_KEY=tu_clave_aqui
CONTACT_EMAIL=contact@andresvelez.co
```

## 🔒 Seguridad

⚠️ **IMPORTANTE:**

- ✅ `.env.local` está incluido en `.gitignore` por defecto
- ❌ **NUNCA** subas las claves secretas a GitHub
- ✅ Solo las variables con `NEXT_PUBLIC_` son visibles en el frontend
- ✅ Las demás variables solo están disponibles en el servidor

## 📦 Variables en Vercel (Producción)

Si usas Vercel para deployment:

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Haz clic en "Settings" > "Environment Variables"
3. Agrega cada variable:
   - `NEXT_PUBLIC_BASE_URL`
   - `NEXT_PUBLIC_HCAPTCHA_SITE_KEY`
   - `HCAPTCHA_SECRET_KEY`
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
4. Asegúrate de seleccionar los ambientes correctos (Production, Preview, Development)
5. Haz un nuevo deployment para que se apliquen los cambios

## 🧪 Verificar la Configuración

Después de configurar las variables, ejecuta:

```bash
bun dev
```

1. Ve a tu portafolio en `http://localhost:3000`
2. Navega a la sección de contacto
3. Haz clic en "Get in touch" o en el botón con tu email
4. Completa el formulario y envía
5. Deberías recibir el email en tu bandeja de entrada

## 🐛 Solución de Problemas

### El formulario no se envía

- Verifica que todas las variables estén configuradas
- Revisa la consola del navegador para errores
- Verifica los logs del servidor con `bun dev`

### Error de hCaptcha

- Verifica que `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` sea correcta
- Asegúrate de haber agregado tu dominio en hCaptcha Dashboard
- Para desarrollo local, agrega `localhost` en hCaptcha

### Error al enviar email

- Verifica que `RESEND_API_KEY` sea correcta
- Verifica que el email `CONTACT_EMAIL` sea válido
- Revisa los logs de Resend en su dashboard

## 📞 Soporte

Si tienes problemas:
- Revisa la [documentación de hCaptcha](https://docs.hcaptcha.com/)
- Revisa la [documentación de Resend](https://resend.com/docs)
- Verifica los logs en la consola del navegador y del servidor

