# Optimización SEO - Portafolio Andrés Vélez

Este documento detalla todas las mejoras de SEO implementadas en el portafolio personal de Andrés Vélez para maximizar la visibilidad en motores de búsqueda, especialmente Google.

## 🎯 Objetivo Principal

Lograr que al buscar "Andrés Vélez" o "Andres Velez" en Google, el portafolio aparezca en las primeras posiciones con foto de perfil destacada.

## ✅ Mejoras Implementadas

### 1. Metadata Optimizada (layout.tsx)

- **Título SEO-friendly**: "Andrés Vélez | Desarrollador de Software Full Stack & Co-Fundador"
- **Descripción extendida** con keywords clave:
  - Nombre completo con y sin tilde
  - Ubicación: Medellín, Colombia
  - Tecnologías: React, Next.js, TypeScript, Node.js
  - Empresas: Norvik Tech, Ganado Co
  - Especialización: Blockchain, IA, Tokenización
- **Keywords estratégicas**:
  - Variaciones del nombre (Andrés Vélez, Andres Velez)
  - Términos locales (Desarrollador Medellín, Developer Colombia)
  - Stack técnico (React Developer, Next.js Developer)
  - Empresas asociadas (Norvik Tech, Ganado Co)

### 2. Schema.org JSON-LD

Implementado schema type "Person" con:

- Información personal completa
- Ubicación geográfica (Medellín, Colombia)
- Links a redes sociales (LinkedIn, Instagram, GitHub)
- Ocupaciones y empresas asociadas
- Conocimientos técnicos (knowsAbout)
- Imagen de perfil (/me.png)

Este schema ayuda a Google a entender quién eres y a mostrar tu información en el Knowledge Graph.

### 3. Open Graph & Twitter Cards

- **Open Graph type**: "profile" con firstName y lastName
- **Locale**: "es_CO" para Colombia
- **Imágenes optimizadas**: 1200x630px
- **Alt texts** descriptivos que incluyen nombre completo y profesión
- Descripciones adaptadas para compartir en redes sociales

### 4. Robots.txt & Sitemap.xml

**robots.txt** creado en `/public/robots.txt`:

- Permite indexación completa
- Referencia al sitemap
- Optimizaciones específicas para Googlebot y Bingbot

**sitemap.xml** creado en `/public/sitemap.xml`:

- Lista de todas las páginas con prioridades
- Incluye referencia a imagen de perfil con caption
- Frecuencia de actualización definida
- LastMod actualizado

### 5. Contenido Profesional y Extenso

#### Sección "Sobre mí" (About.tsx)

Contenido expandido que incluye:

- Descripción detallada de experiencia (4+ años)
- Especialización técnica completa
- Proyectos y empresas co-fundadas
- Filosofía de trabajo
- Stack tecnológico detallado
- Logros y enfoque profesional

#### Descripciones de Proyectos (projects.ts)

Cada proyecto ahora tiene:

- Descripción extendida y profesional en español
- Contexto del impacto del proyecto
- Tecnologías utilizadas mencionadas
- Keywords relevantes integradas naturalmente

### 6. Optimización de Imágenes

Todas las imágenes ahora incluyen:

- **Alt text** descriptivo con nombre completo
- **Título** cuando aplica
- Contexto profesional en los alt texts
- Nombre "Andrés Vélez" en alt texts principales

Ejemplos:

- `alt="Andrés Vélez - Desarrollador de Software Full Stack en Medellín, Colombia"`
- `alt="Andrés Vélez - Desarrollador Full Stack"`

### 7. Internacionalización y Localización

- **lang="es-CO"** en el HTML
- Todo el contenido traducido al español
- Referencias a Colombia en metadata
- UTC-5 para zona horaria de Colombia

### 8. Estructura Semántica HTML

- Uso correcto de etiquetas semánticas (h1, h2, h3)
- Jerarquía de encabezados apropiada
- Navegación con aria-labels descriptivos
- Links con contexto para accesibilidad

### 9. Metadata por Página

Cada página importante tiene su propia metadata:

- **/** (Home): Enfocada en perfil personal
- **/work**: Enfocada en proyectos y portfolio

## 📊 Palabras Clave Objetivo

### Primarias

1. Andrés Vélez
2. Andres Velez
3. Andrés Vélez Desarrollador
4. Andrés Vélez Medellín

### Secundarias

1. Desarrollador Full Stack Colombia
2. Desarrollador React Medellín
3. Next.js Developer Colombia
4. Norvik Tech Fundador
5. Ganado Co Fundador

### Long-tail

1. Andrés Vélez desarrollador software Medellín
2. Andres Velez Full Stack developer Colombia
3. Desarrollador blockchain Medellín
4. Experto React Next.js Colombia

## 🚀 Pasos Adicionales Recomendados

Para maximizar aún más el SEO:

### 1. Google Search Console

- Registrar el dominio www.andresvelez.co
- Enviar sitemap.xml
- Verificar indexación de páginas
- Monitorear palabras clave y posicionamiento

### 2. Google My Business

- Crear perfil profesional
- Añadir ubicación en Medellín
- Vincular al portafolio

### 3. Backlinks de Calidad

- Asegurar que Norvik Tech enlace al portafolio
- Asegurar que Ganado Co enlace al portafolio
- Actualizar perfiles de LinkedIn, GitHub, etc. con el link

### 4. Redes Sociales

- Compartir el portafolio en LinkedIn, Instagram
- Usar "Andrés Vélez" consistentemente en todos los perfiles
- Vincular todas las redes sociales al portafolio

### 5. Contenido Regular

- Considerar añadir un blog con artículos técnicos
- Actualizar proyectos regularmente
- Añadir casos de estudio detallados

### 6. Performance

- Optimizar imágenes (usar WebP, lazy loading)
- Implementar caché apropiado
- Mejorar Core Web Vitals

### 7. Schema Markup Adicional

Considerar añadir:

- BreadcrumbList schema
- WebPage schema para cada página
- Organization schema para Norvik Tech y Ganado Co

## 📈 Monitoreo

Para verificar el éxito de las optimizaciones:

1. **Google Search Console**: Monitorear impresiones y clicks
2. **Google Analytics**: Tráfico orgánico
3. **Búsquedas manuales**: Probar "Andrés Vélez" periódicamente
4. **PageSpeed Insights**: Mantener score alto
5. **Lighthouse**: Auditoría regular de SEO

## 🔍 Verificación Rápida

Para verificar que todo funciona:

```bash
# 1. Verificar robots.txt
curl https://www.andresvelez.co/robots.txt

# 2. Verificar sitemap.xml
curl https://www.andresvelez.co/sitemap.xml

# 3. Verificar structured data
# Usar: https://search.google.com/test/rich-results
# URL: https://www.andresvelez.co

# 4. Verificar Open Graph
# Usar: https://www.opengraph.xyz/
# URL: https://www.andresvelez.co
```

## 📝 Notas Importantes

- Todas las mejoras están en **español** como requiere el proyecto
- El nombre "Andrés Vélez" aparece múltiples veces de forma natural
- La foto de perfil `/me.png` está optimizada con alt text apropiado
- Los links a Norvik Tech y Ganado Co están correctamente implementados
- La ubicación "Medellín, Colombia" está presente en toda la metadata

## 🎯 Resultado Esperado

Con estas optimizaciones, cuando alguien busque:

- "Andrés Vélez"
- "Andres Velez"
- "Andrés Vélez desarrollador"
- "Andres Velez developer"

El portafolio debería aparecer en las primeras posiciones con:

- Foto de perfil
- Descripción profesional
- Links a redes sociales
- Rich snippets de Google

---

**Última actualización**: Octubre 9, 2025
**Implementado por**: Andrés Vélez
**Stack**: Next.js 15, React, TypeScript
