# Changelog — Claude para HR · S&PE

Notas de versión del portal formativo interno de Claude para el equipo de HRBP de
Software & Platform Engineering. Material no oficial; los datos son ilustrativos.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/).

## [2.0.0] — 2026-06-12 — Área "Avanzado" + navegación por áreas

Gran ampliación: el portal pasa de "guía de prompting" a una academia avanzada
con efectos, catálogo de casos, guías prácticas y un generador más potente.

### Añadido
- **Navegación en 3 áreas seleccionables** bajo el hero (Formación · Prompting ·
  Avanzado). Se muestra un área cada vez en lugar de un scroll infinito; recuerda
  la última área visitada.
- **Galería de efectos en vivo** (32 efectos): count-up, donut, gauge, barras,
  sparkline, partículas, cascada, flip, compare, confeti… Cada uno se reproduce
  de verdad e incluye la frase "Cómo pedírselo a Claude" copiable, con filtros
  por categoría.
- **Catálogo "100 cosas que no sabías que podías pedirle a Claude"**: buscador,
  filtros combinables (categoría · nivel · formato), favoritos y copia de prompt.
- **Guías** (9): qué archivos analiza, qué entregables crea, PowerPoint vs
  Artifact, presentaciones avanzadas, Excel, Artifacts, webs/UX, workflows
  end-to-end y Projects & Skills. Menú maestro-detalle con prompts copiables.
- **Generador de prompts ampliado**: nuevos campos de rol, audiencia, nivel de
  detalle y restricciones; el prompt resultante cierra pidiendo declarar
  supuestos y limitaciones.
- **Comparador "antes / después"** con 10 casos (prompt básico vs experto).

### Cambiado
- El buscador global (Ctrl/Cmd + K) ahora indexa también el catálogo avanzado.
- El catálogo se de-duplicó respecto a la galería: 10 ítems que eran efectos
  visuales se sustituyeron por recursos complementarios (resúmenes, RACI,
  onboarding, análisis de comentarios, anonimización de datos, DAFO, etc.).

### Técnico
- Archivos nuevos: `effects.js`, `catalog.js`, `guides.js`.
- Modificados: `index.html`, `styles.css`, `app.js`.
- Se reutiliza la infraestructura existente (copiado + toast, partículas, sistema
  de temas claro/oscuro, scroll-reveal). Sin dependencias externas nuevas.

## [1.0.0] — Base del portal

- Itinerario formativo de 11 capítulos con vista "recorrido" y "mapa",
  progreso real y cohete que viaja por la ruta.
- Generador de prompts, ejercicios prácticos y biblioteca de 152 prompts HR
  con filtros y favoritos.
- Temas claro/oscuro/sistema, buscador global (Ctrl/Cmd + K) y onboarding de
  bienvenida.
