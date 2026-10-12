# SPEC.md: Especificaciones Técnicas para Sitio Web Institucional

> **Cliente:** Fundación Chollinco
> 
> **Desarrollador / Lead:** Francisco Colomer ([@Cy5k0](https://github.com/Cy5k0))
> 
> **Contacto:** francisco.colomer@gmail.com
> 
> **Plataforma de Hosting:** GitHub Pages
> 
> **Tecnologías Principales:** HTML5, Tailwind CSS (v3 CDN), FontAwesome (v6 CDN), Vanilla JavaScript.

## 1\. Visión General y Requisitos de Despliegue

El objetivo del proyecto es construir un sitio web institucional tipo *landing page* para la **Fundación Chollinco**, con un diseño limpio, moderno, accesible y optimizado tanto para buscadores tradicionales (**SEO**) como para motores de respuesta impulsados por Inteligencia Artificial (**AEO**).

### Restricciones de Arquitectura

-   **Alojamiento:** GitHub Pages (Servidor estático).
-   **Dependencias de Frontend:** Sin proceso de compilación complejo (*build step*). Usar Tailwind CSS vía CDN (`[https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)`) y FontAwesome vía CDN.
-   **Compatibilidad:** 100% *responsive* (mobile-first), funcional en navegadores modernos (Chrome, Firefox, Safari, Edge).
-   **Estructura del Repositorio:**
-   -   `index.html`
    -   `assets/images/`
    -   `assets/docs/` (memorias anuales, reportes PDF)
    -   `CNAME` (opcional, para dominio personalizado)
    -   `SPEC.md`

## 2\. Estructura del Sitio y Secciones

El sitio funcionará mediante navegación en una sola página (*single-page application* estática) con menú superior fijo y desplazamiento suave (*smooth scroll*).

### Secciones Requeridas

#### 1\. Header & Navegación (Sticky Header)

-   Logo institucional a la izquierda.
-   Enlaces de navegación con scroll suave: `#inicio`, `#quienes-somos`, `#que-hacemos`, `#proyectos`, `#transparencia`, `#contacto`.
-   Menú *hamburguesa* desplegable para dispositivos móviles.

#### 2\. Inicio (`#inicio` - Hero Section)

-   Titular principal y eslogan de impacto sobre la labor de la fundación.
-   Imagen o video de fondo del entorno natural con superposición (*overlay*) para legibilidad.
-   Llamados a la Acción (CTA): Botones destacados hacia `#proyectos` y `#contacto`.
-   Módulo de Cifras de Impacto (ej. hectáreas protegidas, comunidades/familias beneficiadas).

#### 3\. Quiénes Somos (`#quienes-somos`)

-   Declaración clara de **Misión, Visión y Valores**.
-   Breve reseña del origen y arraigo territorial en Chollinco.
-   Tarjetas del Equipo/Directorio con foto, nombre, cargo y breve biografía.

#### 4\. Qué Hacemos (`#que-hacemos`)

-   Cuadrícula o tarjetas interactivas representando los pilares estratégicos (ej. Conservación Ambiental, Educación, Desarrollo Comunitario, Cultura).
-   Iconografía clara por cada pilar.

#### 5\. Proyectos (`#proyectos`)

-   Galería/Mapeo visual de proyectos activos y concluidos.
-   Cada ficha debe contener: Título, ubicación, objetivo, indicadores de logro y fotografía representativa.

#### 6\. Transparencia e Informes (`#transparencia`)

-   Bloque institucional con botones de descarga directa (archivos PDF alojados en `assets/docs/`) para Memorias Anuales y Balances Financieros.

#### 7\. Contacto e Involúcrate (`#contacto`)

-   **Módulo de Formulario (Opcional/Configurable):** Integración mediante servicio estático libre de backend (ej. Formspree o Web3Forms) para canalizar consultas al correo institucional.
-   **Información Directa:** Correo electrónico, teléfono, dirección y mapa institucional.
-   **Integración con WhatsApp:** Botón flotante o enlace directo de contacto ofrecido al cliente para consultas rápidas.

#### 8\. Footer (Pie de Página)

-   Enlaces a perfiles oficiales de Redes Sociales (Instagram, Facebook, LinkedIn, YouTube).
-   Derechos reservados, disclaimer de privacidad y enlace de retorno superior (*scroll to top*).

## 3\. Especificaciones Técnicas y Metadatos (SEO / AEO)

### A. Estrategia SEO y Palabras Clave (Keywords)

-   **Encabezados Semánticos:** Un único `<h1>` en el Hero con la frase clave principal. Jerarquía estricta (`<h2>` para secciones, `<h3>` para subsecciones).
-   **Keywords a Integrar:** *Fundación Chollinco, conservación ambiental Chile, proyectos comunitarios, desarrollo sostenible, protección de la naturaleza, voluntariado*.
-   **Meta Tags Obligatorios:** Incluir etiquetas de título, descripción, palabras clave y Open Graph para previsualización en redes sociales.

### B. Estrategia AEO (Answer Engine Optimization)

-   **Datos Estructurados (JSON-LD):** Incluir en el `<head>` del archivo `index.html` el esquema de `NGO` / `NonprofitOrganization` (Schema.org) con el nombre, URL, logo y ubicación en Chile para facilitar la lectura por LLMs y motores de respuesta (ChatGPT, Gemini, Perplexity).

## 4\. Guía de Estilos y Requisitos Visuales

-   **Paleta de Colores (Tailwind CSS):**
-   -   Primario: `indigo-900` / `indigo-600` (Elegancia institucional).
    -   Secundario / Acento: `emerald-600` / `emerald-500` (Naturaleza, sustentabilidad).
    -   Fondos: `slate-50` / `white` con contraste accesible (`text-slate-800`).
-   **Tipografía:** Importada vía Google Fonts (`Inter` o `Plus Jakarta Sans`).
-   **Iconografía:** FontAwesome 6 vía CDN.

## 5\. Criterios de Aceptación para el Agente

1.  **Código Limpio:** Archivo `index.html` autocontenido, semántico y bien comentado.
2.  **Carga Rápida:** Optimización de imágenes (formato WebP preferente) y compresión adecuada.
3.  **Validación de Enlaces:** Todos los anclajes de navegación (`#`), enlaces a redes sociales y archivos PDF deben ser funcionales o apuntar a carpetas/URLs correctas.
4.  **Despliegue GitHub Pages:** Confirmar que el repositorio compile correctamente la rama `main` o `gh-pages`.