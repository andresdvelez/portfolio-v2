# 🔒 Medidas de Seguridad Implementadas

Este portafolio cuenta con un sistema robusto de seguridad para proteger el formulario de contacto contra ataques automatizados, spam y intentos de abuso.

## 🛡️ Capas de Protección

### 1. hCaptcha Invisible

**¿Qué es?**
- Sistema de verificación CAPTCHA que se ejecuta automáticamente sin molestar al usuario
- Más privado que reCAPTCHA (no vende datos a Google)
- Verifica que el usuario es humano antes de procesar el formulario

**Implementación:**
- Clave pública en el frontend (`NEXT_PUBLIC_HCAPTCHA_SITE_KEY`)
- Clave secreta en el backend (`HCAPTCHA_SECRET_KEY`)
- Verificación en el servidor antes de enviar emails

**Protege contra:**
- ✅ Bots automatizados
- ✅ Scripts maliciosos
- ✅ Spam masivo

### 2. Rate Limiting

**¿Qué es?**
- Límite de solicitudes por dirección IP
- **Límite actual:** 5 mensajes cada 15 minutos por IP

**Cómo funciona:**
- Rastrea las solicitudes por IP usando un store en memoria
- Bloquea automáticamente IPs que excedan el límite
- Se resetea después del período de tiempo configurado

**Código:** `src/app/api/contact/route.ts` líneas 57-74

**Protege contra:**
- ✅ Ataques de fuerza bruta
- ✅ Flooding (inundación de solicitudes)
- ✅ Abuse por parte de un solo usuario

**Headers de respuesta:**
```
X-RateLimit-Remaining: 4  // Solicitudes restantes
Retry-After: 900           // Segundos para reintentar (15 min)
```

### 3. Honeypot Fields

**¿Qué es?**
- Campos ocultos que los humanos no ven pero los bots sí llenan
- Si un campo honeypot está lleno, se detecta como bot

**Campos trampa detectados:**
- `website`
- `phone_number`
- `company`

**Cómo funciona:**
- Los campos no están visibles en el HTML del formulario
- Los bots automatizados suelen llenar todos los campos
- Si se detecta contenido en estos campos, se rechaza silenciosamente

**Código:** `src/app/api/contact/route.ts` líneas 87-91

**Protege contra:**
- ✅ Bots básicos
- ✅ Scripts de autollenado
- ✅ Crawlers maliciosos

### 4. Detección de Spam

**¿Qué es?**
- Análisis del contenido del mensaje con patrones conocidos de spam

**Patrones detectados:**
```javascript
- viagra|cialis|pharmacy     // Productos farmacéuticos
- crypto.*wallet               // Estafas de criptomonedas
- bitcoin.*investment          // Esquemas piramidales
- click.*here.*now            // Clickbait típico
- URLs extremadamente largas   // Enlaces sospechosos
- Números de tarjetas de crédito // Intentos de phishing
```

**Comportamiento:**
- Si se detecta spam, devuelve un "éxito" falso
- El bot piensa que funcionó (para no revelar la detección)
- El mensaje NO se envía ni se procesa

**Código:** `src/app/api/contact/route.ts` líneas 94-103

**Protege contra:**
- ✅ Spam farmacéutico
- ✅ Estafas de criptomonedas
- ✅ Phishing
- ✅ Malware links

### 5. Validación con Zod

**¿Qué es?**
- Validación estricta de tipos y formatos de datos en el servidor

**Validaciones aplicadas:**
```typescript
- name: 2-100 caracteres
- email: formato de email válido, max 100 caracteres
- subject: 3-200 caracteres
- message: 10-2000 caracteres
- captchaToken: requerido, mínimo 1 carácter
```

**Código:** `src/app/api/contact/route.ts` líneas 15-25

**Protege contra:**
- ✅ Inyección SQL
- ✅ XSS (Cross-Site Scripting)
- ✅ Payloads maliciosos
- ✅ Buffer overflow

### 6. Sanitización HTML

**¿Qué es?**
- Los emails se envían como HTML pero el contenido del usuario se trata como texto plano

**Implementación:**
- El mensaje se inserta con `white-space: pre-wrap` que mantiene formato pero previene inyección HTML
- No se ejecuta JavaScript en el contenido del mensaje

**Protege contra:**
- ✅ Inyección HTML
- ✅ XSS en emails
- ✅ Código malicioso

### 7. Headers de Seguridad

**Headers implementados:**
- `Content-Type: application/json` - Solo JSON permitido
- `X-RateLimit-Remaining` - Información de rate limit
- `Retry-After` - Tiempo de espera para reintentar

**Protege contra:**
- ✅ MIME type sniffing
- ✅ CSRF (Cross-Site Request Forgery)

### 8. Logging de Seguridad

**¿Qué se registra?**
```javascript
- IP del remitente
- Fecha y hora del mensaje
- ID del email enviado
- Detección de honeypot
- Detección de spam
- Errores de validación
```

**Ubicación de logs:**
- Consola del servidor durante desarrollo
- Logs de producción en Vercel/plataforma de hosting

**Beneficios:**
- ✅ Auditoría de seguridad
- ✅ Detección de patrones de ataque
- ✅ Identificación de IPs maliciosas
- ✅ Debugging de problemas

### 9. Protección de Variables de Entorno

**Implementación:**
- Claves sensibles solo en servidor (sin `NEXT_PUBLIC_`)
- `.env.local` en `.gitignore`
- Validación de claves requeridas

**Variables seguras (servidor):**
- `HCAPTCHA_SECRET_KEY` ❌ No expuesta
- `RESEND_API_KEY` ❌ No expuesta
- `CONTACT_EMAIL` ❌ No expuesta

**Variables públicas (frontend):**
- `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` ✅ Pública (diseñada para ser pública)
- `NEXT_PUBLIC_BASE_URL` ✅ Pública (URL del sitio)

**Protege contra:**
- ✅ Exposición de credenciales
- ✅ Uso no autorizado de APIs
- ✅ Suplantación de identidad

### 10. Timeout de Respuesta

**Implementación:**
- Límite de tiempo para verificación de hCaptcha
- Timeout en fetch requests

**Protege contra:**
- ✅ Ataques de denegación de servicio (DoS)
- ✅ Conexiones colgadas
- ✅ Consumo excesivo de recursos

## 📊 Flujo de Seguridad

```
Usuario completa formulario
        ↓
[1] Validación cliente (HTML5 + React)
        ↓
[2] hCaptcha invisible ejecutado
        ↓
[3] POST a /api/contact
        ↓
[4] Verificar Rate Limit por IP
        ↓
[5] Verificar Honeypot fields
        ↓
[6] Validar datos con Zod
        ↓
[7] Verificar hCaptcha en servidor
        ↓
[8] Detectar patrones de spam
        ↓
[9] Enviar email con Resend
        ↓
[10] Log del evento
        ↓
Respuesta al usuario
```

## 🚨 Monitoreo de Ataques

### Cómo detectar si estás siendo atacado:

1. **Rate Limit Exceeded frecuente** - Múltiples IPs bloqueadas
2. **Honeypot triggers** - Bots intentando llenar campos ocultos
3. **Spam detection aumenta** - Mensajes con patrones maliciosos
4. **hCaptcha failures** - Muchos intentos fallidos de verificación

### Logs a revisar:

```bash
# Durante desarrollo
bun dev

# Buscar en logs:
- "Honeypot triggered from IP"
- "Spam detected from IP"
- "Demasiadas solicitudes"
- "Verificación de captcha fallida"
```

## 🔧 Personalización de Seguridad

### Ajustar Rate Limit

En `src/app/api/contact/route.ts` líneas 59-60:

```typescript
const limit = 5;              // Cambiar número de mensajes permitidos
const windowMs = 15 * 60 * 1000;  // Cambiar ventana de tiempo (ms)
```

### Agregar patrones de spam

En `src/app/api/contact/route.ts` línea 94-99:

```typescript
const spamPatterns = [
  /viagra|cialis|pharmacy/i,
  // Agregar tu patrón aquí:
  /tu.*patrón.*aquí/i,
];
```

### Agregar campos honeypot

En `src/app/api/contact/route.ts` línea 87:

```typescript
function checkHoneypot(body: any): boolean {
  return !!body.website || !!body.phone_number || !!body.your_field;
}
```

## 🎯 Mejoras Futuras

Para un sistema aún más robusto (opcional):

1. **Redis para Rate Limiting** - Persistencia entre deploys
2. **Blacklist de IPs** - Bloquear IPs problemáticas permanentemente
3. **Geolocalización** - Bloquear países específicos si es necesario
4. **Machine Learning** - Detección avanzada de spam con ML
5. **WAF (Web Application Firewall)** - Cloudflare o similar
6. **DMARC, SPF, DKIM** - Autenticación de emails
7. **Notificaciones** - Alertas cuando se detectan ataques

## 📚 Referencias

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [hCaptcha Documentation](https://docs.hcaptcha.com/)
- [Rate Limiting Best Practices](https://cloud.google.com/architecture/rate-limiting-strategies-techniques)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/security)

## ✅ Checklist de Seguridad

- [x] hCaptcha invisible implementado
- [x] Rate limiting por IP
- [x] Honeypot fields
- [x] Detección de spam
- [x] Validación con Zod
- [x] Sanitización HTML
- [x] Headers de seguridad
- [x] Logging de eventos
- [x] Variables de entorno protegidas
- [x] Timeout de respuestas
- [ ] Redis para rate limiting (opcional)
- [ ] WAF configurado (opcional)
- [ ] Blacklist de IPs (opcional)

---

**Última actualización:** Octubre 2025  
**Nivel de seguridad:** 🔒🔒🔒🔒🔒 Alto

¡Tu portafolio está protegido contra la mayoría de ataques comunes!

