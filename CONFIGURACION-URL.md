# ⚙️ Configuración de URL - www.andresvelez.co

Este documento detalla la configuración necesaria para que tu portafolio funcione correctamente con tu dominio personalizado.

---

## ✅ URLs Actualizadas

Todos los archivos del proyecto ahora usan **`www.andresvelez.co`** como URL base:

### Archivos Actualizados (7)

1. ✅ `src/app/layout.tsx` - Canonical URL
2. ✅ `public/robots.txt` - Sitemap URL y referencias
3. ✅ `public/sitemap.xml` - Todas las URLs de páginas e imágenes
4. ✅ `README.md` - Documentación
5. ✅ `SEO-OPTIMIZATION.md` - Guía de optimización
6. ✅ `MEJORAS-IMPLEMENTADAS.md` - Resumen de mejoras
7. ✅ `ANTES-DESPUES.md` - Comparación

---

## 🔧 Variable de Entorno CRÍTICA

### Para Producción (IMPORTANTE)

Debes configurar esta variable de entorno en tu servicio de hosting:

```bash
NEXT_PUBLIC_BASE_URL=www.andresvelez.co
```

**⚠️ IMPORTANTE**:

- El código automáticamente añade `https://` si no está presente
- Puedes usar `www.andresvelez.co` o `https://www.andresvelez.co`
- Ambos funcionarán correctamente

### Para Desarrollo Local

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# .env.local
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## 📋 Configuración según tu Plataforma

### Si usas Vercel:

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Settings → Environment Variables
3. Añade:
   ```
   Name: NEXT_PUBLIC_BASE_URL
   Value: www.andresvelez.co
   ```
4. Redeploy tu aplicación

### Si usas Netlify:

1. Ve a Site settings → Environment variables
2. Añade:
   ```
   Key: NEXT_PUBLIC_BASE_URL
   Value: www.andresvelez.co
   ```
3. Redeploy

### Si usas otro servicio:

Busca la sección de "Environment Variables" o "Variables de Entorno" y añade:

```
NEXT_PUBLIC_BASE_URL=www.andresvelez.co
```

---

## 🌐 Configuración de DNS

Asegúrate de que tu dominio `andresvelez.co` esté configurado correctamente:

### Opción 1: Usar www (Recomendado)

```
Tipo: CNAME
Host: www
Valor: [tu-servicio-hosting].vercel.app (o similar)
```

Y añade una redirección de `andresvelez.co` → `www.andresvelez.co`

### Opción 2: Usar apex domain

```
Tipo: A
Host: @
Valor: [IP de tu servidor]

Tipo: CNAME
Host: www
Valor: andresvelez.co
```

---

## ✅ Checklist de Verificación Post-Deploy

Una vez que hayas deployado con la nueva URL:

### 1. Verificar Archivos SEO

```bash
# Robots.txt
✓ Visita: https://www.andresvelez.co/robots.txt
  Debe mostrar: Sitemap: https://www.andresvelez.co/sitemap.xml

# Sitemap.xml
✓ Visita: https://www.andresvelez.co/sitemap.xml
  Debe mostrar las URLs con www.andresvelez.co

# Página principal
✓ Visita: https://www.andresvelez.co/
  Debe cargar correctamente

# Página de proyectos
✓ Visita: https://www.andresvelez.co/work
  Debe cargar correctamente
```

### 2. Verificar Metadata

Abre tu sitio y revisa el HTML (View Page Source):

```html
✓ <link rel="canonical" href="https://www.andresvelez.co" /> ✓
<meta property="og:url" content="..." /> debe incluir www.andresvelez.co ✓
Schema.org JSON debe tener "url": "https://www.andresvelez.co"
```

### 3. Verificar en Google

```bash
# Rich Results Test
1. Ve a: https://search.google.com/test/rich-results
2. Ingresa: https://www.andresvelez.co
3. Verifica que el schema "Person" se detecte correctamente

# Mobile-Friendly Test
1. Ve a: https://search.google.com/test/mobile-friendly
2. Ingresa: https://www.andresvelez.co
3. Verifica que sea mobile-friendly
```

---

## 🚨 Solución de Problemas

### Problema: Sitemap no se encuentra

**Solución**:

- Verifica que `public/sitemap.xml` existe en tu build
- Asegúrate de que Next.js está sirviendo archivos estáticos de `/public`
- Limpia cache y redeploy

### Problema: URLs incorrectas en el sitio

**Solución**:

1. Verifica que `NEXT_PUBLIC_BASE_URL` esté configurada
2. Haz un rebuild completo:
   ```bash
   bun run build
   ```
3. Verifica las variables de entorno en tu plataforma de hosting
4. Redeploy

### Problema: Canonical URL apunta a localhost

**Solución**:

- La variable `NEXT_PUBLIC_BASE_URL` NO está configurada en producción
- Configúrala en tu plataforma de hosting
- Redeploy

---

## 📊 Cómo Funciona

El código en `src/app/layout.tsx` maneja las URLs así:

```typescript
const RAW_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// Si RAW_BASE_URL no tiene protocolo, lo añade automáticamente
const BASE_URL =
  RAW_BASE_URL.startsWith("http://") || RAW_BASE_URL.startsWith("https://")
    ? RAW_BASE_URL
    : `https://${RAW_BASE_URL}`;
```

**Valores válidos para `NEXT_PUBLIC_BASE_URL`:**

- ✅ `www.andresvelez.co` → Se convierte a `https://www.andresvelez.co`
- ✅ `https://www.andresvelez.co` → Se usa tal cual
- ✅ `http://localhost:3000` → Se usa tal cual (desarrollo)

---

## 🔄 Si Cambias de Dominio en el Futuro

Si en el futuro necesitas cambiar a otro dominio:

1. **Actualizar variable de entorno**:

   ```bash
   NEXT_PUBLIC_BASE_URL=tu-nuevo-dominio.com
   ```

2. **Actualizar archivos estáticos**:

   - `public/sitemap.xml` (líneas 7, 12, 20)
   - `public/robots.txt` (línea 8)

3. **Configurar redirección 301** desde el dominio antiguo al nuevo

4. **Actualizar Google Search Console** con el cambio de dirección

---

## 📞 Verificación Final

Antes de registrar en Google Search Console, verifica:

- [ ] Variable `NEXT_PUBLIC_BASE_URL` configurada en producción
- [ ] Sitio accesible en `https://www.andresvelez.co`
- [ ] `robots.txt` accesible y con URL correcta
- [ ] `sitemap.xml` accesible con todas las URLs correctas
- [ ] Metadata canonical apunta a www.andresvelez.co
- [ ] Schema.org tiene URL correcta
- [ ] Open Graph tiene URL correcta

---

## 🎉 ¡Todo Listo!

Una vez configurada la variable de entorno y verificado que todo funciona:

1. Registra en [Google Search Console](https://search.google.com/search-console)
2. Añade la propiedad: `https://www.andresvelez.co`
3. Verifica la propiedad (múltiples métodos disponibles)
4. Envía el sitemap: `https://www.andresvelez.co/sitemap.xml`
5. Espera 1-2 semanas para ver resultados en búsquedas

---

**Última actualización**: Octubre 9, 2025  
**Dominio**: www.andresvelez.co  
**Protocolo**: HTTPS (requerido)


