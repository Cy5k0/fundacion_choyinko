# Project Blueprint: AI-First Website Architecture

## 1. Contexto y Objetivo
Este documento sirve como "System Prompt" o guía maestra para el desarrollo de un sitio web optimizado para la nueva era de **Google AI Overviews (SGE)** y **Answer Engine Optimization (AEO)**. El objetivo es crear un sitio que no solo sea atractivo para los usuarios humanos, sino que sea técnicamente perfecto para ser "leído", "entendido" y "citado" por modelos de Inteligencia Artificial como Google Gemini y ChatGPT.

---

## 2. Arquitectura Técnica (HTML Semántico Estricto)
La estructura del código es fundamental para que la IA entienda la jerarquía y la importancia del contenido.

### Directrices de Codificación:
* **HTML5 Semántico Obligatorio:** Evitar la "divitis" (uso excesivo de `<div>`). Usar etiquetas con significado:
    * `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`, `<figure>`, `<figcaption>`.
* **Jerarquía de Encabezados (Heading Hierarchy):**
    * `<h1>`: **Único** por página. Define el tema central.
    * `<h2>`: Subtemas principales o preguntas clave del usuario.
    * `<h3>`: Detalles de soporte bajo un H2.
* **Accesibilidad como SEO:** Los atributos `alt` en imágenes y `aria-labels` son obligatorios, ya que la IA los usa para "ver" y entender el contexto visual.

---

## 3. Estrategia de Datos Estructurados (Schema Markup)
El sitio debe "hablar" JSON-LD nativamente. Esta es la forma más directa de alimentar a la IA con datos estructurados.

### Schemas Prioritarios a Implementar:
1.  **`FAQPage`:** **Crítico**. Cada página de servicios o blog debe tener una sección de preguntas frecuentes marcada con Schema para aumentar la probabilidad de aparecer en los AI Overviews.
2.  **`Article` / `BlogPosting`:** Debe incluir propiedades de `author`, `publisher`, y `dateModified` para cumplir con E-E-A-T.
3.  **`Organization` / `LocalBusiness`:** Para establecer identidad, logo y ubicación.
4.  **`Speakable`:** (Opcional pero recomendado) Para identificar secciones aptas para lectura por asistentes de voz.

---

## 4. Estrategia de Contenido y Redacción (AEO)
El contenido debe estar optimizado para responder preguntas.

### Formato "Pregunta y Respuesta Directa":
* **Títulos Interrogativos:** Usa `<h2>` que sean preguntas literales (ej: "¿Cómo mejorar el SEO en 2024?").
* **Técnica BLUF (Bottom Line Up Front):** Inmediatamente después del título, el primer párrafo (`<p>`) debe ser una respuesta directa, concisa y objetiva (aprox. 30-50 palabras). Esto facilita que la IA extraiga ese fragmento como "Respuesta Destacada".
* **Lenguaje Natural:** Redacción conversacional, evitando jerga innecesaria.

---

## 5. Performance y Core Web Vitals
La IA de Google penaliza sitios con mala experiencia de usuario.

* **Mobile-First:** Diseño y código pensados primero para móviles.
* **Velocidad:** Imágenes en formato Next-Gen (`.webp`), `lazy-loading` nativo, y CSS crítico inline.

---

## 6. Instrucciones para Gemini (Tu Rol)
Cuando generes código o contenido para este proyecto, sigue estas reglas inquebrantables:

1.  **Generación de JSON-LD:** Siempre que te pida crear una página o componente (ej: "Crea la página de contacto"), debes incluir el bloque `<script type="application/ld+json">` correspondiente, completamente validado.
2.  **Justificación Semántica:** Si usas una etiqueta HTML específica (como `<article>` en lugar de `<section>`), añade un comentario en el código explicando por qué ayuda a la IA a entender el contexto.
3.  **Verificación de E-E-A-T:** Si generas texto de relleno (lorem ipsum o draft), asegúrate de incluir marcadores de posición para "Biografía del Autor" y "Fuentes", recordándome que son necesarios para la autoridad del sitio.
4.  **Simulación de Parser:** Al revisar el código, actúa como un crawler y verifica si el contenido principal es accesible sin JavaScript (Server Side Rendering o HTML estático preferido).