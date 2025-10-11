# 🚀 Quick Start - Sistema de Contacto

## ⚡ Inicio Rápido (5 minutos)

### 1️⃣ Obtener API Keys

**hCaptcha** (2 minutos):
1. Ve a [https://dashboard.hcaptcha.com/signup](https://dashboard.hcaptcha.com/signup)
2. Regístrate con tu email
3. Clic en "New Site"
4. Hostname: `andresvelez.co` + `localhost`
5. Copia las claves ✅

**Resend** (3 minutos):
1. Ve a [https://resend.com/signup](https://resend.com/signup)
2. Regístrate con GitHub/Google
3. Ve a [API Keys](https://resend.com/api-keys)
4. Clic en "Create API Key"
5. Copia la clave ✅

### 2️⃣ Configurar Variables

Crea `.env.local` en la raíz del proyecto:

```bash
# Pegar en terminal:
cat > .env.local << 'EOF'
# hCaptcha
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=PEGA_TU_SITE_KEY_AQUI
HCAPTCHA_SECRET_KEY=PEGA_TU_SECRET_KEY_AQUI

# Resend
RESEND_API_KEY=PEGA_TU_API_KEY_AQUI

# Config
CONTACT_EMAIL=contact@andresvelez.co
NEXT_PUBLIC_BASE_URL=http://localhost:3000
EOF
```

**Reemplaza** las claves con las que copiaste ☝️

### 3️⃣ Probar

```bash
# 1. Instalar (si no lo has hecho)
bun install

# 2. Iniciar servidor
nvm use 20
bun dev

# 3. Abrir navegador
# http://localhost:3000
```

### 4️⃣ Usar el Formulario

1. Scroll al footer (abajo del todo)
2. Clic en el botón azul **"Get in touch"**
3. Completa el formulario
4. Enviar
5. ¡Deberías recibir el email! 📧

---

## 🎯 Para Producción (Vercel)

### 1. Agregar Variables en Vercel

Dashboard → Tu Proyecto → Settings → Environment Variables

Agregar estas 5 variables:

| Variable | Valor | Environment |
|----------|-------|-------------|
| `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` | Tu site key | Production, Preview |
| `HCAPTCHA_SECRET_KEY` | Tu secret key | Production, Preview |
| `RESEND_API_KEY` | Tu API key | Production, Preview |
| `CONTACT_EMAIL` | `contact@andresvelez.co` | Production, Preview |
| `NEXT_PUBLIC_BASE_URL` | `https://www.andresvelez.co` | Production |

### 2. Deploy

```bash
git add .
git commit -m "feat: sistema de contacto seguro"
git push
```

### 3. Actualizar hCaptcha

1. Ve a [hCaptcha Dashboard](https://dashboard.hcaptcha.com/)
2. Edita tu sitio
3. Agrega hostname: `www.andresvelez.co` y `andresvelez.co`
4. Guardar

### 4. Probar en Producción

1. Ve a [https://www.andresvelez.co](https://www.andresvelez.co)
2. Scroll al footer
3. Clic en "Get in touch"
4. Enviar mensaje de prueba
5. Verificar recepción ✅

---

## 🔧 Solución Rápida de Problemas

### No recibo emails

```bash
# 1. Verificar variables de entorno
bun dev
# Buscar en logs: "RESEND_API_KEY no está configurado"

# 2. Verificar en Resend Dashboard
# https://resend.com/emails
# ¿Aparece el email enviado?

# 3. Revisar carpeta de spam
```

### Error de hCaptcha

```bash
# 1. Verificar que agregaste tu dominio en hCaptcha
# 2. Verificar NEXT_PUBLIC_HCAPTCHA_SITE_KEY
# 3. Abrir consola del navegador (F12) para ver errores
```

### Build Error

```bash
# Usar Node 20
nvm use 20
bun run build
```

---

## 📚 Documentación Completa

- **Configuración detallada:** [`ENV_SETUP.md`](./ENV_SETUP.md)
- **Seguridad:** [`SECURITY.md`](./SECURITY.md)
- **Sistema completo:** [`CONTACT_SYSTEM.md`](./CONTACT_SYSTEM.md)
- **Resumen:** [`IMPLEMENTACION_COMPLETA.md`](./IMPLEMENTACION_COMPLETA.md)

---

## ✅ Checklist Mínimo

- [ ] Obtener hCaptcha keys
- [ ] Obtener Resend API key
- [ ] Crear `.env.local`
- [ ] Pegar las claves en `.env.local`
- [ ] `bun dev`
- [ ] Probar formulario
- [ ] ¿Recibiste el email? → ✅ ¡Listo!

---

## 🎉 ¡Eso es todo!

Tu portafolio ahora tiene un sistema de contacto profesional con:

- ✅ Protección contra bots (hCaptcha)
- ✅ Rate limiting (5 msg/15min)
- ✅ Detección de spam
- ✅ Diseño moderno
- ✅ Emails formateados

**Tiempo total de setup:** ~5-10 minutos

---

**¿Problemas?** Lee [`ENV_SETUP.md`](./ENV_SETUP.md) para guía detallada.

**¿Dudas de seguridad?** Lee [`SECURITY.md`](./SECURITY.md) para análisis completo.

