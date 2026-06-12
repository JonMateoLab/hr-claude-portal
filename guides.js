/* ============================================================================
 *  guides.js — "Guías" (3ª sub-pestaña del pilar Avanzado)
 *  ---------------------------------------------------------------------------
 *  Menú maestro-detalle: el usuario elige una guía y entra en su contenido
 *  (sin scroll infinito). Cada guía se compone de "bloques" tipados:
 *    intro · lead · cards · table · compare · prompts · steps · callout
 *  Reutiliza window.copyText() del portal para los prompts copiables.
 * ========================================================================== */
(function () {
    'use strict';

    var GUIDES = [
        /* ===== 1. ARCHIVOS QUE PUEDE ANALIZAR ===== */
        {
            id: 'archivos', icon: '&#128206;', tag: 'Analizar', title: 'Qué archivos puedes subir a Claude',
            desc: 'PDF, Excel, Word, PPT, CSV, JSON, imágenes… qué subir y qué pedirle.',
            blocks: [
                { type: 'intro', text: 'Claude no solo lee lo que escribes: puedes <strong>adjuntar archivos</strong> y pedirle que los analice. La clave no es el archivo, sino <strong>qué le pides hacer con él</strong>. Aquí tienes los formatos más útiles y un prompt listo para cada uno.' },
                { type: 'cards', items: [
                    { icon: '&#128196;', title: 'PDF', body: 'Políticas, informes, contratos, research, guías de proceso.', sub: 'Pídele: resumen ejecutivo, riesgos, FAQ, checklist, briefing.', prompt: 'Analiza este PDF como un consultor senior. Extrae el resumen ejecutivo, los puntos críticos, los riesgos, las decisiones necesarias y una propuesta de próximos pasos.' },
                    { icon: '&#128202;', title: 'Excel / XLSX', body: 'Headcount, costes, compensación, attrition, forecast, performance.', sub: 'Pídele: tendencias, outliers, errores, gráficos, narrativa ejecutiva.', prompt: 'Analiza este Excel como un experto en analytics corporativo. Identifica tendencias, anomalías, riesgos, insights accionables y recomendaciones para leadership.' },
                    { icon: '&#128221;', title: 'Word / DOCX', body: 'Borradores, propuestas, actas, políticas, comunicaciones.', sub: 'Pídele: reescritura ejecutiva, resumen, consistencia, tono.', prompt: 'Revisa este documento Word. Mejora claridad y tono ejecutivo, detecta contradicciones, resume en una versión de una página y sugiere qué falta.' },
                    { icon: '&#128459;', title: 'CSV', body: 'Exportaciones de sistemas, datasets, listados.', sub: 'Pídele: limpieza, diccionario de datos, segmentación, dashboard.', prompt: 'Analiza este CSV. Crea un diccionario de datos, detecta duplicados y campos incompletos, y resume los 3 hallazgos más relevantes.' },
                    { icon: '&#128200;', title: 'PowerPoint / PPTX', body: 'Decks existentes, propuestas, materiales de comité.', sub: 'Pídele: mejora narrativa, menos texto, rediseño, speaker notes.', prompt: 'Revisa esta presentación como un socio de consultoría. Identifica debilidades, mejora la narrativa, reduce texto, refuerza el mensaje ejecutivo y añade speaker notes.' },
                    { icon: '&#127760;', title: 'HTML', body: 'Webs, prototipos, páginas formativas, dashboards.', sub: 'Pídele: rediseño, UX, responsive, filtros, buscador.', prompt: 'Mejora esta web manteniendo su estructura, pero añade una experiencia más premium, mejor navegación, tarjetas visuales, buscador, filtros y botones de copia.' },
                    { icon: '&#128290;', title: 'JSON / XML', body: 'Datos estructurados, configuraciones, outputs de sistemas.', sub: 'Pídele: convertir a tabla, validar, visualizar, explicar.', prompt: 'Convierte este JSON en una visualización clara. Explica la estructura, identifica los campos clave y crea una tabla o dashboard para analizarlo.' },
                    { icon: '&#128247;', title: 'Imágenes (JPG/PNG)', body: 'Capturas, diagramas, slides, esquemas, gráficos.', sub: 'Pídele: interpretación, extracción, propuesta de rediseño.', prompt: 'Analiza esta imagen. Describe qué contiene, qué problemas visuales tiene y cómo la mejorarías para una presentación ejecutiva.' }
                ] },
                { type: 'callout', tone: 'warn', title: 'Antes de subir nada', text: 'No subas datos sensibles si no está permitido. <strong>Anonimiza</strong> nombres, emails e IDs, usa datos ficticios en demos y <strong>revisa siempre</strong> el output antes de compartirlo. Ante la duda, valida con Legal o Employee Relations.' }
            ]
        },

        /* ===== 2. ENTREGABLES QUE PUEDE CREAR ===== */
        {
            id: 'entregables', icon: '&#128736;', tag: 'Crear', title: 'Qué entregables puede crear Claude',
            desc: 'De un PowerPoint a un dashboard interactivo o un memo ejecutivo.',
            blocks: [
                { type: 'intro', text: 'Claude no es solo un chat: puede <strong>preparar entregables corporativos reales</strong>. Dale los datos y el formato que necesitas, e itéralo después ("hazlo más ejecutivo", "reduce a 200 palabras", "añade una slide de decisión").' },
                { type: 'cards', items: [
                    { icon: '&#128200;', title: 'Presentación ejecutiva', body: 'Decks editables para negocio, comités o formación.', prompt: 'Crea una presentación ejecutiva de 10 slides a partir de este análisis: portada, contexto, diagnóstico, insights, riesgos, opciones, recomendación, roadmap, próximos pasos y appendix.' },
                    { icon: '&#128202;', title: 'Plantilla Excel', body: 'Modelos, trackers y análisis reutilizables.', prompt: 'Crea una plantilla Excel para hacer seguimiento de este proceso. Incluye pestañas, fórmulas, validaciones, instrucciones de uso y un resumen ejecutivo automático.' },
                    { icon: '&#9889;', title: 'Artifact interactivo', body: 'Dashboard, simulador, calculadora o portal.', prompt: 'Crea un Artifact interactivo que permita analizar estos datos, filtrar resultados, visualizar KPIs, generar insights y exportar un resumen ejecutivo.' },
                    { icon: '&#128209;', title: 'Memo ejecutivo', body: 'Documento de decisión para leadership.', prompt: 'Convierte este análisis en un memo ejecutivo: contexto, diagnóstico, opciones, recomendación, riesgos, implicaciones y decisión necesaria.' },
                    { icon: '&#10067;', title: 'FAQ inteligente', body: 'Anticipa dudas de varias audiencias.', prompt: 'Crea un FAQ para esta iniciativa con preguntas previsibles de empleados, managers, HR, Legal y leadership, y respuestas claras.' },
                    { icon: '&#9989;', title: 'Checklist operativa', body: 'Vuelve accionable un proceso.', prompt: 'Convierte este documento en una checklist operativa con pasos, responsables, inputs necesarios, controles y riesgos.' }
                ] },
                { type: 'callout', tone: 'info', title: 'Truco', text: 'Pide el <strong>formato desde el principio</strong> ("en una tabla", "como email", "un HTML autocontenido") y, si el entregable es importante, pídele también una <strong>versión para comité</strong> y las <strong>preguntas difíciles</strong> que te podrían hacer.' }
            ]
        },

        /* ===== 3. POWERPOINT vs ARTIFACT ===== */
        {
            id: 'ppt-artifact', icon: '&#9878;', tag: 'Decidir', title: 'PowerPoint o presentación interactiva',
            desc: 'Cuándo conviene un deck editable y cuándo un Artifact/HTML.',
            blocks: [
                { type: 'intro', text: 'Las dos opciones son válidas; dependen de para qué sea. <strong>PowerPoint</strong> gana cuando necesitas un deck formal, editable y fácil de compartir por email. <strong>Artifact / HTML</strong> gana cuando quieres una experiencia interactiva, visual y dinámica.' },
                { type: 'table', headers: ['Necesidad', 'Mejor opción', 'Por qué'], rows: [
                    ['Deck formal para comité', 'PowerPoint', 'Editable y esperado en gobierno corporativo'],
                    ['Plantilla corporativa', 'PowerPoint', 'Respeta el branding oficial'],
                    ['Gráficos nativos editables', 'PowerPoint', 'Cada uno puede ajustarlos luego'],
                    ['Enviar por email', 'PowerPoint', 'Adjunto universal, sin servidor'],
                    ['Speaker notes para presentar', 'PowerPoint', 'Notas por slide integradas'],
                    ['Experiencia con animaciones', 'Artifact / HTML', 'Control total del movimiento'],
                    ['KPIs que cargan desde cero', 'Artifact / HTML', 'Animación y sensación de vivo'],
                    ['Scroll narrativo', 'Artifact / HTML', 'Relato guiado por el scroll'],
                    ['Filtros interactivos', 'Artifact / HTML', 'El usuario explora los datos'],
                    ['Dashboard vivo', 'Artifact / HTML', 'Interacción y drill-down'],
                    ['Simulador de escenarios', 'Artifact / HTML', 'Recalcula al cambiar inputs'],
                    ['Portal formativo', 'Artifact / HTML', 'Navegación, progreso, buscador'],
                    ['Buscador / catálogo de prompts', 'Artifact / HTML', 'Filtrado y copia en vivo'],
                    ['Herramienta interna reutilizable', 'Artifact / HTML', 'Se usa, no solo se mira']
                ] },
                { type: 'callout', tone: 'ok', title: 'Regla rápida', text: 'Si el entregable se va a <strong>editar y reenviar</strong> → PowerPoint. Si se va a <strong>usar e interactuar</strong> → Artifact / HTML.' }
            ]
        },

        /* ===== 4. PRESENTACIONES AVANZADAS ===== */
        {
            id: 'presentaciones', icon: '&#127908;', tag: 'Presentar', title: 'Cómo pedir mejores presentaciones',
            desc: 'De "hazme una presentación" a un deck con narrativa de consultoría.',
            blocks: [
                { type: 'intro', text: 'La mayoría pide "hazme una presentación" y se queda corto. Cuanto más claro seas con <strong>narrativa, datos convertidos en insight, diseño y nivel de la audiencia</strong>, mejor el resultado.' },
                { type: 'compare', left: { label: 'Prompt básico', text: 'Hazme una presentación sobre este tema.' }, right: { label: 'Prompt experto', text: 'Crea una presentación ejecutiva de 10 slides para leadership con narrativa de consultoría, un mensaje principal por slide, datos convertidos en insights, diseño limpio, slide de decisión, matriz de riesgos, roadmap, speaker notes y preguntas difíciles.' } },
                { type: 'lead', text: 'Cosas concretas que puedes pedir' },
                { type: 'prompts', items: [
                    { label: 'Narrativa de consultoría', text: 'Reestructura esta presentación con lógica de consultoría: contexto, diagnóstico, implicaciones, opciones, recomendación y plan de acción.' },
                    { label: 'Un mensaje por slide', text: 'Asegúrate de que cada slide tenga un único mensaje principal. Si una tiene demasiadas ideas, divídela.' },
                    { label: 'Datos a insight ("so what")', text: 'Para cada dato relevante añade el "so what": implicación de negocio, riesgo y acción recomendada.' },
                    { label: 'Speaker notes', text: 'Añade speaker notes naturales y concisas por slide, e incluye posibles preguntas difíciles con respuestas.' },
                    { label: 'Slide de decisión', text: 'Crea una slide de decisión: contexto, opciones, recomendación, riesgos, impacto y decisión requerida.' },
                    { label: 'Versión para comité', text: 'Crea una versión para comité ejecutivo: más breve, orientada a decisiones, con foco en riesgos, trade-offs y recomendación.' }
                ] }
            ]
        },

        /* ===== 5. EXCEL AVANZADO ===== */
        {
            id: 'excel', icon: '&#128202;', tag: 'Datos', title: 'Excel con Claude como analista',
            desc: 'De entender el archivo a convertirlo en dashboard o presentación.',
            blocks: [
                { type: 'intro', text: 'Claude puede ayudarte en varias capas: <strong>entender</strong> el archivo, <strong>limpiar</strong> datos, <strong>analizar</strong> tendencias y outliers, <strong>crear insights</strong> y convertir todo en un dashboard, una presentación o un memo. Casos típicos de HR:' },
                { type: 'prompts', items: [
                    { label: 'Attrition', text: 'Analiza la rotación por unidad, nivel, antigüedad, localización y manager. Identifica patrones, riesgos y acciones prioritarias.' },
                    { label: 'Compensación', text: 'Analiza este dataset salarial: outliers, inequidades potenciales, desviaciones por nivel, compa ratio, diferencias por colectivo y riesgos de decisión.' },
                    { label: 'Headcount / forecast', text: 'Simula tres escenarios de evolución de plantilla (conservador, base, ambicioso) con impacto en coste, cobertura y riesgo.' },
                    { label: 'Outliers', text: 'Detecta outliers en este dataset. Clasifica cada caso por severidad, posible explicación, impacto y recomendación de revisión.' },
                    { label: 'Auditoría de calidad', text: 'Audita este Excel como un experto en control de calidad: errores, inconsistencias, fórmulas sospechosas, valores extremos y riesgos de interpretación.' },
                    { label: 'Excel → presentación', text: 'Convierte este Excel en una narrativa ejecutiva: los 3 mensajes principales, los datos que los soportan y las decisiones para leadership.' }
                ] },
                { type: 'callout', tone: 'warn', title: 'Valida lo crítico', text: 'Claude puede equivocarse en cálculos. Pídele que <strong>declare sus supuestos</strong> y <strong>revisa a mano</strong> las cifras que sustenten una decisión importante.' }
            ]
        },

        /* ===== 6. ARTIFACTS Y APPS ===== */
        {
            id: 'artifacts', icon: '&#129513;', tag: 'Construir', title: 'Artifacts: de respuesta a herramienta',
            desc: 'Dashboards, simuladores, calculadoras y portales internos.',
            blocks: [
                { type: 'intro', text: 'Un Artifact convierte una respuesta en una <strong>herramienta que se usa</strong>. Dile qué datos tendrá, qué debe poder hacer el usuario y cómo iterarlo después. Ejemplos para HR:' },
                { type: 'cards', items: [
                    { icon: '&#128202;', title: 'Dashboard de HR', body: 'KPIs, filtros, alertas e insights automáticos.', prompt: 'Crea un dashboard ejecutivo de HR interactivo con KPIs animados, filtros por unidad y nivel, gráficos, alertas, insights automáticos y resumen ejecutivo.' },
                    { icon: '&#128176;', title: 'Simulador salarial', body: 'Prueba decisiones y ve el impacto en coste.', prompt: 'Crea un simulador de salary review: el usuario ajusta % de incremento por colectivo y ve el impacto en coste total, compa ratio y equidad.' },
                    { icon: '&#127919;', title: 'Talent Review / 9-Box', body: 'Apoya calibraciones de talento.', prompt: 'Crea una 9-Box interactiva: cargar perfiles, ubicarlos por performance y potencial, filtrar por unidad y mostrar recomendaciones por cuadrante.' },
                    { icon: '&#128101;', title: 'Hiring funnel', body: 'Visualiza el embudo de selección.', prompt: 'Crea un dashboard de hiring funnel con candidatos por fase, conversiones, time-to-hire, cuellos de botella y recomendaciones.' },
                    { icon: '&#128221;', title: 'Generador de briefings', body: 'Inputs básicos → resumen para dirección.', prompt: 'Crea una herramienta que genere briefings ejecutivos: el usuario introduce contexto, datos, riesgos y decisión requerida y devuelve un resumen estructurado.' },
                    { icon: '&#128506;', title: 'Mapa de skills', body: 'Fortalezas, gaps y prioridades de upskilling.', prompt: 'Crea un mapa de skills interactivo: fortalezas, gaps, skills críticas, cobertura por equipo y prioridades de upskilling.' }
                ] }
            ]
        },

        /* ===== 7. WEBS Y UX ===== */
        {
            id: 'webs', icon: '&#127912;', tag: 'Diseñar', title: 'Cómo pedirle que mejore una web',
            desc: 'UX, navegación y componentes que puedes pedir por su nombre.',
            blocks: [
                { type: 'intro', text: 'Puedes pedir mejoras de UX <strong>muy concretas</strong>. Cuanto más nombras el componente, mejor sale. Combínalas con los efectos de la Galería.' },
                { type: 'prompts', items: [
                    { label: 'Hero + navegación', text: 'Crea una hero section premium con un mensaje claro, y añade una barra de navegación sticky con scroll suave a cada sección.' },
                    { label: 'Tarjetas y acordeones', text: 'Organiza el contenido en tarjetas visuales con hover, y usa acordeones para el detalle que no debe estar siempre visible.' },
                    { label: 'Buscador + filtros', text: 'Añade un buscador y filtros combinables por categoría y nivel, con un contador de resultados.' },
                    { label: 'Copiar + favoritos', text: 'Añade botones de copiar con feedback "copiado" y permite marcar favoritos guardados en el navegador.' },
                    { label: 'Tema claro/oscuro', text: 'Añade modo claro y oscuro con un toggle, recordando la preferencia del usuario.' },
                    { label: 'Responsive + accesibilidad', text: 'Haz el diseño responsive (mobile-first) y revisa contraste, foco y etiquetas para mejorar la accesibilidad.' }
                ] }
            ]
        },

        /* ===== 8. WORKFLOWS END-TO-END ===== */
        {
            id: 'workflows', icon: '&#128260;', tag: 'Encadenar', title: 'Workflows completos con Claude',
            desc: 'Flujos de varios pasos: de un Excel a un deck, de un PDF a un portal…',
            blocks: [
                { type: 'intro', text: 'Los mejores resultados salen de <strong>encadenar pasos</strong>: la salida de uno es la entrada del siguiente. Cuatro flujos que puedes copiar tal cual.' },
                { type: 'steps', title: 'Excel → presentación ejecutiva', steps: ['Sube el Excel y pide un análisis de datos', 'Pide los insights principales', 'Pide la storyline (narrativa)', 'Pide el deck de 10 slides', 'Pide speaker notes y preguntas difíciles'], prompt: 'Analiza este Excel, identifica los insights principales, construye una narrativa ejecutiva y crea una presentación de 10 slides con recomendaciones, riesgos, próximos pasos y speaker notes.' },
                { type: 'steps', title: 'PDF → portal formativo', steps: ['Sube el PDF y pide un resumen', 'Extrae conceptos clave', 'Pide un FAQ y una checklist', 'Pide un portal HTML con buscador'], prompt: 'Convierte este PDF en un portal formativo interactivo con resumen, secciones navegables, FAQ, checklist, buscador y prompts útiles para consultar el contenido.' },
                { type: 'steps', title: 'Datos de HR → dashboard', steps: ['Sube el dataset y pide limpieza', 'Define los KPIs', 'Añade filtros y visualizaciones', 'Pide insights automáticos y alertas'], prompt: 'Crea un dashboard interactivo de HR a partir de estos datos: KPIs, filtros, gráficos, alertas, insights automáticos y resumen ejecutivo.' },
                { type: 'steps', title: 'Notas de reunión → plan de acción', steps: ['Pega las notas', 'Extrae decisiones y acciones', 'Asigna owners y fechas', 'Pide un email de recap'], prompt: 'Convierte estas notas de reunión en un plan de acción con decisiones, acciones, owners, fechas, riesgos y un email de recap.' }
            ]
        },

        /* ===== 9. PROJECTS Y SKILLS ===== */
        {
            id: 'projects', icon: '&#128193;', tag: 'Persistir', title: 'Projects y Skills',
            desc: 'Convierte Claude en un entorno de trabajo con memoria y flujos.',
            blocks: [
                { type: 'intro', text: 'Un <strong>Project</strong> es un espacio con contexto y documentos persistentes: subes una vez tus guías, plantillas y ejemplos, y Claude los tiene presentes en cada conversación. Una <strong>Skill</strong> es un flujo de trabajo reutilizable que invocas con un comando.' },
                { type: 'cards', items: [
                    { icon: '&#129309;', title: 'Project de HR', body: 'Documentos: career framework, políticas, guías de performance, plantillas. Instrucciones: actuar como HR Partner senior, tono profesional cercano, foco en riesgos y confidencialidad.' },
                    { icon: '&#128200;', title: 'Project de presentaciones', body: 'Documentos: plantilla corporativa, buenos decks, guía de estilo. Instrucciones: un mensaje por slide, claridad ejecutiva, reducir texto, añadir speaker notes.' },
                    { icon: '&#128202;', title: 'Project de Excel analytics', body: 'Documentos: diccionario de datos, plantillas, ejemplos de reports. Instrucciones: validar datos, detectar outliers, declarar supuestos, insights accionables.' }
                ] },
                { type: 'lead', text: 'Skills útiles que podrías crear' },
                { type: 'prompts', items: [
                    { label: 'Deck checker', text: 'Crea una skill que revise una presentación: un mensaje por slide, carga cognitiva, narrativa, slide de decisión y preguntas difíciles.' },
                    { label: 'Excel reviewer', text: 'Crea una skill que audite un Excel: errores, outliers, supuestos e insights accionables, con un resumen ejecutivo.' },
                    { label: 'Risk reviewer', text: 'Crea una skill que revise cualquier entregable y devuelva riesgos de privacidad, compliance, sesgos y reputación.' }
                ] }
            ]
        }
    ];

    // Registro de prompts copiables del detalle (índice -> texto).
    var GP = [];
    function esc(t) { var d = document.createElement('div'); d.textContent = t; return d.innerHTML; }
    function pushPrompt(text) { GP.push(text); return GP.length - 1; }

    // ----- Renderizadores de bloque -----
    function copyBtn(text, label) {
        var i = pushPrompt(text);
        return '<button class="gd-copy" type="button" data-gp="' + i + '">' + (label || 'Copiar') + '</button>';
    }
    function cardHtml(it) {
        return '<div class="gd-card">' +
            '<div class="gd-card-ic">' + it.icon + '</div>' +
            '<div class="gd-card-tt">' + esc(it.title) + '</div>' +
            '<div class="gd-card-bd">' + it.body + '</div>' +
            (it.sub ? '<div class="gd-card-sub">' + it.sub + '</div>' : '') +
            (it.prompt ? '<div class="gd-card-prompt">' + esc(it.prompt) + '</div>' + copyBtn(it.prompt, 'Copiar prompt') : '') +
            '</div>';
    }
    function tableHtml(b) {
        return '<div class="gd-table-wrap"><table class="gd-table"><thead><tr>' +
            b.headers.map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') +
            '</tr></thead><tbody>' +
            b.rows.map(function (r) {
                return '<tr>' + r.map(function (c, i) {
                    if (i === 1) return '<td><span class="gd-pill ' + (/PowerPoint/.test(c) ? 'pill-ppt' : 'pill-art') + '">' + esc(c) + '</span></td>';
                    return '<td>' + esc(c) + '</td>';
                }).join('') + '</tr>';
            }).join('') +
            '</tbody></table></div>';
    }
    function compareHtml(b) {
        return '<div class="gd-compare">' +
            '<div class="gd-cmp gd-cmp-bad"><span class="gd-cmp-l">' + esc(b.left.label) + '</span><p>' + esc(b.left.text) + '</p></div>' +
            '<div class="gd-cmp-arrow" aria-hidden="true">&#8594;</div>' +
            '<div class="gd-cmp gd-cmp-good"><span class="gd-cmp-l">' + esc(b.right.label) + '</span><p>' + esc(b.right.text) + '</p>' + copyBtn(b.right.text, 'Copiar') + '</div>' +
            '</div>';
    }
    function promptsHtml(b) {
        return '<div class="gd-prompts">' + b.items.map(function (it) {
            return '<div class="gd-prompt-row">' +
                '<div class="gd-prompt-main"><span class="gd-prompt-l">' + esc(it.label) + '</span><span class="gd-prompt-t">' + esc(it.text) + '</span></div>' +
                copyBtn(it.text, 'Copiar') + '</div>';
        }).join('') + '</div>';
    }
    function stepsHtml(b) {
        return '<div class="gd-flow">' +
            '<div class="gd-flow-tt">' + esc(b.title) + '</div>' +
            '<div class="gd-steps">' + b.steps.map(function (s, i) {
                return '<div class="gd-step"><span class="gd-step-n">' + (i + 1) + '</span><span>' + esc(s) + '</span></div>';
            }).join('') + '</div>' +
            (b.prompt ? '<div class="gd-flow-prompt">' + esc(b.prompt) + '</div>' + copyBtn(b.prompt, 'Copiar prompt') : '') +
            '</div>';
    }
    function calloutHtml(b) {
        return '<div class="gd-callout gd-' + (b.tone || 'info') + '">' +
            (b.title ? '<strong>' + esc(b.title) + ':</strong> ' : '') + b.text + '</div>';
    }
    function blockHtml(b) {
        switch (b.type) {
            case 'intro': return '<p class="gd-intro">' + b.text + '</p>';
            case 'lead': return '<div class="gd-lead">' + esc(b.text) + '</div>';
            case 'cards': return '<div class="gd-cards">' + b.items.map(cardHtml).join('') + '</div>';
            case 'table': return tableHtml(b);
            case 'compare': return compareHtml(b);
            case 'prompts': return promptsHtml(b);
            case 'steps': return stepsHtml(b);
            case 'callout': return calloutHtml(b);
            default: return '';
        }
    }

    // ----- Menú (maestro) -----
    function renderMenu() {
        var menu = document.getElementById('guides-menu');
        if (!menu) return;
        menu.innerHTML = GUIDES.map(function (g) {
            return '<button class="guide-card" type="button" data-guide="' + g.id + '">' +
                '<span class="guide-ic">' + g.icon + '</span>' +
                '<span class="guide-tag">' + esc(g.tag) + '</span>' +
                '<span class="guide-tt">' + esc(g.title) + '</span>' +
                '<span class="guide-desc">' + esc(g.desc) + '</span>' +
                '</button>';
        }).join('');
        menu.querySelectorAll('.guide-card').forEach(function (b) {
            b.addEventListener('click', function () { openGuide(b.dataset.guide); });
        });
    }

    // ----- Detalle -----
    function openGuide(id) {
        var g = GUIDES.find(function (x) { return x.id === id; });
        if (!g) return;
        GP = [];
        var detail = document.getElementById('guides-detail');
        var menu = document.getElementById('guides-menu');
        detail.innerHTML =
            '<button class="guide-back" type="button" id="guide-back">&#8592; Todas las guías</button>' +
            '<div class="gd-head"><span class="gd-head-ic">' + g.icon + '</span><h3>' + esc(g.title) + '</h3></div>' +
            g.blocks.map(blockHtml).join('');
        menu.hidden = true;
        detail.hidden = false;
        document.getElementById('guide-back').addEventListener('click', closeGuide);
        // copia (delegación)
        detail.querySelectorAll('.gd-copy').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var txt = GP[parseInt(btn.dataset.gp)];
                if (typeof window.copyText === 'function') window.copyText(txt, btn);
                else if (navigator.clipboard) navigator.clipboard.writeText(txt);
            });
        });
        // lleva directamente al contenido de la guía (no al selector), dejando
        // hueco para la navbar fija.
        requestAnimationFrame(function () {
            var top = detail.getBoundingClientRect().top + window.pageYOffset - 76;
            window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        });
    }
    function closeGuide() {
        document.getElementById('guides-detail').hidden = true;
        document.getElementById('guides-menu').hidden = false;
        var sec = document.getElementById('avanzado');
        if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function init() { renderMenu(); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
