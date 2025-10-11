# 🚀 Portafolio de Andrés Vélez

Portafolio profesional de Andrés Vélez - Desarrollador de Software Full Stack.

**🌐 Sitio en producción**: [www.andresvelez.co](https://www.andresvelez.co)

---

## 📋 Descripción

Portafolio personal optimizado para SEO que presenta mi experiencia como desarrollador Full Stack, co-fundador de Norvik Tech y Ganado Co, con especialización en React, Next.js, TypeScript, Blockchain e Inteligencia Artificial.

**✨ Incluye sistema de contacto seguro con:**
- ✅ hCaptcha invisible para protección contra bots
- ✅ Rate limiting (5 mensajes/15min por IP)
- ✅ Detección de spam y honeypot fields
- ✅ Validación robusta con Zod
- ✅ Integración con Resend para envío de emails

**📖 Quick Start:** [`QUICK_START.md`](./QUICK_START.md) - Setup en 5 minutos

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **UI Components**: NextUI
- **Animaciones**: Framer Motion
- **Package Manager**: Bun

## 🚀 Desarrollo Local

### Requisitos Previos

- Node.js 18+ o Bun instalado
- Git

### Instalación

```bash
# Clonar el repositorio
git clone [tu-repositorio]

# Instalar dependencias
bun install

# Configurar variables de entorno (ver ENV_SETUP.md)
cp .env.example .env.local
# Editar .env.local con tus claves

# Ejecutar en desarrollo
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Variables de Entorno

Crea un archivo `.env.local` con:

```bash
# URL base del sitio
NEXT_PUBLIC_BASE_URL=https://www.andresvelez.co

# Para desarrollo local, usa:
# NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 📦 Construcción para Producción

```bash
# Construir el proyecto
bun run build

# Ejecutar en producción
bun start
```

## 📊 Características SEO

Este portafolio está completamente optimizado para SEO con:

- ✅ **Metadata completa** con keywords estratégicas
- ✅ **Schema.org JSON-LD** tipo "Person"
- ✅ **Open Graph** y Twitter Cards
- ✅ **Sitemap.xml** con imágenes
- ✅ **Robots.txt** optimizado
- ✅ **Alt texts** descriptivos en todas las imágenes
- ✅ **Contenido en español** para audiencia colombiana
- ✅ **Locale es-CO** (Colombia)

Para más detalles, consulta: [`SEO-OPTIMIZATION.md`](./SEO-OPTIMIZATION.md)

## 📁 Estructura del Proyecto

```
portfolio-v2/
├── public/
│   ├── me.png              # Foto de perfil
│   ├── projects/           # Imágenes de proyectos
│   ├── robots.txt          # Configuración para crawlers
│   └── sitemap.xml         # Mapa del sitio
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Layout principal con metadata
│   │   ├── page.tsx        # Página principal
│   │   └── work/           # Página de proyectos
│   ├── components/
│   │   ├── About.tsx       # Sección "Sobre mí"
│   │   ├── Hero/           # Hero section
│   │   ├── Projects/       # Sección de proyectos
│   │   ├── Footer/         # Footer con contacto
│   │   └── Header/         # Header y navegación
│   ├── data/
│   │   └── projects.ts     # Data de proyectos
│   └── ...
└── ...
```

## 🎨 Personalización

### Actualizar Información Personal

1. **Metadata**: Edita `src/app/layout.tsx`
2. **Contenido "Sobre mí"**: Edita `src/components/About.tsx`
3. **Proyectos**: Edita `src/data/projects.ts`
4. **Redes sociales**: Edita `src/components/Footer/index.tsx`

### Actualizar URL del Sitio

Si cambias el dominio, actualiza estos archivos:

1. `src/app/layout.tsx` - Canonical URL
2. `public/sitemap.xml` - URLs del sitemap
3. `public/robots.txt` - URL del sitemap
4. Variable de entorno `NEXT_PUBLIC_BASE_URL`

## 📈 Post-Deployment

Después de deployar:

1. ✅ Verifica: `https://www.andresvelez.co/robots.txt`
2. ✅ Verifica: `https://www.andresvelez.co/sitemap.xml`
3. ✅ Registra el sitio en [Google Search Console](https://search.google.com/search-console)
4. ✅ Envía el sitemap a Google
5. ✅ Prueba Rich Results: [Google Rich Results Test](https://search.google.com/test/rich-results)

## 📚 Documentación Adicional

### Sistema de Contacto
- 🚀 [`QUICK_START.md`](./QUICK_START.md) - **Setup rápido en 5 minutos**
- [`ENV_SETUP.md`](./ENV_SETUP.md) - Configuración de variables de entorno
- [`SECURITY.md`](./SECURITY.md) - Medidas de seguridad implementadas
- [`CONTACT_SYSTEM.md`](./CONTACT_SYSTEM.md) - Documentación técnica completa
- [`IMPLEMENTACION_COMPLETA.md`](./IMPLEMENTACION_COMPLETA.md) - Resumen de implementación

### SEO y Mejoras
- [`SEO-OPTIMIZATION.md`](./SEO-OPTIMIZATION.md) - Guía completa de optimización SEO
- [`MEJORAS-IMPLEMENTADAS.md`](./MEJORAS-IMPLEMENTADAS.md) - Resumen de mejoras
- [`ANTES-DESPUES.md`](./ANTES-DESPUES.md) - Comparación antes/después

## 🤝 Contacto

- **Email**: contact@andresvelez.co
- **LinkedIn**: [andres-velez-su](https://www.linkedin.com/in/andres-velez-su/)
- **Instagram**: [@andresvelezs](https://www.instagram.com/andresvelezs/)

---

## 🔧 Scripts Disponibles

```bash
# Desarrollo
bun dev

# Construcción
bun run build

# Producción
bun start

# Linting
bun run lint
```

## 📝 Notas

- El proyecto usa **Bun** como package manager [[memory:7689139]]
- Todo el contenido está en **español** para Colombia [[memory:5490013]]
- Los iconos usan **unplugin-icons** [[memory:7758670]]

---

**Desarrollado por**: Andrés Vélez  
**Stack**: Next.js 15 + TypeScript + Tailwind CSS  
**Deploy**: [www.andresvelez.co](https://www.andresvelez.co)

## 📄 Licencia

© 2025 Andrés Vélez. Todos los derechos reservados.
