/* ============================================================================
 *  catalog.js — Catálogo "100 cosas que no sabías que podías pedirle a Claude"
 *  ---------------------------------------------------------------------------
 *  Segundo apartado del pilar "Avanzado". Biblioteca interactiva con buscador,
 *  filtros combinables (categoría · nivel · formato), favoritos y copia de
 *  prompt. Reutiliza copyText()/flashCopied()/showToast() del portal.
 *
 *  Cada recurso: { id, n, name, cat, fmt, fmtFull, lvl, gets, when, prompt }
 *    cat     -> clave de categoría (etiqueta en CAT_LABELS)
 *    fmt     -> bucket de formato para filtrar (etiqueta corta en FMT_LABELS)
 *    fmtFull -> "formato recomendado" textual que se muestra en el badge
 * ========================================================================== */
(function () {
    'use strict';

    var CAT_LABELS = {
        pres: 'Presentaciones interactivas',
        story: 'Storytelling ejecutivo',
        design: 'Diseño visual premium',
        dash: 'Dashboards y KPIs',
        excel: 'Excel avanzado',
        ppt: 'PowerPoint avanzado',
        artifact: 'Artifacts y apps internas',
        web: 'Webs y portales',
        comm: 'Comunicación ejecutiva',
        flow: 'Workflows corporativos',
        hr: 'HR y people analytics',
        quality: 'Calidad, riesgos y revisión',
        prod: 'Productividad',
        learn: 'Formación y aprendizaje'
    };
    // Etiqueta corta para los chips de categoría.
    var CAT_SHORT = {
        pres: 'Presentaciones', story: 'Storytelling', design: 'Diseño', dash: 'Dashboards & KPIs',
        excel: 'Excel', ppt: 'PowerPoint', artifact: 'Artifacts & apps', web: 'Webs & portales',
        comm: 'Comunicación', flow: 'Workflows', hr: 'HR & analytics', quality: 'Calidad & riesgos',
        prod: 'Productividad', learn: 'Formación'
    };
    var FMT_LABELS = {
        art: 'Artifact / HTML', ppt: 'PowerPoint', xls: 'Excel / CSV',
        doc: 'Word / PDF', comm: 'Email / Texto', any: 'Multiformato'
    };

    var CATALOG = [
        // ---- 1-6 ----
        { n: 1, name: 'Resumen ejecutivo de un documento largo', cat: 'comm', fmt: 'doc', fmtFull: 'Word o PDF', lvl: 'Intermedio',
          gets: 'Convierte un PDF o informe extenso en un resumen accionable para decidir.',
          when: 'Informes, research, contratos, normativa o documentación interna densa.',
          prompt: 'Analiza este documento como un consultor senior. Extrae el resumen ejecutivo, los 5 puntos críticos, los riesgos, las decisiones necesarias y una propuesta de próximos pasos. Señala lo que quede ambiguo o sin soporte.' },
        { n: 2, name: 'Matriz RACI de responsabilidades', cat: 'flow', fmt: 'doc', fmtFull: 'Word o Excel', lvl: 'Intermedio',
          gets: 'Aclara quién hace qué en una iniciativa con varios equipos.',
          when: 'Proyectos, transformaciones, procesos transversales, gobernanza.',
          prompt: 'Crea una matriz RACI para esta iniciativa: lista las actividades clave y asigna Responsible, Accountable, Consulted e Informed por rol. Señala solapamientos, huecos de responsabilidad y riesgos de gobernanza.' },
        { n: 3, name: 'Scroll narrativo', cat: 'pres', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Avanzado',
          gets: 'Convierte una presentación en una historia progresiva que el usuario recorre haciendo scroll.',
          when: 'Transformaciones, journeys, roadmaps, storytelling de datos.',
          prompt: 'Convierte esta presentación en una experiencia de scroll narrativo. Cada sección debe aparecer progresivamente, guiando al usuario desde el contexto inicial hasta las conclusiones y recomendaciones finales.' },
        { n: 4, name: 'Plan de onboarding 30-60-90 días', cat: 'hr', fmt: 'doc', fmtFull: 'Word, PowerPoint o Excel', lvl: 'Intermedio',
          gets: 'Estructura la incorporación de una persona en sus tres primeros meses.',
          when: 'Nuevas incorporaciones, cambios de rol, movilidad interna.',
          prompt: 'Crea un plan de onboarding 30-60-90 días para un [rol] en [equipo]. Incluye objetivos por fase, personas clave que debe conocer, formación, quick wins esperados y criterios de éxito al final de cada fase.' },
        { n: 5, name: 'Entrada por capas', cat: 'story', fmt: 'ppt', fmtFull: 'PowerPoint, Artifact o HTML', lvl: 'Avanzado',
          gets: 'Construye cada slide por capas: primero el mensaje, después datos, insight y recomendación.',
          when: 'Presentaciones ejecutivas y análisis de datos.',
          prompt: 'Haz que cada slide o sección se construya por capas: primero el mensaje principal, después los datos de soporte, luego el insight y finalmente la recomendación.' },
        { n: 6, name: 'Efecto reveal de insights', cat: 'story', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Avanzado',
          gets: 'Muestra primero el dato y después revela el insight clave, aumentando el impacto narrativo.',
          when: 'Presentaciones a leadership, análisis de negocio, performance reviews.',
          prompt: 'Diseña la sección para que primero se muestren los datos y después aparezca el insight clave con un efecto reveal sutil. El objetivo es reforzar el storytelling ejecutivo.' },
        // ---- 7-13 ----
        { n: 7, name: 'Timeline animado', cat: 'pres', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Intermedio',
          gets: 'Convierte fechas, fases e hitos en una narrativa visual.',
          when: 'Planes de transformación, integración, M&A, implementación tecnológica.',
          prompt: 'Crea un timeline animado con las fases principales del proyecto. Cada fase debe incluir fecha, hito, responsable, riesgo principal y resultado esperado.' },
        { n: 8, name: 'Roadmap ejecutivo', cat: 'story', fmt: 'ppt', fmtFull: 'PowerPoint, Artifact o HTML', lvl: 'Intermedio',
          gets: 'Presenta una hoja de ruta clara, orientada a decisión.',
          when: 'Estrategia, programas, transformación, iniciativas nuevas.',
          prompt: 'Convierte este contenido en un roadmap ejecutivo por fases. Incluye objetivos, entregables, dependencias, riesgos y decisiones necesarias para cada fase.' },
        { n: 9, name: 'One page executive summary', cat: 'comm', fmt: 'doc', fmtFull: 'PowerPoint, Word o PDF', lvl: 'Intermedio',
          gets: 'Resume una iniciativa compleja en una sola página ejecutiva orientada a decisión.',
          when: 'Comités, SteerCos, leadership updates, decisiones rápidas.',
          prompt: 'Crea una one page executive summary con contexto, problema, datos clave, riesgos, opciones, recomendación y próximos pasos. Debe ser clara, visual y orientada a decisión.' },
        { n: 10, name: 'Narrativa tipo consultoría', cat: 'story', fmt: 'ppt', fmtFull: 'PowerPoint', lvl: 'Avanzado',
          gets: 'Ordena una presentación con una lógica más estratégica y persuasiva.',
          when: 'Decks ejecutivos, propuestas, recomendaciones, decisiones organizativas.',
          prompt: 'Reestructura esta presentación con lógica de consultoría: contexto, diagnóstico, implicaciones, opciones, recomendación y plan de acción. Reduce texto y aumenta claridad ejecutiva.' },
        { n: 11, name: 'Slide tipo "so what"', cat: 'story', fmt: 'ppt', fmtFull: 'PowerPoint', lvl: 'Avanzado',
          gets: 'Transforma datos descriptivos en implicaciones de negocio.',
          when: 'Análisis de Excel, reporting, performance, attrition, costes.',
          prompt: 'Para cada dato relevante, añade una capa de "so what". No quiero solo descripción, quiero implicación de negocio, riesgo y acción recomendada.' },
        { n: 12, name: 'Mensaje único por slide', cat: 'ppt', fmt: 'ppt', fmtFull: 'PowerPoint', lvl: 'Básico',
          gets: 'Evita slides saturadas o poco claras: una idea por slide.',
          when: 'Antes de enviar o presentar un deck.',
          prompt: 'Revisa esta presentación y asegúrate de que cada slide tenga un único mensaje principal. Si una slide tiene demasiadas ideas, divídela o reestructura la narrativa.' },
        { n: 13, name: 'Speaker notes ejecutivas', cat: 'ppt', fmt: 'ppt', fmtFull: 'PowerPoint', lvl: 'Intermedio',
          gets: 'Ayuda a presentar cada slide con claridad y seguridad.',
          when: 'Presentaciones a dirección, comités, reuniones críticas.',
          prompt: 'Añade speaker notes para cada slide. Deben sonar naturales, ejecutivas y concisas. Incluye también posibles preguntas difíciles y respuestas recomendadas.' },
        // ---- 14-24 diseño ----
        { n: 14, name: 'Glassmorphism', cat: 'design', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Avanzado',
          gets: 'Crea paneles translúcidos con sensación moderna y premium.',
          when: 'Dashboards, portales, apps internas y presentaciones interactivas.',
          prompt: 'Aplica un diseño glassmorphism con paneles translúcidos, desenfoque suave, bordes sutiles y sensación premium. Mantén buena legibilidad.' },
        { n: 15, name: 'Neumorphism sutil', cat: 'design', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Avanzado',
          gets: 'Añade profundidad visual con tarjetas suaves y relieves discretos.',
          when: 'Herramientas internas, calculadoras, dashboards limpios.',
          prompt: 'Usa neumorphism de forma sutil en tarjetas y botones. El diseño debe seguir siendo corporativo, limpio y profesional.' },
        { n: 16, name: 'Gradientes corporativos', cat: 'design', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Intermedio',
          gets: 'Evita una estética plana y aporta modernidad.',
          when: 'Hero sections, fondos, headers, dashboards.',
          prompt: 'Añade gradientes corporativos sutiles en fondos, encabezados y elementos destacados. Evita colores estridentes y prioriza un estilo premium.' },
        { n: 17, name: 'Job description + scorecard de entrevista', cat: 'hr', fmt: 'doc', fmtFull: 'Word o PDF', lvl: 'Intermedio',
          gets: 'Define el perfil y cómo evaluarlo de forma objetiva y sin sesgos.',
          when: 'Aperturas de posición, talent acquisition, calibración de entrevistadores.',
          prompt: 'Redacta una job description para [rol] (misión, responsabilidades, must-have vs nice-to-have) y un scorecard de entrevista con competencias, preguntas conductuales y una escala de evaluación que reduzca el sesgo.' },
        { n: 18, name: 'Microinteracciones', cat: 'design', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Avanzado',
          gets: 'Mejora la experiencia con pequeños movimientos funcionales.',
          when: 'Botones, tabs, filtros, cards, menús y formularios.',
          prompt: 'Añade microinteracciones elegantes en botones, tarjetas, filtros y tabs. Deben ser rápidas, discretas y funcionales.' },
        { n: 19, name: 'Iconografía sutil', cat: 'design', fmt: 'ppt', fmtFull: 'PowerPoint, Artifact o HTML', lvl: 'Básico',
          gets: 'Facilita el escaneo visual del contenido.',
          when: 'Formaciones, dashboards, catálogos, bibliotecas.',
          prompt: 'Añade iconos sutiles para cada categoría. Deben ayudar a entender la información, no decorar de forma innecesaria.' },
        { n: 20, name: 'Diseño inspirado en Apple', cat: 'design', fmt: 'art', fmtFull: 'Artifact, HTML o PowerPoint', lvl: 'Intermedio',
          gets: 'Aporta minimalismo, claridad y sensación premium.',
          when: 'Formaciones premium, launches, productos internos.',
          prompt: 'Rediseña esta sección con una estética inspirada en Apple: mucho espacio en blanco, tipografía clara, jerarquía visual fuerte y sensación premium.' },
        { n: 21, name: 'Diseño inspirado en Stripe', cat: 'design', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Avanzado',
          gets: 'Aporta un look tecnológico, moderno y sofisticado.',
          when: 'Portales de IA, tecnología, producto, dashboards.',
          prompt: 'Dale a esta web un estilo inspirado en Stripe: moderno, tecnológico, limpio, con gradientes sutiles, tarjetas elegantes y navegación fluida.' },
        { n: 22, name: 'Diseño inspirado en Notion', cat: 'web', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Intermedio',
          gets: 'Mejora la claridad documental y la facilidad de navegación.',
          when: 'Knowledge bases, manuales, formación interna.',
          prompt: 'Reestructura esta página con una estética inspirada en Notion: modular, clara, muy legible y con bloques reutilizables.' },
        { n: 23, name: 'Diseño inspirado en Linear', cat: 'design', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Avanzado',
          gets: 'Aporta sensación de producto digital premium.',
          when: 'Apps internas, herramientas corporativas, dashboards.',
          prompt: 'Aplica una estética inspirada en Linear: interfaz limpia, moderna, oscura o neutra, con jerarquía visual precisa y sensación de producto premium.' },
        { n: 24, name: 'Análisis de comentarios de encuesta', cat: 'hr', fmt: 'xls', fmtFull: 'Excel, CSV o texto', lvl: 'Avanzado',
          gets: 'Convierte comentarios abiertos en temas, sentimiento y acciones.',
          when: 'Encuestas de clima/engagement, feedback de salida, eNPS.',
          prompt: 'Analiza estos comentarios de la encuesta. Agrúpalos por tema, indica el sentimiento (positivo/neutro/negativo) de cada uno, incluye 2-3 citas representativas por tema y propón acciones priorizadas. No inventes nada que no esté en los comentarios.' },
        // ---- 25-36 dashboards ----
        { n: 25, name: 'Anonimizar datos antes de compartir', cat: 'quality', fmt: 'any', fmtFull: 'Cualquier formato', lvl: 'Intermedio',
          gets: 'Prepara textos o datos para usarlos con Claude sin exponer información personal.',
          when: 'Antes de pegar datos de personas, casos, clientes o proyectos.',
          prompt: 'Anonimiza este texto/tabla: sustituye nombres, emails, IDs y cualquier dato identificable por marcadores genéricos (Empleado A, País 1, Proyecto X), manteniendo la utilidad para el análisis. Devuélveme también la lista de lo que has reemplazado.' },
        { n: 26, name: 'Análisis DAFO con implicaciones', cat: 'story', fmt: 'ppt', fmtFull: 'PowerPoint, Artifact o HTML', lvl: 'Intermedio',
          gets: 'Estructura fortalezas, debilidades, oportunidades y amenazas, y lo que implican.',
          when: 'Estrategia, planes de área, propuestas, reviews de iniciativa.',
          prompt: 'Construye un análisis DAFO de [tema] a partir de este contexto. Da 3-4 puntos concretos por cuadrante y cierra con las 3 acciones estratégicas que se derivan del cruce de cuadrantes.' },
        { n: 27, name: 'Generar datos de ejemplo realistas', cat: 'prod', fmt: 'xls', fmtFull: 'Excel o CSV', lvl: 'Intermedio',
          gets: 'Crea un dataset ficticio pero creíble para probar o demostrar sin datos reales.',
          when: 'Demos, formación, prototipos de dashboard, pruebas sin datos sensibles.',
          prompt: 'Genera un dataset ficticio y realista de [p. ej. headcount y attrition] con N filas y estas columnas, con distribuciones creíbles y algún outlier intencionado para probar. Marca claramente que son datos ficticios de ejemplo.' },
        { n: 28, name: 'Ranking dinámico', cat: 'dash', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Avanzado',
          gets: 'Ordena unidades, países, equipos, managers o iniciativas.',
          when: 'Performance, adopción, productividad, engagement.',
          prompt: 'Crea un ranking dinámico con filtros. Debe permitir ordenar por métrica, ver posición relativa y destacar los cambios más relevantes.' },
        { n: 29, name: 'Comparativa entre periodos', cat: 'dash', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Avanzado',
          gets: 'Permite comparar periodos y ver variaciones.',
          when: 'Q1 vs Q2, FY25 vs FY26, antes y después de una iniciativa.',
          prompt: 'Añade un selector para comparar dos periodos. La visualización debe mostrar variación absoluta, variación porcentual e implicación ejecutiva.' },
        { n: 30, name: 'Selector de escenarios', cat: 'artifact', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Avanzado',
          gets: 'Permite simular decisiones y ver impactos al instante.',
          when: 'Workforce planning, compensation, costes, staffing, capacity.',
          prompt: 'Añade un selector de escenarios: conservador, base y ambicioso. Cada escenario debe recalcular KPIs, costes, riesgos y recomendaciones.' },
        { n: 31, name: 'Resumen de un hilo largo de email o Teams', cat: 'prod', fmt: 'comm', fmtFull: 'Email, Teams o texto', lvl: 'Básico',
          gets: 'Destila una conversación interminable en lo esencial y lo pendiente.',
          when: 'Hilos de email kilométricos, chats largos, ponerse al día tras vacaciones.',
          prompt: 'Resume este hilo: decisiones tomadas, puntos abiertos, quién espera qué de quién y los próximos pasos con responsable. Máximo 10 líneas, en lenguaje claro.' },
        { n: 32, name: 'Explícamelo a tres niveles', cat: 'learn', fmt: 'any', fmtFull: 'Texto o Artifact', lvl: 'Básico',
          gets: 'Entiende un tema nuevo a tu ritmo, de principiante a experto.',
          when: 'Aprender un concepto rápido, preparar una formación, ponerte al día.',
          prompt: 'Explícame [tema] en tres niveles: (1) como a alguien que empieza de cero, (2) nivel intermedio con matices, (3) nivel experto con implicaciones y trade-offs. Termina con 3 preguntas para autoevaluarme.' },
        { n: 33, name: 'Insight automático por gráfico', cat: 'dash', fmt: 'art', fmtFull: 'Artifact, HTML o PowerPoint', lvl: 'Avanzado',
          gets: 'Traduce cada gráfico en una conclusión ejecutiva.',
          when: 'Dashboards y presentaciones con muchos datos.',
          prompt: 'Debajo de cada gráfico, añade un insight automático en lenguaje ejecutivo. Debe responder a: qué está pasando, por qué importa y qué acción sugiere.' },
        { n: 34, name: 'Vista ejecutiva y vista analítica', cat: 'dash', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Avanzado',
          gets: 'Permite adaptar el nivel de detalle a cada audiencia.',
          when: 'Dashboards para leadership y equipos operativos.',
          prompt: 'Crea dos modos de visualización: vista ejecutiva con insights clave y vista analítica con detalle completo, filtros y datos desagregados.' },
        { n: 35, name: 'Drill down por categoría', cat: 'dash', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Avanzado',
          gets: 'Permite pasar de visión agregada a detalle.',
          when: 'Análisis por país, unidad, nivel, manager, proyecto o colectivo.',
          prompt: 'Añade drill down por categoría. El usuario debe poder pasar de una visión agregada a una vista detallada por país, unidad, nivel o equipo.' },
        { n: 36, name: 'Alertas visuales', cat: 'dash', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Intermedio',
          gets: 'Señala automáticamente valores fuera de rango.',
          when: 'Métricas críticas, riesgos, seguimiento de iniciativas.',
          prompt: 'Añade alertas visuales para valores fuera de rango. Cada alerta debe incluir causa probable, impacto y recomendación.' },
        // ---- 37-48 excel ----
        { n: 37, name: 'Auditoría de Excel', cat: 'excel', fmt: 'xls', fmtFull: 'Excel', lvl: 'Avanzado',
          gets: 'Detecta errores, inconsistencias y riesgos en una hoja de cálculo.',
          when: 'Modelos salariales, workforce, forecast, presupuestos, reporting.',
          prompt: 'Audita este Excel como si fueras un experto en control de calidad de datos. Identifica errores, inconsistencias, fórmulas sospechosas, valores extremos y riesgos de interpretación.' },
        { n: 38, name: 'Explicación de fórmulas', cat: 'excel', fmt: 'xls', fmtFull: 'Excel', lvl: 'Intermedio',
          gets: 'Hace comprensible un modelo complejo.',
          when: 'Excel heredados, modelos financieros, modelos de HR.',
          prompt: 'Explícame las fórmulas clave de este Excel en lenguaje sencillo. Indica qué calcula cada una, de qué inputs depende y qué errores podrían producirse.' },
        { n: 39, name: 'Diccionario de datos', cat: 'excel', fmt: 'xls', fmtFull: 'Excel o CSV', lvl: 'Intermedio',
          gets: 'Ordena las columnas, significados y calidad del dataset.',
          when: 'Datasets grandes, archivos con muchas columnas, datos poco documentados.',
          prompt: 'Crea un diccionario de datos de este archivo. Para cada columna, indica significado probable, tipo de dato, calidad del dato, posibles problemas y uso recomendado.' },
        { n: 40, name: 'Detección de outliers', cat: 'excel', fmt: 'xls', fmtFull: 'Excel o CSV', lvl: 'Avanzado',
          gets: 'Encuentra anomalías relevantes y las clasifica por severidad.',
          when: 'Salarios, bonus, performance, rotación, costes, ventas.',
          prompt: 'Detecta outliers en este dataset. Clasifica cada caso por severidad, posible explicación, impacto y recomendación de revisión.' },
        { n: 41, name: 'Segmentación automática', cat: 'excel', fmt: 'xls', fmtFull: 'Excel, CSV o Artifact', lvl: 'Avanzado',
          gets: 'Agrupa datos en segmentos relevantes con su criterio.',
          when: 'People analytics, clientes, skills, ventas, performance.',
          prompt: 'Segmenta estos datos en grupos relevantes. Explica el criterio de segmentación, características de cada grupo y acciones recomendadas.' },
        { n: 42, name: 'Análisis de correlaciones', cat: 'excel', fmt: 'xls', fmtFull: 'Excel o CSV', lvl: 'Avanzado',
          gets: 'Identifica relaciones entre variables (sin confundir correlación con causalidad).',
          when: 'Engagement, attrition, performance, formación, productividad.',
          prompt: 'Analiza correlaciones relevantes entre variables. Distingue correlación de causalidad y propón hipótesis que deberían validarse antes de tomar decisiones.' },
        { n: 43, name: 'Análisis de rotación', cat: 'hr', fmt: 'xls', fmtFull: 'Excel, CSV o Artifact', lvl: 'Avanzado',
          gets: 'Ayuda a entender patrones de attrition.',
          when: 'HR, talento, staffing, workforce planning.',
          prompt: 'Analiza la rotación por unidad, nivel, antigüedad, localización y manager. Identifica patrones, riesgos y acciones prioritarias.' },
        { n: 44, name: 'Análisis salarial', cat: 'hr', fmt: 'xls', fmtFull: 'Excel o CSV', lvl: 'Avanzado',
          gets: 'Identifica riesgos de equidad, competitividad y consistencia.',
          when: 'Compensation, reward review, salary planning.',
          prompt: 'Analiza este dataset salarial. Busca outliers, inequidades potenciales, desviaciones por nivel, compa ratio, diferencias por colectivo y riesgos de decisión.' },
        { n: 45, name: 'Conversión de Excel a storytelling', cat: 'excel', fmt: 'ppt', fmtFull: 'Excel y PowerPoint', lvl: 'Avanzado',
          gets: 'Pasa de datos a narrativa ejecutiva.',
          when: 'Presentaciones de resultados, reporting, comités.',
          prompt: 'Convierte este Excel en una narrativa ejecutiva. Identifica los tres mensajes principales, los datos que los soportan y las decisiones que debería tomar leadership.' },
        { n: 46, name: 'Dashboard desde Excel', cat: 'dash', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Avanzado',
          gets: 'Convierte una hoja en una herramienta visual e interactiva.',
          when: 'Seguimiento de KPIs, reporting, análisis recurrentes.',
          prompt: 'Crea un dashboard interactivo a partir de este Excel. Incluye KPIs, filtros, gráficos, insights automáticos, alertas y resumen ejecutivo.' },
        { n: 47, name: 'Limpieza de datos', cat: 'excel', fmt: 'xls', fmtFull: 'Excel o CSV', lvl: 'Intermedio',
          gets: 'Prepara un dataset para análisis.',
          when: 'Archivos desordenados, manuales o inconsistentes.',
          prompt: 'Limpia y estructura este dataset. Identifica duplicados, campos incompletos, formatos inconsistentes y columnas que deberían normalizarse.' },
        { n: 48, name: 'Plantilla Excel reutilizable', cat: 'excel', fmt: 'xls', fmtFull: 'Excel', lvl: 'Intermedio',
          gets: 'Crea una herramienta corporativa reutilizable.',
          when: 'Seguimiento, reporting, planificación, procesos recurrentes.',
          prompt: 'Crea una plantilla Excel reutilizable para este proceso. Debe incluir pestañas, fórmulas, validaciones, instrucciones de uso y resumen automático.' },
        // ---- 49-60 powerpoint ----
        { n: 49, name: 'Rediseño ejecutivo de deck', cat: 'ppt', fmt: 'ppt', fmtFull: 'PowerPoint', lvl: 'Intermedio',
          gets: 'Mejora una presentación existente.',
          when: 'Decks densos, poco claros o demasiado operativos.',
          prompt: 'Revisa esta presentación y rediseñala con estilo ejecutivo. Reduce texto, mejora storytelling, refuerza mensajes clave y propone una estructura más clara.' },
        { n: 50, name: 'Conversión de documento a PowerPoint', cat: 'ppt', fmt: 'ppt', fmtFull: 'PowerPoint', lvl: 'Intermedio',
          gets: 'Transforma documentos largos en slides claras.',
          when: 'Policies, informes, propuestas, documentación extensa.',
          prompt: 'Convierte este documento en una presentación ejecutiva de 10 slides. Cada slide debe tener mensaje principal, soporte visual, bullets mínimos y speaker notes.' },
        { n: 51, name: 'Slide master corporativo', cat: 'ppt', fmt: 'ppt', fmtFull: 'PowerPoint', lvl: 'Intermedio',
          gets: 'Mantiene coherencia visual en toda la presentación.',
          when: 'Decks formales y materiales reutilizables.',
          prompt: 'Crea una estructura de presentación usando un estilo corporativo consistente. Define portada, agenda, sección, contenido, datos, recomendación y cierre.' },
        { n: 52, name: 'Revisión de narrativa', cat: 'ppt', fmt: 'ppt', fmtFull: 'PowerPoint', lvl: 'Avanzado',
          gets: 'Detecta si la historia fluye y convence.',
          when: 'Antes de presentar a dirección o stakeholders críticos.',
          prompt: 'Evalúa la narrativa de esta presentación. Indica dónde se pierde claridad, qué slides sobran, qué falta para convencer y cómo reorganizarla.' },
        { n: 53, name: 'Revisión de carga cognitiva', cat: 'ppt', fmt: 'ppt', fmtFull: 'PowerPoint', lvl: 'Avanzado',
          gets: 'Reduce saturación visual y mejora comprensión.',
          when: 'Slides con demasiado texto, gráficos confusos o mensajes débiles.',
          prompt: 'Revisa cada slide desde el punto de vista de carga cognitiva. Identifica exceso de texto, gráficos confusos, mensajes ambiguos y oportunidades de simplificación.' },
        { n: 54, name: 'Versión para comité ejecutivo', cat: 'ppt', fmt: 'ppt', fmtFull: 'PowerPoint', lvl: 'Avanzado',
          gets: 'Adapta el contenido a alta dirección.',
          when: 'SteerCo, ExCo, leadership team, decisiones estratégicas.',
          prompt: 'Crea una versión para comité ejecutivo. Debe ser más breve, más orientada a decisiones, con menos detalle operativo y más foco en riesgos, trade offs y recomendaciones.' },
        { n: 55, name: 'Versión para comunicación amplia', cat: 'comm', fmt: 'ppt', fmtFull: 'PowerPoint, Word o email', lvl: 'Intermedio',
          gets: 'Traduce contenido técnico a público general.',
          when: 'Townhalls, comunicados internos, formación, change management.',
          prompt: 'Adapta esta presentación para una audiencia amplia. Simplifica lenguaje, añade contexto, reduce tecnicismos y refuerza mensajes clave.' },
        { n: 56, name: 'Preguntas difíciles', cat: 'quality', fmt: 'doc', fmtFull: 'PowerPoint o Word', lvl: 'Avanzado',
          gets: 'Prepara la defensa del contenido.',
          when: 'Presentaciones sensibles, comités, decisiones difíciles.',
          prompt: 'Genera una lista de preguntas difíciles que podrían hacerme sobre esta presentación. Para cada pregunta, dame una respuesta ejecutiva, diplomática y defendible.' },
        { n: 57, name: 'Slide de decisión', cat: 'ppt', fmt: 'ppt', fmtFull: 'PowerPoint', lvl: 'Avanzado',
          gets: 'Clarifica qué decisión se necesita.',
          when: 'Governance, approvals, inversión, reorganización.',
          prompt: 'Crea una slide de decisión. Debe incluir contexto, opciones consideradas, recomendación, riesgos, impacto, decisión requerida y próximos pasos.' },
        { n: 58, name: 'Slide de riesgos', cat: 'ppt', fmt: 'ppt', fmtFull: 'PowerPoint', lvl: 'Intermedio',
          gets: 'Ordena riesgos y mitigaciones.',
          when: 'Proyectos, transformación, M&A, HR, compliance.',
          prompt: 'Crea una slide de riesgos con matriz de impacto y probabilidad. Incluye mitigación, owner, timing y nivel de urgencia.' },
        { n: 59, name: 'Slide de opciones', cat: 'ppt', fmt: 'ppt', fmtFull: 'PowerPoint', lvl: 'Intermedio',
          gets: 'Compara alternativas de forma ejecutiva.',
          when: 'Decisiones estratégicas, reorganizaciones, inversión, planificación.',
          prompt: 'Crea una slide comparando tres opciones. Para cada una, incluye beneficios, riesgos, coste, complejidad, impacto en personas y recomendación.' },
        { n: 60, name: 'Appendix inteligente', cat: 'ppt', fmt: 'ppt', fmtFull: 'PowerPoint', lvl: 'Intermedio',
          gets: 'Guarda detalle sin saturar el core deck.',
          when: 'Presentaciones ejecutivas con análisis complejo.',
          prompt: 'Separa el contenido en core deck y appendix. El core debe contar la historia ejecutiva y el appendix debe guardar el detalle de soporte.' },
        // ---- 61-72 artifacts / apps ----
        { n: 61, name: 'Dashboard ejecutivo interactivo', cat: 'artifact', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Avanzado',
          gets: 'Crea una experiencia más potente que una slide.',
          when: 'Seguimiento de KPIs, reporting, leadership updates.',
          prompt: 'Crea un dashboard ejecutivo interactivo en formato Artifact. Debe incluir KPIs animados, filtros, gráficos, insights automáticos, alertas y resumen ejecutivo.' },
        { n: 62, name: 'Simulador de escenarios', cat: 'artifact', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Avanzado',
          gets: 'Permite probar decisiones y ver impactos.',
          when: 'Costes, headcount, staffing, salary review, capacity.',
          prompt: 'Crea un simulador de escenarios. El usuario debe poder modificar inputs y ver automáticamente el impacto en coste, riesgo, capacidad y recomendación.' },
        { n: 63, name: 'Calculadora corporativa', cat: 'artifact', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Intermedio',
          gets: 'Automatiza cálculos repetitivos.',
          when: 'Bonus, salary increase, capacity, utilization, staffing.',
          prompt: 'Crea una calculadora interactiva para este proceso. Debe tener campos de entrada, validaciones, cálculo automático, explicación del resultado y opción de copiar resumen.' },
        { n: 64, name: 'Portal de formación', cat: 'web', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Avanzado',
          gets: 'Convierte contenido en experiencia formativa.',
          when: 'Learning, onboarding, enablement, academias internas.',
          prompt: 'Crea un portal de formación interactivo con módulos, progreso visual, tarjetas de aprendizaje, ejercicios, prompts copiables y sección de recursos.' },
        { n: 65, name: 'Biblioteca de prompts con buscador', cat: 'web', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Avanzado',
          gets: 'Hace útil una colección grande de prompts.',
          when: 'Formación Claude, HR, consultoría, productividad.',
          prompt: 'Crea una biblioteca de prompts con buscador, filtros por categoría, nivel de dificultad, caso de uso y botón para copiar cada prompt.' },
        { n: 66, name: 'Generador de briefing ejecutivo', cat: 'artifact', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Avanzado',
          gets: 'Convierte inputs básicos en resumen para dirección.',
          when: 'Reuniones, SteerCos, updates, decisiones.',
          prompt: 'Crea una herramienta que genere briefings ejecutivos. El usuario debe introducir contexto, datos, riesgos y decisión requerida, y la herramienta debe devolver un resumen estructurado.' },
        { n: 67, name: 'Talent Review Tool', cat: 'hr', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Avanzado',
          gets: 'Apoya calibraciones de talento.',
          when: 'Performance, succession, talent discussions.',
          prompt: 'Crea una herramienta interactiva de Talent Review. Debe permitir evaluar performance, potencial, riesgo de fuga, readiness, sucesión y acciones recomendadas.' },
        { n: 68, name: '9 Box interactivo', cat: 'hr', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Avanzado',
          gets: 'Visualiza talento por performance y potencial.',
          when: 'Talent discussions, succession planning, calibraciones.',
          prompt: 'Crea una 9 Box interactiva. Debe permitir cargar perfiles, ubicarlos por performance y potencial, filtrar por unidad y mostrar recomendaciones por cuadrante.' },
        { n: 69, name: 'Organigrama interactivo', cat: 'artifact', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Avanzado',
          gets: 'Visualiza estructuras organizativas de forma navegable.',
          when: 'Reorganizaciones, workforce planning, diseño organizativo.',
          prompt: 'Crea un organigrama interactivo con búsqueda, filtros por unidad, expansión de nodos, información de cada equipo y vista de cambios organizativos.' },
        { n: 70, name: 'Mapa de skills', cat: 'hr', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Avanzado',
          gets: 'Detecta capacidades, fortalezas y gaps.',
          when: 'Upskilling, workforce, staffing, capability planning.',
          prompt: 'Crea un mapa de skills interactivo. Debe mostrar fortalezas, gaps, skills críticas, cobertura por equipo y prioridades de upskilling.' },
        { n: 71, name: 'Hiring funnel dashboard', cat: 'hr', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Avanzado',
          gets: 'Visualiza el funnel de selección.',
          when: 'Talent Acquisition, recruiting, workforce planning.',
          prompt: 'Crea un dashboard de hiring funnel con candidatos por fase, conversiones, time to hire, bottlenecks, aging y recomendaciones.' },
        { n: 72, name: 'Project status dashboard', cat: 'artifact', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Intermedio',
          gets: 'Permite seguir iniciativas de forma visual.',
          when: 'PMO, transformación, HR programs, proyectos tecnológicos.',
          prompt: 'Crea un dashboard de estado de proyecto con milestones, riesgos, dependencias, owners, estado RAG y próximos pasos.' },
        // ---- 73-80 comunicación / docs ----
        { n: 73, name: 'Memo ejecutivo', cat: 'comm', fmt: 'doc', fmtFull: 'Word o PDF', lvl: 'Intermedio',
          gets: 'Convierte análisis en documento de decisión.',
          when: 'Leadership, HR, estrategia, governance.',
          prompt: 'Convierte este análisis en un memo ejecutivo. Incluye contexto, diagnóstico, opciones, recomendación, riesgos, implicaciones y decisión necesaria.' },
        { n: 74, name: 'FAQ inteligente', cat: 'comm', fmt: 'doc', fmtFull: 'Word, PDF o HTML', lvl: 'Intermedio',
          gets: 'Anticipa dudas de distintas audiencias.',
          when: 'Cambios organizativos, políticas, comunicaciones, onboarding.',
          prompt: 'Crea un FAQ inteligente para esta iniciativa. Incluye preguntas previsibles de empleados, managers, HR, Legal y leadership.' },
        { n: 75, name: 'Mensaje por audiencias', cat: 'comm', fmt: 'doc', fmtFull: 'Word, email o PowerPoint', lvl: 'Avanzado',
          gets: 'Adapta el mensaje según stakeholder.',
          when: 'Cambios sensibles, reorganizaciones, comunicación corporativa.',
          prompt: 'Crea versiones del mensaje para diferentes audiencias: leadership, managers, empleados, HR y stakeholders globales. Ajusta tono, nivel de detalle y foco.' },
        { n: 76, name: 'Plan de comunicación', cat: 'comm', fmt: 'doc', fmtFull: 'Word, Excel o PowerPoint', lvl: 'Intermedio',
          gets: 'Ordena mensajes, canales, timings y owners.',
          when: 'Transformaciones, launches, reorganizaciones, programas.',
          prompt: 'Crea un plan de comunicación con audiencias, mensajes clave, canales, timing, owners, riesgos y mecanismos de feedback.' },
        { n: 77, name: 'Traducción ejecutiva', cat: 'comm', fmt: 'comm', fmtFull: 'Texto, Word o email', lvl: 'Básico',
          gets: 'Mejora traducciones literales y las adapta al contexto corporativo.',
          when: 'Inglés corporativo, mensajes globales, emails, decks.',
          prompt: 'Traduce este texto al inglés corporativo, mejorando claridad, tono y naturalidad. No lo traduzcas literal. Haz que suene profesional, cercano y ejecutivo.' },
        { n: 78, name: 'Versión Teams', cat: 'comm', fmt: 'comm', fmtFull: 'Chat o Teams', lvl: 'Básico',
          gets: 'Reduce mensajes largos a una versión breve y accionable.',
          when: 'Comunicación rápida, coordinación interna, follow ups.',
          prompt: 'Convierte este mensaje en una versión breve para Teams. Debe ser clara, cercana, profesional y accionable.' },
        { n: 79, name: 'Policy simplificada', cat: 'comm', fmt: 'doc', fmtFull: 'Word, PDF o HTML', lvl: 'Intermedio',
          gets: 'Hace comprensible una política compleja.',
          when: 'HR, compliance, onboarding, cambios normativos.',
          prompt: 'Resume esta política en lenguaje sencillo. Incluye qué cambia, a quién afecta, qué debe hacer cada persona y qué riesgos hay si no se cumple.' },
        { n: 80, name: 'Comparación de documentos', cat: 'quality', fmt: 'doc', fmtFull: 'Word o PDF', lvl: 'Avanzado',
          gets: 'Detecta diferencias, contradicciones e implicaciones.',
          when: 'Policies, contratos, versiones de deck, documentación interna.',
          prompt: 'Compara estos dos documentos. Identifica cambios relevantes, implicaciones, riesgos, contradicciones y puntos que requieren validación.' },
        // ---- 81-88 workflows ----
        { n: 81, name: 'Workflow Excel a PowerPoint', cat: 'flow', fmt: 'ppt', fmtFull: 'Excel y PowerPoint', lvl: 'Avanzado',
          gets: 'Convierte datos en una presentación ejecutiva.',
          when: 'Reporting mensual, performance, people analytics, finanzas.',
          prompt: 'A partir de este Excel, identifica los insights principales y crea una presentación ejecutiva. Incluye gráficos, mensajes clave, riesgos y recomendaciones.' },
        { n: 82, name: 'Workflow PDF a portal HTML', cat: 'flow', fmt: 'art', fmtFull: 'PDF y HTML', lvl: 'Avanzado',
          gets: 'Convierte documentos largos en experiencias útiles.',
          when: 'Policies, formación, onboarding, documentación interna.',
          prompt: 'Convierte este PDF en un portal HTML interactivo con resumen, buscador, FAQ, navegación por secciones y prompts de consulta rápida.' },
        { n: 83, name: 'Workflow deck a memo', cat: 'flow', fmt: 'doc', fmtFull: 'PowerPoint y Word', lvl: 'Intermedio',
          gets: 'Convierte slides en documento ejecutivo.',
          when: 'Enviar resumen después de una reunión o comité.',
          prompt: 'Convierte esta presentación en un memo ejecutivo de una página. Mantén solo los puntos clave, decisiones, riesgos y próximos pasos.' },
        { n: 84, name: 'Workflow documento a checklist', cat: 'flow', fmt: 'doc', fmtFull: 'Word, PDF o Excel', lvl: 'Intermedio',
          gets: 'Vuelve accionable un proceso.',
          when: 'HR, Legal, operaciones, compliance, gestión de proyectos.',
          prompt: 'Convierte este documento en una checklist operativa. Incluye pasos, responsables, inputs necesarios, controles y riesgos.' },
        { n: 85, name: 'Workflow reunión a plan de acción', cat: 'prod', fmt: 'doc', fmtFull: 'Word, Excel o texto', lvl: 'Básico',
          gets: 'Ordena notas desestructuradas.',
          when: 'Minutas, workshops, leadership meetings, follow ups.',
          prompt: 'Convierte estas notas de reunión en un plan de acción. Identifica decisiones, acciones, owners, fechas, riesgos y asuntos pendientes.' },
        { n: 86, name: 'Workflow análisis a email', cat: 'comm', fmt: 'comm', fmtFull: 'Email', lvl: 'Básico',
          gets: 'Traduce análisis en comunicación accionable.',
          when: 'Updates a stakeholders, decisiones, seguimiento.',
          prompt: 'Convierte este análisis en un email ejecutivo. Debe incluir contexto breve, conclusión, decisión recomendada y acciones requeridas.' },
        { n: 87, name: 'Workflow datos a historia', cat: 'story', fmt: 'ppt', fmtFull: 'PowerPoint, Word o Artifact', lvl: 'Avanzado',
          gets: 'Construye una narrativa a partir de números.',
          when: 'Reporting, comités, presentaciones de resultados.',
          prompt: 'No me describas solo los datos. Construye una historia ejecutiva con tensión, hallazgo, implicación y recomendación.' },
        { n: 88, name: 'Workflow estrategia a roadmap', cat: 'flow', fmt: 'ppt', fmtFull: 'PowerPoint, Excel o Artifact', lvl: 'Avanzado',
          gets: 'Convierte una idea estratégica en plan operativo.',
          when: 'Iniciativas nuevas, transformación, programas.',
          prompt: 'Convierte esta estrategia en un roadmap operativo. Incluye fases, iniciativas, dependencias, riesgos, KPIs y governance.' },
        // ---- 89-96 calidad / riesgos ----
        { n: 89, name: 'Crítica como socio exigente', cat: 'quality', fmt: 'any', fmtFull: 'Cualquier formato', lvl: 'Avanzado',
          gets: 'Mejora la calidad del entregable antes de compartirlo.',
          when: 'Antes de enviar algo importante.',
          prompt: 'Actúa como un socio de consultoría muy exigente. Critica este entregable, identifica debilidades, puntos poco defendibles y mejoras necesarias.' },
        { n: 90, name: 'Revisión de supuestos', cat: 'quality', fmt: 'doc', fmtFull: 'Word, PowerPoint o texto', lvl: 'Avanzado',
          gets: 'Evita decisiones construidas sobre hipótesis débiles.',
          when: 'Casos ambiguos, decisiones sensibles, análisis estratégicos.',
          prompt: 'Identifica todos los supuestos de este análisis. Clasifícalos como seguros, discutibles o arriesgados, y explica cómo cambiaría la recomendación si fueran falsos.' },
        { n: 91, name: 'Análisis de riesgos reputacionales', cat: 'quality', fmt: 'doc', fmtFull: 'Word, PowerPoint o texto', lvl: 'Avanzado',
          gets: 'Anticipa problemas políticos, humanos o reputacionales.',
          when: 'HR, cambios organizativos, comunicación sensible, decisiones complejas.',
          prompt: 'Analiza los riesgos reputacionales de esta decisión. Considera empleados, managers, leadership, legal, compliance, comunicación interna y precedente organizativo.' },
        { n: 92, name: 'Validación de consistencia', cat: 'quality', fmt: 'doc', fmtFull: 'Word, PowerPoint o PDF', lvl: 'Intermedio',
          gets: 'Detecta contradicciones internas.',
          when: 'Presentaciones, policies, memos, documentos importantes.',
          prompt: 'Revisa la consistencia interna de este documento. Busca contradicciones, cambios de criterio, afirmaciones no soportadas y mensajes ambiguos.' },
        { n: 93, name: 'Versión defendible ante Legal o Compliance', cat: 'quality', fmt: 'doc', fmtFull: 'Word, email o PowerPoint', lvl: 'Avanzado',
          gets: 'Reduce riesgos en el wording.',
          when: 'Comunicaciones sensibles, decisiones de personas, cambios organizativos.',
          prompt: 'Reescribe este mensaje para que sea más defendible ante Legal, Compliance y HR. Mantén un tono humano, claro y no defensivo.' },
        { n: 94, name: 'Matriz de decisión', cat: 'quality', fmt: 'ppt', fmtFull: 'PowerPoint, Excel o Artifact', lvl: 'Avanzado',
          gets: 'Estructura alternativas con criterios ponderados.',
          when: 'Decisiones complejas, priorización, inversión, organización.',
          prompt: 'Crea una matriz de decisión con criterios ponderados. Compara opciones, asigna puntuación, explica trade offs y recomienda una vía.' },
        { n: 95, name: 'Red team del entregable', cat: 'quality', fmt: 'any', fmtFull: 'Cualquier formato', lvl: 'Avanzado',
          gets: 'Simula una oposición crítica antes de presentar.',
          when: 'Comités, decisiones sensibles, propuestas importantes.',
          prompt: 'Haz red team de este entregable. Busca argumentos en contra, preguntas incómodas, debilidades analíticas y riesgos de interpretación.' },
        { n: 96, name: 'Checklist final antes de enviar', cat: 'quality', fmt: 'any', fmtFull: 'Cualquier formato', lvl: 'Básico',
          gets: 'Evita errores antes de compartir un entregable.',
          when: 'Antes de enviar documentos, presentaciones, emails o dashboards.',
          prompt: 'Crea una checklist final de revisión antes de enviar este documento. Incluye claridad, exactitud, tono, datos, riesgos, audiencia y próximos pasos.' },
        // ---- 97-100 formación / herramientas ----
        { n: 97, name: 'Prompt enhancer', cat: 'learn', fmt: 'art', fmtFull: 'Texto o Artifact', lvl: 'Intermedio',
          gets: 'Convierte prompts pobres en prompts avanzados.',
          when: 'Formación de usuarios, biblioteca de prompts, mejora continua.',
          prompt: 'Convierte este prompt básico en un prompt avanzado. Añade rol, contexto, objetivo, restricciones, formato de salida, criterios de calidad y ejemplos.' },
        { n: 98, name: 'Modo antes y después', cat: 'learn', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Intermedio',
          gets: 'Muestra claramente el valor de pedir mejor.',
          when: 'Formación, talleres, demos de Claude.',
          prompt: 'Crea una comparación antes y después. Muestra el resultado de un prompt básico frente a un prompt avanzado, explicando por qué mejora.' },
        { n: 99, name: 'Biblioteca con favoritos', cat: 'web', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Avanzado',
          gets: 'Permite al usuario guardar sus prompts preferidos.',
          when: 'Portales de prompts, formación, herramientas internas.',
          prompt: 'Añade una función para marcar prompts como favoritos. Los favoritos deben guardarse localmente en el navegador y mostrarse en una sección separada.' },
        { n: 100, name: 'Generador de prompts personalizado', cat: 'web', fmt: 'art', fmtFull: 'Artifact o HTML', lvl: 'Avanzado',
          gets: 'Convierte la web en una herramienta interactiva.',
          when: 'Academias de IA, formación Claude, productividad corporativa.',
          prompt: 'Crea un generador de prompts. El usuario debe seleccionar rol, tarea, audiencia, formato, tono y nivel de detalle. La herramienta debe generar un prompt completo listo para copiar.' }
    ];

    // id estable para favoritos / búsqueda.
    CATALOG.forEach(function (it) { it.id = 'cat' + it.n; });
    window.CATALOG = CATALOG;            // expuesto para el buscador global (Ctrl+K)
    window.CATALOG_CAT_LABELS = CAT_LABELS;

    // ===== Estado de filtros =====
    var FAV_KEY = 'hrFavCatalog';
    var state = { cat: 'all', lvl: 'all', fmt: 'all', q: '', favOnly: false };
    var rendered = false;

    function getFavs() { try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; } catch (e) { return []; } }
    function isFav(id) { return getFavs().indexOf(id) !== -1; }
    function toggleFav(id) {
        var f = getFavs(), i = f.indexOf(id);
        if (i >= 0) f.splice(i, 1); else f.push(id);
        try { localStorage.setItem(FAV_KEY, JSON.stringify(f)); } catch (e) {}
        updateFavCount();
        if (state.favOnly) renderCatalog();
    }
    function updateFavCount() { var el = document.getElementById('cat-fav-count'); if (el) el.textContent = '(' + getFavs().length + ')'; }

    function levelSlug(l) { return (l || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
    function norm(s) { return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }

    // ===== Construir controles (chips de categoría + selects) =====
    function buildControls() {
        var catsBar = document.getElementById('cat-cats');
        if (catsBar) {
            var keys = ['all'].concat(Object.keys(CAT_LABELS));
            catsBar.innerHTML = keys.map(function (k) {
                var label = k === 'all' ? 'Todas' : CAT_SHORT[k];
                var count = k === 'all' ? CATALOG.length : CATALOG.filter(function (c) { return c.cat === k; }).length;
                return '<button class="cat-chip' + (k === 'all' ? ' active' : '') + '" type="button" data-cat="' + k + '">' + label + ' <span class="cc-n">' + count + '</span></button>';
            }).join('');
            catsBar.querySelectorAll('.cat-chip').forEach(function (b) {
                b.addEventListener('click', function () {
                    catsBar.querySelectorAll('.cat-chip').forEach(function (x) { x.classList.remove('active'); });
                    b.classList.add('active');
                    state.cat = b.dataset.cat; renderCatalog();
                });
            });
        }
        var lvlSel = document.getElementById('cat-level');
        if (lvlSel) {
            lvlSel.innerHTML = '<option value="all">Todos los niveles</option><option value="basico">Básico</option><option value="intermedio">Intermedio</option><option value="avanzado">Avanzado</option>';
            lvlSel.addEventListener('change', function () { state.lvl = lvlSel.value; renderCatalog(); });
        }
        var fmtSel = document.getElementById('cat-format');
        if (fmtSel) {
            fmtSel.innerHTML = '<option value="all">Todos los formatos</option>' +
                Object.keys(FMT_LABELS).map(function (k) { return '<option value="' + k + '">' + FMT_LABELS[k] + '</option>'; }).join('');
            fmtSel.addEventListener('change', function () { state.fmt = fmtSel.value; renderCatalog(); });
        }
        var search = document.getElementById('cat-search');
        if (search) search.addEventListener('input', function () { state.q = search.value; renderCatalog(); });
        var fav = document.getElementById('cat-fav');
        if (fav) fav.addEventListener('click', function () {
            state.favOnly = !state.favOnly;
            fav.classList.toggle('active', state.favOnly);
            renderCatalog();
        });
        updateFavCount();
    }

    // ===== Render del grid =====
    function matches(it) {
        if (state.favOnly && !isFav(it.id)) return false;
        if (state.cat !== 'all' && it.cat !== state.cat) return false;
        if (state.lvl !== 'all' && levelSlug(it.lvl) !== state.lvl) return false;
        if (state.fmt !== 'all' && it.fmt !== state.fmt) return false;
        if (state.q && state.q.trim().length) {
            var hay = norm(it.name + ' ' + it.gets + ' ' + it.when + ' ' + it.prompt + ' ' + CAT_LABELS[it.cat] + ' ' + it.fmtFull);
            if (hay.indexOf(norm(state.q)) === -1) return false;
        }
        return true;
    }

    function esc(t) { var d = document.createElement('div'); d.textContent = t; return d.innerHTML; }

    function renderCatalog() {
        var grid = document.getElementById('cat-grid');
        if (!grid) return;
        var list = CATALOG.filter(matches);
        var countEl = document.getElementById('cat-count');
        if (countEl) countEl.textContent = list.length + (list.length === 1 ? ' recurso' : ' recursos');

        if (!list.length) {
            grid.innerHTML = '<div class="cat-empty"><span class="cat-empty-ic">&#128269;</span><p>Sin resultados con esos filtros.<br>Prueba a quitar alguno o cambia la búsqueda.</p></div>';
            return;
        }

        grid.innerHTML = list.map(function (it) {
            return '' +
            '<div class="cat-card" data-id="' + it.id + '">' +
            '  <div class="cat-card-top">' +
            '    <span class="cat-badge cat-' + it.cat + '">' + esc(CAT_SHORT[it.cat]) + '</span>' +
            '    <button class="cat-fav-btn' + (isFav(it.id) ? ' on' : '') + '" type="button" data-fav="' + it.id + '" title="Marcar como favorito" aria-label="Marcar como favorito">&#9733;</button>' +
            '  </div>' +
            '  <h3 class="cat-name"><span class="cat-n">' + it.n + '</span>' + esc(it.name) + '</h3>' +
            '  <div class="cat-tags">' +
            '    <span class="cat-lvl lvl-' + levelSlug(it.lvl) + '">' + it.lvl + '</span>' +
            '    <span class="cat-fmt">' + esc(it.fmtFull) + '</span>' +
            '  </div>' +
            '  <p class="cat-line"><span class="cat-k">Qué consigue</span>' + esc(it.gets) + '</p>' +
            '  <p class="cat-line"><span class="cat-k">Cuándo usarlo</span>' + esc(it.when) + '</p>' +
            '  <div class="cat-prompt">' + esc(it.prompt) + '</div>' +
            '  <div class="cat-actions">' +
            '    <button class="btn btn-sm btn-secondary cat-expand" type="button" data-expand>Ver completo</button>' +
            '    <button class="btn btn-sm btn-copy cat-copy" type="button" data-copy="' + it.id + '">Copiar prompt</button>' +
            '  </div>' +
            '</div>';
        }).join('');
    }

    // Delegación de eventos en el grid (copiar / favorito / expandir).
    function wireGrid() {
        var grid = document.getElementById('cat-grid');
        if (!grid) return;
        grid.addEventListener('click', function (e) {
            var copyBtn = e.target.closest('[data-copy]');
            if (copyBtn) {
                var it = CATALOG.find(function (c) { return c.id === copyBtn.getAttribute('data-copy'); });
                if (it && typeof window.copyText === 'function') window.copyText(it.prompt, copyBtn);
                else if (it && navigator.clipboard) navigator.clipboard.writeText(it.prompt);
                return;
            }
            var favBtn = e.target.closest('[data-fav]');
            if (favBtn) { toggleFav(favBtn.getAttribute('data-fav')); favBtn.classList.toggle('on'); return; }
            var expBtn = e.target.closest('[data-expand]');
            if (expBtn) {
                var card = expBtn.closest('.cat-card');
                var open = card.classList.toggle('expanded');
                expBtn.textContent = open ? 'Ver menos' : 'Ver completo';
            }
        });
    }

    // ===== Sub-pestañas del área Avanzado (Galería ↔ Catálogo) =====
    function wireTabs() {
        var tabs = document.querySelectorAll('.avz-tab');
        tabs.forEach(function (t) {
            t.addEventListener('click', function () {
                var target = t.dataset.avz;
                tabs.forEach(function (x) {
                    var on = x === t;
                    x.classList.toggle('active', on);
                    x.setAttribute('aria-selected', on ? 'true' : 'false');
                });
                document.querySelectorAll('.avz-panel').forEach(function (p) {
                    p.hidden = (p.id !== 'avz-' + target);
                });
                if (target === 'catalogo') ensureCatalog();
            });
        });
    }

    // Render perezoso del catálogo (la primera vez que se abre su pestaña).
    function ensureCatalog() {
        if (rendered) return;
        buildControls();
        wireGrid();
        renderCatalog();
        rendered = true;
    }
    // Permite abrir el catálogo desde fuera (p. ej. el buscador global).
    window.openCatalogTab = function () {
        var tab = document.querySelector('.avz-tab[data-avz="catalogo"]');
        if (tab) tab.click();
    };

    function init() { wireTabs(); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
