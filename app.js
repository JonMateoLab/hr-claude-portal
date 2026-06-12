// ===== CATEGORY GROUPS FOR FILTERS =====
const CATEGORY_GROUPS = {
    'all': 'Todos',
    'Workforce Planning': 'Workforce',
    'Talent Acquisition': 'Talent Acquisition',
    'Staffing y Capacity': 'Staffing',
    'Skills & Capabilities': 'Skills',
    'Learning & Development': 'Learning',
    'Performance & Career': 'Performance',
    'Talent Review & Succession': 'Talent Review',
    'Engagement & Retention': 'Engagement',
    'Onboarding & Employee Experience': 'Onboarding',
    'Internal Mobility': 'Movilidad',
    'HRBP Advisory': 'HRBP Advisory',
    'Org Design & Change': 'Org Design',
    'People Analytics': 'Analytics',
    'Communications': 'Comunicacion',
    'DEI & Wellbeing': 'DEI & Wellbeing',
    'Employee Relations & Policies': 'Employee Relations',
    'Program Management': 'Program Mgmt',
    'Automatización y Claude Code': 'Claude Code',
    'Brainstorming e Ideación': 'Brainstorming',
    'Coaching': 'Coaching',
    'Conversaciones Difíciles': 'Conv. Dificiles',
    'Resolución de Problemas': 'Problemas',
    'Resumir Reuniones (Teams)': 'Reuniones',
    'Speaker Notes': 'Speaker Notes',
    'Presentaciones': 'Presentaciones'
};

// ===== FAVORITES =====
const FAV_KEY = 'hrFavPrompts';
let currentFilter = 'all';
let currentSort = 'cat';
let currentView = 'detailed';

function getFavs() {
    try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; }
    catch (e) { return []; }
}
function isFav(id) { return getFavs().includes(id); }
function toggleFav(id) {
    const favs = getFavs();
    const i = favs.indexOf(id);
    if (i >= 0) favs.splice(i, 1); else favs.push(id);
    localStorage.setItem(FAV_KEY, JSON.stringify(favs));
    updateFavCount();
    if (currentFilter === '__fav__') renderPrompts('__fav__');
}
function updateFavCount() {
    const el = document.getElementById('fav-count');
    if (el) el.textContent = `(${getFavs().length})`;
}

// ===== RENDER FILTERS =====
function renderFilters() {
    const bar = document.getElementById('filter-bar');
    const cats = ['all', ...new Set(PROMPTS.map(p => p.cat))];

    const favBtn = `<button class="filter-btn filter-fav" data-filter="__fav__">&#9733; Favoritos <span class="fav-count" id="fav-count">(${getFavs().length})</span></button>`;

    bar.innerHTML = favBtn + cats.map(cat => {
        const label = CATEGORY_GROUPS[cat] || cat;
        return `<button class="filter-btn${cat === 'all' ? ' active' : ''}" data-filter="${cat}">${label}</button>`;
    }).join('');

    bar.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderPrompts(btn.dataset.filter);
        });
    });
}

// ===== RENDER PROMPTS =====
function levelSlug(lvl) {
    return (lvl || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function renderPrompts(filter = currentFilter) {
    currentFilter = filter;
    const grid = document.getElementById('prompts-grid');
    grid.classList.toggle('view-compact', currentView === 'compact');

    let filtered;
    if (filter === '__fav__') filtered = PROMPTS.filter(p => isFav(p.id));
    else if (filter === 'all') filtered = PROMPTS.slice();
    else filtered = PROMPTS.filter(p => p.cat === filter);

    const lvlOrder = { 'basico': 1, 'intermedio': 2, 'avanzado': 3 };
    if (currentSort === 'title') {
        filtered.sort((a, b) => a.title.localeCompare(b.title, 'es'));
    } else if (currentSort === 'level') {
        filtered.sort((a, b) => (lvlOrder[levelSlug(a.level)] || 2) - (lvlOrder[levelSlug(b.level)] || 2) || a.title.localeCompare(b.title, 'es'));
    } else {
        filtered.sort((a, b) => a.cat.localeCompare(b.cat, 'es') || a.title.localeCompare(b.title, 'es'));
    }

    if (filter === '__fav__' && filtered.length === 0) {
        grid.innerHTML = `<div class="prompts-empty"><span class="prompts-empty-icon">&#9734;</span><p>A&uacute;n no has marcado prompts como favoritos.<br>Pulsa la <strong>&#9733;</strong> en cualquier prompt para guardarlo aqu&iacute; y tenerlo siempre a mano.</p></div>`;
        return;
    }

    grid.innerHTML = filtered.map(p => {
        const lvl = p.level ? `<span class="prompt-level lvl-${levelSlug(p.level)}">${p.level}</span>` : '';
        return `
        <div class="prompt-card" data-category="${p.cat}" data-prompt-id="${p.id}">
            <div class="prompt-card-header">
                <span class="prompt-category">${p.cat}</span>
                <button class="fav-btn${isFav(p.id) ? ' fav-on' : ''}" onclick="toggleFav('${p.id}'); this.classList.toggle('fav-on')" title="Marcar como favorito" aria-label="Marcar como favorito">&#9733;</button>
            </div>
            <div class="prompt-card-body">
                <h3>${p.title}</h3>
                <p class="prompt-desc">${p.desc}</p>
                ${lvl}
                <div class="prompt-text">${escapeHtml(p.text)}</div>
            </div>
            <div class="prompt-card-actions">
                <button class="btn btn-sm btn-secondary btn-expand" onclick="toggleExpand(this)">Ver completo</button>
                <button class="btn btn-sm btn-copy" onclick="copyPromptText('${p.id}', this)">Copiar</button>
            </div>
        </div>`;
    }).join('');
}

// ===== RENDER EXERCISES =====
function renderExercises() {
    const grid = document.getElementById('exercises-grid');

    grid.innerHTML = EXERCISES.map(e => `
        <div class="exercise-card" onclick="openExercise(${e.id})">
            <div class="exercise-icon">${e.icon}</div>
            <h3>${e.title}</h3>
            <p>${e.desc}</p>
            <div class="exercise-meta">
                <span class="difficulty difficulty-${e.difficulty}">
                    ${e.difficulty === 'easy' ? 'Facil' : e.difficulty === 'medium' ? 'Intermedio' : 'Avanzado'}
                </span>
                <span>&#9201; ${e.time}</span>
                <span>${e.steps.length} pasos</span>
            </div>
        </div>
    `).join('');
}

// ===== COPY =====
function flashCopied(btn) {
    if (!btn) return;
    if (btn._copyT) clearTimeout(btn._copyT);
    var original = btn.dataset.label || btn.textContent;
    btn.dataset.label = original;
    btn.classList.add('copied');
    btn.innerHTML = '&#10003; Copiado';
    btn._copyT = setTimeout(function () {
        btn.classList.remove('copied');
        btn.textContent = btn.dataset.label;
    }, 1600);
}

function copyPromptText(id, btn) {
    const prompt = PROMPTS.find(p => p.id === id);
    if (prompt) {
        navigator.clipboard.writeText(prompt.text).then(() => { showToast(); flashCopied(btn); });
    }
}

function copyText(text, btn) {
    navigator.clipboard.writeText(text).then(() => { showToast(); flashCopied(btn); });
}

// ===== TOGGLE EXPAND =====
function toggleExpand(btn) {
    const promptText = btn.closest('.prompt-card').querySelector('.prompt-text');
    const isExpanded = promptText.style.maxHeight === 'none';
    promptText.style.maxHeight = isExpanded ? '110px' : 'none';
    promptText.style.overflow = isExpanded ? 'hidden' : 'visible';
    btn.textContent = isExpanded ? 'Ver completo' : 'Ver menos';
}

// ===== OPEN EXERCISE =====
function openExercise(id) {
    const exercise = EXERCISES.find(e => e.id === id);
    if (!exercise) return;

    const modal = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content');

    content.innerHTML = `
        <h2>${exercise.icon} ${exercise.title}</h2>
        <p class="exercise-subtitle">${exercise.desc} &mdash; <strong>${exercise.time}</strong></p>
        ${exercise.steps.map((step, i) => `
            <div class="step" data-step="${i + 1}">
                <h3>${step.title}</h3>
                <p>${step.text}</p>
                ${step.code ? `
                    <div class="code-block">
                        <button class="copy-code" onclick="copyText(\`${escapeTemplate(step.code)}\`, this)">Copiar</button>
                        ${escapeHtml(step.code)}
                    </div>
                ` : ''}
                ${step.tip ? `<div class="tip-box"><strong>Tip:</strong> ${step.tip}</div>` : ''}
            </div>
        `).join('')}
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ===== CLOSE MODAL =====
document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
    if (!document.querySelector('.modal-chapter')) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); navigateChapter(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); navigateChapter(-1); }
});

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');
    const m = document.querySelector('.modal');
    if (m) m.classList.remove('modal-chapter', 'modal-fullscreen');
    document.body.style.overflow = '';
}

// Modo presentación: expande el visor de capítulo a pantalla completa.
function toggleChapterFullscreen() {
    const m = document.querySelector('.modal');
    if (!m) return;
    const on = m.classList.toggle('modal-fullscreen');
    const btn = document.getElementById('cv-fs-btn');
    if (btn) {
        btn.classList.toggle('active', on);
        btn.title = on ? 'Salir del modo presentación' : 'Modo presentación';
    }
}

// ===== GENERATOR =====
document.getElementById('generate-btn').addEventListener('click', generatePrompt);

function generatePrompt() {
    const task = document.getElementById('gen-task').value;
    const context = document.getElementById('gen-context').value;
    const format = document.getElementById('gen-format').value;
    const tone = document.querySelector('input[name="tone"]:checked').value;
    const rol = (document.getElementById('gen-rol') || {}).value || '';
    const audience = (document.getElementById('gen-audience') || {}).value || '';
    const detail = (document.getElementById('gen-detail') || {}).value || '';
    const constraints = (document.getElementById('gen-constraints') || {}).value || '';

    if (!task) { alert('Selecciona una tarea primero'); return; }

    const templates = {
        briefing: {
            base: `Eres un HRBP senior de Software & Platform Engineering en Accenture.`,
            task: `Prepara un briefing ejecutivo para el liderazgo de la practice`,
            details: `Incluye:\n1. Headline del periodo (1 frase)\n2. 3-4 metricas clave con tendencia\n3. Punto de atencion principal con contexto\n4. Proximos pasos / decisiones requeridas\n5. Formato one-pager, maximo 300 palabras`
        },
        analizar: {
            base: `Eres un analista de People Analytics especializado en metricas de HR para consultoras tecnologicas.`,
            task: `Analiza los siguientes datos de HR / workforce`,
            details: `Proporciona:\n1. Resumen ejecutivo con el insight mas relevante\n2. Metricas clave desglosadas por capability/nivel\n3. Patrones y anomalias identificadas\n4. Hipotesis sobre causas raiz\n5. Recomendaciones concretas priorizadas por impacto`
        },
        'talent-review': {
            base: `Eres un HRBP experto en calibracion de talento en una consultora tecnologica.`,
            task: `Ayudame a preparar un Talent Review / sesion de calibracion`,
            details: `Incluye:\n1. Distribucion del 9-box con la poblacion proporcionada\n2. Narrativas de calibracion por persona (2-3 frases, basadas en hechos)\n3. Recomendaciones de accion (promocion, PIP, movilidad, aceleracion)\n4. Preguntas dificiles que puede hacer el liderazgo y respuestas preparadas`
        },
        comunicar: {
            base: `Eres un experto en comunicacion interna corporativa de HR en Accenture.`,
            task: `Redacta una comunicacion interna para el equipo de S&PE`,
            details: `La comunicacion debe:\n1. Tener un asunto claro y directo\n2. Explicar el contexto y el por que\n3. Detallar el impacto concreto\n4. Incluir proximos pasos\n5. Anticipar 3-4 preguntas frecuentes`
        },
        conversacion: {
            base: `Eres un HRBP senior con experiencia en gestionar conversaciones dificiles en entornos de consultoria tecnologica.`,
            task: `Ayudame a preparar una conversacion dificil`,
            details: `Proporciona:\n1. Los 3 mensajes clave que debo transmitir\n2. Script por fases (apertura, hechos, escucha, propuesta, cierre)\n3. Frases literales que pueda adaptar\n4. Anticipacion de reacciones con respuestas preparadas\n5. Email de seguimiento post-conversacion`
        },
        presentacion: {
            base: `Eres un disenador de presentaciones profesionales para HR en Accenture.`,
            task: `Genera un archivo HTML completo como presentacion`,
            details: `Requisitos:\n- HTML + CSS + JS en un solo archivo autocontenido\n- Navegacion con flechas del teclado\n- Transiciones suaves entre slides\n- Paleta Accenture (#A100FF purpura, negro, blanco)\n- Barra de progreso\n- Compatible con exportacion a PDF via Chrome`
        },
        engagement: {
            base: `Eres un consultor de engagement organizacional especializado en equipos tecnologicos distribuidos.`,
            task: `Disena un plan de engagement / retention`,
            details: `Incluye:\n1. Diagnostico basado en los datos proporcionados\n2. Identificacion del segmento mas en riesgo\n3. 4-5 iniciativas priorizadas por impacto y viabilidad\n4. Para cada iniciativa: responsable, timeline, KPI\n5. Comunicacion de resultados al equipo`
        },
        politica: {
            base: `Eres un HRBP experto en explicar politicas y procedimientos internos de forma clara y accesible para cualquier empleado.`,
            task: `Ayudame a resolver una duda de un empleado sobre una politica o procedimiento`,
            details: `Te pegare el texto de la politica o procedimiento relevante y la duda concreta. Necesito que:\n1. Respondas a la duda en lenguaje sencillo, sin jerga\n2. Cites la parte de la politica en la que te basas\n3. Senales claramente si hay algo ambiguo o que dependa del caso concreto\n4. Indiques cuando conviene escalar a HR Legal o Employee Relations en lugar de responder directamente\n5. No inventes nada que no este en el texto de la politica que te doy`
        }
    };

    const toneMap = {
        ejecutivo: 'Tono ejecutivo y orientado a negocio. Directo, con datos, sin jerga innecesaria de RRHH.',
        cercano: 'Tono cercano y accesible. Profesional pero calido y humano.',
        directo: 'Tono directo y conciso. Ve al grano, sin rodeos ni florituras.'
    };

    const formatMap = {
        texto: 'Formato: texto bien estructurado con titulos y parrafos.',
        tabla: 'Formato: organiza la informacion en tablas claras.',
        html: 'Formato: genera un archivo HTML completo con CSS, profesional y listo para abrir en navegador.',
        email: 'Formato: email profesional con asunto, saludo, cuerpo y firma.',
        'one-pager': 'Formato: one-pager ejecutivo para slide de PowerPoint (headline, metricas, punto de atencion, proximos pasos).'
    };

    const t = templates[task];
    const detailMap = {
        equilibrado: '',
        resumen: 'Nivel de detalle: resumen ejecutivo. Ve a lo esencial, sin relleno.',
        exhaustivo: 'Nivel de detalle: exhaustivo. Incluye matices, casos limite y supuestos.'
    };
    let prompt = `${rol || t.base}\n\n${t.task}.\n\n${t.details}`;
    if (context) prompt += `\n\nContexto adicional: ${context}`;
    if (audience) prompt += `\n\nAudiencia: ${audience}.`;
    prompt += `\n\n${toneMap[tone]}`;
    prompt += `\n\n${formatMap[format]}`;
    if (detail && detailMap[detail]) prompt += `\n\n${detailMap[detail]}`;
    if (constraints) prompt += `\n\nRestricciones: ${constraints}`;
    prompt += `\n\nAntes de responder, declara tus supuestos y limitaciones. Si te falta informacion clave para hacerlo bien, preguntamela en vez de inventarla.`;

    const output = document.getElementById('generator-output');
    output.innerHTML = `
        <div class="output-result">
            <h3>Tu prompt generado</h3>
            <div class="output-prompt">${escapeHtml(prompt)}</div>
            <div class="output-actions">
                <button class="btn btn-sm btn-copy" onclick="copyText(\`${escapeTemplate(prompt)}\`)">Copiar prompt</button>
                <button class="btn btn-sm btn-secondary" onclick="resetGenerator()">Limpiar</button>
            </div>
        </div>
    `;
}

function resetGenerator() {
    document.getElementById('generator-output').innerHTML = '<div class="output-placeholder"><span class="placeholder-icon">&#10024;</span><p>Tu prompt aparecera aqui.</p></div>';
}

// ===== COMPARADOR ANTES / DESPUÉS =====
// Mismo objetivo, prompt básico vs prompt experto. Selector por caso.
var COMPARISONS = [
    { topic: 'Presentación', basic: 'Hazme una presentación sobre este tema.', expert: 'Crea una presentación ejecutiva de 10 slides para leadership con narrativa de consultoría, un mensaje principal por slide, datos convertidos en insights, diseño limpio, slide de decisión, matriz de riesgos, roadmap, speaker notes y preguntas difíciles.' },
    { topic: 'Excel', basic: 'Analiza este Excel.', expert: 'Analiza este Excel como un experto en People Analytics: tendencias, outliers, riesgos, hipótesis de causa raíz e insights accionables priorizados por impacto. Declara tus supuestos antes de concluir.' },
    { topic: 'PDF', basic: 'Resume este PDF.', expert: 'Analiza este PDF como un consultor senior: resumen ejecutivo, puntos críticos, riesgos, decisiones necesarias y próximos pasos. Señala lo que quede ambiguo o sin soporte.' },
    { topic: 'Dashboard', basic: 'Hazme un dashboard con estos datos.', expert: 'Crea un dashboard interactivo con KPIs, filtros por unidad y nivel, gráficos, alertas para valores fuera de rango, un insight automático bajo cada gráfico y un resumen ejecutivo.' },
    { topic: 'Email', basic: 'Escribe un email sobre esto.', expert: 'Convierte este análisis en un email ejecutivo: asunto claro, contexto breve, conclusión, decisión recomendada y acciones con responsable. Máximo 150 palabras, tono cercano y profesional.' },
    { topic: 'Comunicación sensible', basic: 'Escribe el comunicado del cambio.', expert: 'Redacta este comunicado sensible y hazlo defendible ante Legal, Compliance y HR: tono humano y no defensivo, qué cambia, a quién afecta y por qué, más un FAQ que anticipe las dudas de empleados y managers.' },
    { topic: 'Artifact', basic: 'Hazme una herramienta para esto.', expert: 'Crea un Artifact interactivo: define inputs, validaciones, cálculo automático, visualización de resultados, un resumen copiable y escenarios conservador/base/ambicioso.' },
    { topic: 'Web', basic: 'Mejora esta web.', expert: 'Mejora esta web manteniendo su estructura: hero más claro, navegación sticky, tarjetas con hover, buscador y filtros combinables, botones de copiar, modo claro/oscuro y diseño responsive y accesible.' },
    { topic: 'Talent review', basic: 'Ayúdame con el talent review.', expert: 'Prepara la calibración: distribución 9-box de esta población, narrativa por persona basada en hechos (2-3 frases), acciones recomendadas (promoción, PIP, movilidad) y preguntas difíciles del comité con respuestas.' },
    { topic: 'Análisis de riesgos', basic: '¿Qué riesgos ves?', expert: 'Analiza los riesgos de esta decisión con matriz de impacto y probabilidad. Incluye riesgos reputacionales (empleados, managers, Legal, compliance), mitigaciones con owner y timing, y supuestos a validar.' }
];

function renderComparador() {
    var chips = document.getElementById('cmp-chips');
    var view = document.getElementById('cmp-view');
    if (!chips || !view) return;

    function show(i) {
        var c = COMPARISONS[i];
        view.innerHTML =
            '<div class="gd-compare">' +
            '<div class="gd-cmp gd-cmp-bad"><span class="gd-cmp-l">Prompt básico</span><p>' + escapeHtml(c.basic) + '</p></div>' +
            '<div class="gd-cmp-arrow" aria-hidden="true">&#8594;</div>' +
            '<div class="gd-cmp gd-cmp-good"><span class="gd-cmp-l">Prompt experto</span><p>' + escapeHtml(c.expert) + '</p>' +
            '<button class="gd-copy" type="button" id="cmp-copy">Copiar prompt</button></div>' +
            '</div>';
        var btn = document.getElementById('cmp-copy');
        if (btn) btn.addEventListener('click', function () { copyText(c.expert, btn); });
        chips.querySelectorAll('.cmp-chip').forEach(function (b) { b.classList.toggle('active', parseInt(b.dataset.i) === i); });
    }

    chips.innerHTML = COMPARISONS.map(function (c, i) {
        return '<button class="cmp-chip' + (i === 0 ? ' active' : '') + '" type="button" data-i="' + i + '">' + escapeHtml(c.topic) + '</button>';
    }).join('');
    chips.querySelectorAll('.cmp-chip').forEach(function (b) {
        b.addEventListener('click', function () { show(parseInt(b.dataset.i)); });
    });
    show(0);
}

// ===== NAVIGATION =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// ===== ÁREAS SELECCIONABLES (Formación / Prompting / Avanzado) =====
// El portal ya no es un scroll infinito: las secciones se reparten en 3 grupos
// y solo se muestra uno cada vez. Los contenedores #group-* existen vacíos en el
// HTML y aquí movemos cada sección a su grupo.
var VIEW_GROUPS = {
    formacion: ['itinerario', 'ejercicios', 'tips'],
    prompting: ['generador', 'prompts'],
    avanzado: ['avanzado']
};
var SECTION_VIEW = {};
Object.keys(VIEW_GROUPS).forEach(function (v) {
    VIEW_GROUPS[v].forEach(function (id) { SECTION_VIEW[id] = v; });
});

function setupViews() {
    // Reparte las secciones en sus grupos (en el orden definido arriba).
    Object.keys(VIEW_GROUPS).forEach(function (view) {
        var g = document.getElementById('group-' + view);
        if (!g) return;
        VIEW_GROUPS[view].forEach(function (id) {
            var s = document.getElementById(id);
            if (s) g.appendChild(s);
        });
    });

    // Vista inicial: hash de la URL > preferencia guardada > Formación.
    var initial = 'formacion';
    var hashId = (location.hash || '').replace('#', '');
    if (hashId && SECTION_VIEW[hashId]) initial = SECTION_VIEW[hashId];
    else { try { var saved = localStorage.getItem('hrView'); if (saved && VIEW_GROUPS[saved]) initial = saved; } catch (e) {} }

    // Selector grande + enlaces de nav con data-view.
    document.querySelectorAll('.vsw-btn, .nav-link[data-view]').forEach(function (b) {
        b.addEventListener('click', function () { setView(b.dataset.view); });
    });

    // Enlaces internos (#seccion): cambian de área y luego desplazan al destino.
    document.addEventListener('click', function (e) {
        var a = e.target.closest('a[href^="#"]');
        if (!a) return;
        var id = a.getAttribute('href').slice(1);
        if (!id || id === 'inicio') return;                 // Inicio: scroll normal al hero
        var view = SECTION_VIEW[id];
        if (!view) return;
        e.preventDefault();
        setView(view, { noScroll: true });
        var t = document.getElementById(id);
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    setView(initial, { noScroll: true, instant: true });
    document.body.classList.remove('view-pending');
}

function setView(view, opts) {
    opts = opts || {};
    if (!VIEW_GROUPS[view]) view = 'formacion';
    Object.keys(VIEW_GROUPS).forEach(function (v) {
        var g = document.getElementById('group-' + v);
        if (g) g.hidden = (v !== view);
    });
    document.querySelectorAll('.vsw-btn').forEach(function (b) {
        var on = b.dataset.view === view;
        b.classList.toggle('active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    document.querySelectorAll('.nav-link').forEach(function (l) {
        l.classList.toggle('active', l.dataset.view === view);
    });
    try { localStorage.setItem('hrView', view); } catch (e) {}

    // El grupo recién mostrado necesita re-medir layout (cohete del itinerario,
    // campo de partículas que estaba a 0px mientras estaba oculto).
    if (typeof updateJourneyRocket === 'function') updateJourneyRocket();
    if (view === 'formacion') window.dispatchEvent(new Event('resize'));

    if (!opts.noScroll) {
        var sw = document.getElementById('view-switch');
        if (sw) {
            var y = sw.getBoundingClientRect().top + window.pageYOffset - 66;
            window.scrollTo({ top: Math.max(0, y), behavior: opts.instant ? 'auto' : 'smooth' });
        }
    }
}
window.setView = setView;

// ===== TOAST =====
function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

// ===== HELPERS =====
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function escapeTemplate(text) {
    return text.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
}

// ===== 3D CHAPTER ICONS (SVG) =====
function chapterIcon3D(id) {
    const icons = {
        1: `<svg viewBox="0 0 48 48" class="ch-icon-svg"><defs><linearGradient id="ci1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#C966FF"/><stop offset="100%" stop-color="#A100FF"/></linearGradient><filter id="cs1"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#A100FF" flood-opacity=".35"/></filter></defs>
            <rect x="8" y="10" width="32" height="28" rx="8" fill="url(#ci1)" filter="url(#cs1)"/>
            <rect x="12" y="14" width="24" height="20" rx="5" fill="#fff" opacity=".2"/>
            <circle cx="24" cy="22" r="5" fill="#fff" opacity=".9"/><path d="M18 30 Q24 36 30 30" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/>
            <circle cx="24" cy="6" r="3" fill="#5df5a0"><animate attributeName="opacity" values="1;.4;1" dur="2s" repeatCount="indefinite"/></circle><line x1="24" y1="9" x2="24" y2="12" stroke="#A100FF" stroke-width="2"/></svg>`,
        2: `<svg viewBox="0 0 48 48" class="ch-icon-svg"><defs><linearGradient id="ci2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6E54E6"/><stop offset="100%" stop-color="#A100FF"/></linearGradient><filter id="cs2"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#6E54E6" flood-opacity=".35"/></filter></defs>
            <rect x="10" y="16" width="28" height="24" rx="5" fill="url(#ci2)" filter="url(#cs2)"/>
            <path d="M14 18 L24 8 L34 18" fill="#6E54E6"/><rect x="22" y="6" width="4" height="3" rx="1.5" fill="#5a42c0"/>
            <line x1="16" y1="26" x2="32" y2="26" stroke="#fff" stroke-width="2" opacity=".7" stroke-linecap="round"/>
            <line x1="16" y1="31" x2="28" y2="31" stroke="#fff" stroke-width="2" opacity=".5" stroke-linecap="round"/>
            <circle cx="38" cy="12" r="2.5" fill="#5df5a0"><animate attributeName="opacity" values="1;.3;1" dur="1.8s" repeatCount="indefinite"/></circle></svg>`,
        3: `<svg viewBox="0 0 48 48" class="ch-icon-svg"><defs><linearGradient id="ci3" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stop-color="#5db4f5"/><stop offset="100%" stop-color="#A100FF"/></linearGradient><filter id="cs3"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#5db4f5" flood-opacity=".35"/></filter></defs>
            <rect x="6" y="12" width="36" height="28" rx="6" fill="url(#ci3)" filter="url(#cs3)"/>
            <rect x="10" y="30" width="6" height="6" rx="1.5" fill="#fff" opacity=".8"/><rect x="18" y="24" width="6" height="12" rx="1.5" fill="#fff" opacity=".7"/>
            <rect x="26" y="18" width="6" height="18" rx="1.5" fill="#fff" opacity=".9"/><rect x="34" y="22" width="6" height="14" rx="1.5" fill="#fff" opacity=".6"/>
            <polyline points="12,28 20,22 28,16 36,20" fill="none" stroke="#5df5a0" stroke-width="2" stroke-linecap="round"/></svg>`,
        4: `<svg viewBox="0 0 48 48" class="ch-icon-svg"><defs><linearGradient id="ci4" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#C966FF"/><stop offset="100%" stop-color="#B83BD6"/></linearGradient><filter id="cs4"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#B83BD6" flood-opacity=".35"/></filter></defs>
            <rect x="8" y="8" width="32" height="36" rx="4" fill="url(#ci4)" filter="url(#cs4)"/>
            <rect x="12" y="12" width="24" height="4" rx="2" fill="#fff" opacity=".3"/>
            <line x1="12" y1="22" x2="36" y2="22" stroke="#fff" stroke-width="1.5" opacity=".5"/>
            <line x1="12" y1="28" x2="32" y2="28" stroke="#fff" stroke-width="1.5" opacity=".4"/>
            <line x1="12" y1="34" x2="28" y2="34" stroke="#fff" stroke-width="1.5" opacity=".3"/>
            <path d="M30 36 L36 42 L44 32" stroke="#5df5a0" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`,
        5: `<svg viewBox="0 0 48 48" class="ch-icon-svg"><defs><linearGradient id="ci5" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#A100FF"/><stop offset="100%" stop-color="#6E54E6"/></linearGradient><filter id="cs5"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#A100FF" flood-opacity=".35"/></filter></defs>
            <circle cx="24" cy="24" r="18" fill="url(#ci5)" filter="url(#cs5)"/>
            <circle cx="24" cy="24" r="13" fill="none" stroke="#fff" stroke-width="1.5" opacity=".3"/>
            <circle cx="24" cy="16" r="5" fill="#fff" opacity=".85"/>
            <path d="M16 30 Q24 38 32 30" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>
            <circle cx="38" cy="10" r="3" fill="#5df5a0"><animate attributeName="r" values="3;1.5;3" dur="2s" repeatCount="indefinite"/></circle></svg>`,
        6: `<svg viewBox="0 0 48 48" class="ch-icon-svg"><defs><linearGradient id="ci6" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#C966FF"/><stop offset="100%" stop-color="#A100FF"/></linearGradient><filter id="cs6"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#A100FF" flood-opacity=".35"/></filter></defs>
            <g filter="url(#cs6)">
                <circle cx="33" cy="17" r="5.5" fill="#6E54E6"/>
                <path d="M24 41 Q33 28 42 41 Z" fill="#6E54E6"/>
                <circle cx="18" cy="18" r="7" fill="url(#ci6)"/>
                <path d="M6 43 Q18 27 30 43 Z" fill="url(#ci6)"/>
            </g>
            <circle cx="40" cy="9" r="2.5" fill="#5df5a0"><animate attributeName="opacity" values="1;.4;1" dur="2s" repeatCount="indefinite"/></circle></svg>`,
        7: `<svg viewBox="0 0 48 48" class="ch-icon-svg"><defs><linearGradient id="ci7" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1a1228"/><stop offset="100%" stop-color="#2a1848"/></linearGradient><filter id="cs7"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#A100FF" flood-opacity=".4"/></filter></defs>
            <rect x="6" y="10" width="36" height="28" rx="6" fill="url(#ci7)" filter="url(#cs7)" stroke="#A100FF" stroke-width="1.5"/>
            <circle cx="11" cy="15" r="2" fill="#ff5f57"/><circle cx="17" cy="15" r="2" fill="#febc2e"/><circle cx="23" cy="15" r="2" fill="#28c840"/>
            <text x="10" y="28" font-size="7" fill="#5df5a0" font-family="monospace">&gt;_ run</text>
            <rect x="10" y="32" width="14" height="2" rx="1" fill="#A100FF" opacity=".5"><animate attributeName="width" values="14;20;14" dur="2s" repeatCount="indefinite"/></rect></svg>`,
        8: `<svg viewBox="0 0 48 48" class="ch-icon-svg"><defs><linearGradient id="ci8" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#ffb400"/><stop offset="100%" stop-color="#ff8a00"/></linearGradient><filter id="cs8"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#ffb400" flood-opacity=".35"/></filter></defs>
            <path d="M24 4 L30 14 L42 18 L42 30 L24 44 L6 30 L6 18 L18 14 Z" fill="url(#ci8)" filter="url(#cs8)"/>
            <path d="M24 10 L28 17 L37 20 L37 28 L24 38 L11 28 L11 20 L20 17 Z" fill="#fff" opacity=".15"/>
            <path d="M20 22 L24 28 L34 16" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`,
        9: `<svg viewBox="0 0 48 48" class="ch-icon-svg"><defs><linearGradient id="ci9" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#A100FF"/><stop offset="100%" stop-color="#5df5a0"/></linearGradient><filter id="cs9"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#5df5a0" flood-opacity=".35"/></filter></defs>
            <path d="M24 6 L28 18 L20 18 Z" fill="url(#ci9)"/>
            <path d="M24 18 L34 42 L14 42 Z" fill="url(#ci9)" filter="url(#cs9)"/>
            <path d="M24 24 L30 40 L18 40 Z" fill="#fff" opacity=".15"/>
            <circle cx="24" cy="8" r="3" fill="#5df5a0"><animate attributeName="opacity" values="1;.3;1" dur="1.5s" repeatCount="indefinite"/></circle>
            <circle cx="12" cy="16" r="2" fill="#C966FF" opacity=".6"><animate attributeName="opacity" values=".6;.2;.6" dur="2s" repeatCount="indefinite"/></circle>
            <circle cx="38" cy="20" r="2" fill="#ffb400" opacity=".5"><animate attributeName="opacity" values=".5;.2;.5" dur="1.8s" repeatCount="indefinite"/></circle></svg>`,
        10: `<svg viewBox="0 0 48 48" class="ch-icon-svg"><defs><linearGradient id="ci10" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#5db4f5"/><stop offset="100%" stop-color="#A100FF"/></linearGradient><filter id="cs10"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#5db4f5" flood-opacity=".35"/></filter></defs>
            <rect x="10" y="14" width="28" height="26" rx="5" fill="url(#ci10)" filter="url(#cs10)"/>
            <rect x="16" y="8" width="16" height="8" rx="3" fill="#6E54E6"/>
            <rect x="14" y="20" width="8" height="3" rx="1.5" fill="#fff" opacity=".6"/><rect x="14" y="26" width="8" height="3" rx="1.5" fill="#fff" opacity=".5"/>
            <rect x="26" y="20" width="8" height="3" rx="1.5" fill="#fff" opacity=".6"/><rect x="26" y="26" width="8" height="3" rx="1.5" fill="#fff" opacity=".5"/>
            <rect x="14" y="32" width="20" height="3" rx="1.5" fill="#5df5a0" opacity=".8"/>
            <circle cx="24" cy="12" r="2.5" fill="#fff" opacity=".7"/></svg>`
    };
    // New chapter 2 ("Prepara tu entorno y tu rol") gets a settings/sliders icon;
    // chapters 3+ reuse the themed icons shifted by one position.
    const gear = `<svg viewBox="0 0 48 48" class="ch-icon-svg"><defs><linearGradient id="cig" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#C966FF"/><stop offset="100%" stop-color="#A100FF"/></linearGradient><filter id="csg"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#A100FF" flood-opacity=".35"/></filter></defs>
            <rect x="8" y="10" width="32" height="28" rx="7" fill="url(#cig)" filter="url(#csg)"/>
            <line x1="14" y1="18" x2="34" y2="18" stroke="#fff" stroke-width="2" opacity=".4" stroke-linecap="round"/>
            <line x1="14" y1="24" x2="34" y2="24" stroke="#fff" stroke-width="2" opacity=".4" stroke-linecap="round"/>
            <line x1="14" y1="30" x2="34" y2="30" stroke="#fff" stroke-width="2" opacity=".4" stroke-linecap="round"/>
            <circle cx="20" cy="18" r="3.2" fill="#fff"/><circle cx="29" cy="24" r="3.2" fill="#5df5a0"/><circle cx="17" cy="30" r="3.2" fill="#fff"/>
            <circle cx="44" cy="11" r="3" fill="#5df5a0"><animate attributeName="opacity" values="1;.4;1" dur="2s" repeatCount="indefinite"/></circle></svg>`;
    if (id === 1) return icons[1];
    if (id === 2) return gear;
    return icons[id - 1] || icons[1];
}

// ===== 3D ROCKET & TROPHY SVG =====
function journeyRocketSVG() {
    return `<svg viewBox="0 0 64 64" class="journey-3d-icon"><defs>
        <linearGradient id="jrk1" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#C966FF"/><stop offset="100%" stop-color="#A100FF"/></linearGradient>
        <linearGradient id="jrk2" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#ff6b4a"/><stop offset="100%" stop-color="#ffb400"/></linearGradient>
        <filter id="jrkg"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#A100FF" flood-opacity=".4"/></filter>
    </defs>
    <path d="M32 4 C32 4 20 18 20 34 L20 44 L26 40 L26 48 L32 52 L38 48 L38 40 L44 44 L44 34 C44 18 32 4 32 4Z" fill="url(#jrk1)" filter="url(#jrkg)"/>
    <path d="M32 8 C32 8 24 20 24 34 L24 40 L28 38 L28 46 L32 48 L36 46 L36 38 L40 40 L40 34 C40 20 32 8 32 8Z" fill="#fff" opacity=".15"/>
    <circle cx="32" cy="26" r="5" fill="#fff" opacity=".85"/>
    <circle cx="32" cy="26" r="3" fill="#A100FF"/>
    <path d="M14 36 Q18 30 20 34" fill="#6E54E6"/><path d="M44 34 Q46 30 50 36" fill="#6E54E6"/>
    <path d="M26 50 Q28 58 32 60 Q36 58 38 50" fill="url(#jrk2)" opacity=".9">
        <animate attributeName="d" values="M26 50 Q28 58 32 60 Q36 58 38 50;M27 50 Q29 56 32 58 Q35 56 37 50;M26 50 Q28 58 32 60 Q36 58 38 50" dur="0.8s" repeatCount="indefinite"/>
    </path>
    <circle cx="30" cy="56" r="1.5" fill="#ffb400" opacity=".7"><animate attributeName="cy" values="56;62;56" dur="1s" repeatCount="indefinite"/></circle>
    <circle cx="34" cy="58" r="1" fill="#ff6b4a" opacity=".6"><animate attributeName="cy" values="58;64;58" dur="0.7s" repeatCount="indefinite"/></circle>
    </svg>`;
}

function journeyTrophySVG() {
    return `<svg viewBox="0 0 64 64" class="journey-3d-icon"><defs>
        <linearGradient id="jtr1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffb400"/><stop offset="100%" stop-color="#ff8a00"/></linearGradient>
        <linearGradient id="jtr2" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#A100FF"/><stop offset="100%" stop-color="#6E54E6"/></linearGradient>
        <filter id="jtrg"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#ffb400" flood-opacity=".4"/></filter>
    </defs>
    <path d="M18 10 L46 10 L44 32 Q42 40 32 42 Q22 40 20 32 Z" fill="url(#jtr1)" filter="url(#jtrg)"/>
    <path d="M22 14 L42 14 L40 30 Q38 36 32 38 Q26 36 24 30 Z" fill="#fff" opacity=".2"/>
    <path d="M14 12 Q10 12 10 20 Q10 28 18 28" fill="none" stroke="url(#jtr1)" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M50 12 Q54 12 54 20 Q54 28 46 28" fill="none" stroke="url(#jtr1)" stroke-width="3.5" stroke-linecap="round"/>
    <rect x="28" y="42" width="8" height="8" rx="2" fill="url(#jtr2)"/>
    <rect x="22" y="50" width="20" height="5" rx="2.5" fill="url(#jtr2)"/>
    <text x="32" y="28" text-anchor="middle" font-size="12" font-weight="800" fill="#fff" opacity=".9">★</text>
    <circle cx="20" cy="6" r="2" fill="#ffb400"><animate attributeName="opacity" values="1;.3;1" dur="1.5s" repeatCount="indefinite"/></circle>
    <circle cx="44" cy="4" r="1.5" fill="#5df5a0"><animate attributeName="opacity" values=".3;1;.3" dur="1.8s" repeatCount="indefinite"/></circle>
    <circle cx="50" cy="8" r="1.5" fill="#C966FF"><animate attributeName="opacity" values=".6;.2;.6" dur="2s" repeatCount="indefinite"/></circle>
    </svg>`;
}

// ===== RENDER LEARNING PATH =====
function renderLearningPath() {
    const container = document.getElementById('learning-path');

    const stops = LEARNING_PATH.map((ch, i) => {
        const side = i % 2 === 0 ? 'jstop-left' : 'jstop-right';
        const chips = CHAPTER_CHIPS[ch.id] || ch.topics;
        return `
        <div class="journey-stop ${side}" data-chapter="${ch.id}">
            <div class="journey-card" role="button" tabindex="0" aria-expanded="false"
                 aria-label="Capítulo ${ch.id}: ${ch.title} — ver temario"
                 onclick="toggleChapterTopics(this)"
                 onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleChapterTopics(this);}">
                <div class="journey-deco" style="animation-delay:${(i * 0.37).toFixed(2)}s">${cardDeco(ch.id)}</div>
                <span class="jc-done-flag" aria-hidden="true">&#10003;</span>
                <div class="jc-meta">
                    <span class="chapter-difficulty diff-${ch.difficulty}">${ch.difficulty}</span>
                    <span class="chapter-duration">&#9201; ${ch.duration}</span>
                </div>
                <div class="jc-title-row">
                    <span class="ch-icon-wrap">${chapterIcon3D(ch.id)}</span>
                    <h3>${ch.title}</h3>
                </div>
                <p class="jc-subtitle">${ch.subtitle}${/[.!?…]$/.test(ch.subtitle.trim()) ? '' : '.'}</p>
                <div class="jc-topics-wrap">
                    <span class="jc-topics-toggle">
                        <span class="jc-tt-label">Temario</span>
                        <span class="jc-tt-count">${chips.length}</span>
                        <span class="jc-tt-chevron" aria-hidden="true">&#9662;</span>
                    </span>
                    <div class="jc-topics-panel" onclick="event.stopPropagation()">
                        <div class="jc-topics-inner">
                            ${chips.map(t => `<span class="jc-topic">${t}</span>`).join('')}
                        </div>
                        <button class="jc-open" type="button" onclick="event.stopPropagation(); openChapter(${ch.id})">
                            Abrir capítulo &#8594;
                        </button>
                    </div>
                </div>
            </div>
            <div class="journey-node" id="jnode-${ch.id}">${ch.id}</div>
            <div class="journey-spacer"></div>
        </div>`;
    }).join('');

    container.innerHTML = `
        <div class="journey">
            <div class="journey-line"></div>
            <div class="journey-line-progress" id="journey-progress"></div>
            <div class="journey-rocket" id="journey-rocket" aria-hidden="true">${travelRocketSVG()}</div>
            <div class="journey-marker">
                <div class="journey-marker-icon">${journeyRocketSVG()}</div>
                <div class="journey-marker-text">Inicio del viaje</div>
            </div>
            ${stops}
            <div class="journey-marker" style="padding-top:20px">
                <div class="journey-marker-icon">${journeyTrophySVG()}</div>
                <div class="journey-marker-text">&#161;Dominas Claude!</div>
            </div>
        </div>`;

    setupJourneyRocket();
}

// Expand/collapse the per-chapter topic list inline. Triggered by clicking
// anywhere on the card (accordion). The "Abrir capítulo" CTA opens the modal.
function toggleChapterTopics(el) {
    const card = el.classList.contains('journey-card') ? el : el.closest('.journey-card');
    const wrap = card ? card.querySelector('.jc-topics-wrap') : el.closest('.jc-topics-wrap');
    if (!wrap) return;
    const panel = wrap.querySelector('.jc-topics-panel');
    const isOpen = wrap.classList.toggle('open');
    if (card) card.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    panel.style.maxHeight = isOpen ? panel.scrollHeight + 'px' : '0px';
    if (typeof updateJourneyRocket === 'function') updateJourneyRocket();
}

// ===== CHAPTER COMPLETION + PROGRESS =====
// Short 1–2 word chips shown on the cards (the full topics stay in the modal).
const CHAPTER_CHIPS = {
    1: ['LLMs', 'Claude vs IAs', 'Conversación', 'Interfaz', 'Glosario'],
    2: ['Contexto', 'Ficha HRBP', 'Proyecto base', 'Ajustes'],
    3: ['CRAFT', 'Iterar', 'Etiquetas XML', 'Errores'],
    4: ['Pegar datos', 'Métricas', 'Visualizaciones', 'Profundizar'],
    5: ['Estructura', 'Registro', 'HTML', 'Exportar PDF'],
    6: ['Asesor', 'Propuestas', 'Narrativas', 'Briefings'],
    7: ['Talent review', 'Performance', 'Engagement', 'Planes'],
    8: ['Claude Code', 'Asistente/Agente', 'CLAUDE.md', 'Skills', 'Comandos'],
    9: ['Qué compartir', 'Anonimizar', 'Contratos', 'Checklist'],
    10: ['Prompt chaining', 'Projects', 'Plantillas', 'Flujos'],
    11: ['Rutina semanal', 'Plantillas', 'Productividad', 'Cuándo NO']
};

const DONE_KEY = 'hrChaptersDone';
function getDoneChapters() {
    try { return JSON.parse(localStorage.getItem(DONE_KEY)) || []; } catch (e) { return []; }
}
function isChapterDone(id) { return getDoneChapters().indexOf(id) !== -1; }
function setChapterDone(id, done) {
    var arr = getDoneChapters();
    var i = arr.indexOf(id);
    if (done && i === -1) arr.push(id);
    else if (!done && i !== -1) arr.splice(i, 1);
    try { localStorage.setItem(DONE_KEY, JSON.stringify(arr)); } catch (e) {}
    refreshProgressUI();
    updateChapterDoneBtn(id);
}
function toggleChapterDone(id) { setChapterDone(id, !isChapterDone(id)); }
function completedCount() {
    var done = getDoneChapters();
    return LEARNING_PATH.filter(function (c) { return done.indexOf(c.id) !== -1; }).length;
}

// Reflect completion across the itinerary: node checks, card state, the rocket
// position along the line, and the hero progress widget.
function refreshProgressUI() {
    var done = getDoneChapters();
    LEARNING_PATH.forEach(function (ch) {
        var isDone = done.indexOf(ch.id) !== -1;
        var node = document.getElementById('jnode-' + ch.id);
        if (node) {
            node.classList.toggle('done', isDone);
            node.innerHTML = isDone ? '&#10003;' : ch.id;
        }
        var stop = document.querySelector('.journey-stop[data-chapter="' + ch.id + '"]');
        if (stop) {
            var card = stop.querySelector('.journey-card');
            if (card) card.classList.toggle('chapter-done', isDone);
        }
    });
    updateJourneyRocket();
    updateHeroProgress();
    updateContinueBanner();
    if (typeof refreshConstellationDone === 'function') refreshConstellationDone();
}

function updateChapterDoneBtn(id) {
    var btn = document.getElementById('cv-done-btn');
    if (!btn || cvChapterId !== id) return;
    var done = isChapterDone(id);
    btn.classList.toggle('done', done);
    btn.innerHTML = done ? '&#10003; Completado' : 'Marcar como completado';
}

function updateHeroProgress() {
    var el = document.getElementById('hero-progress');
    if (!el) return;
    var total = LEARNING_PATH.length, done = completedCount();
    var pct = total ? Math.round(done / total * 100) : 0;
    var c = el.querySelector('.hp-count'); if (c) c.textContent = done + ' / ' + total;
    var f = el.querySelector('.hp-fill'); if (f) f.style.width = pct + '%';
    var p = el.querySelector('.hp-pct'); if (p) p.textContent = pct + '%';
}

// "Continuar donde lo dejaste" banner (element added in the hero).
function updateContinueBanner() {
    var el = document.getElementById('continue-banner');
    if (!el) return;
    var next = LEARNING_PATH.find(function (c) { return !isChapterDone(c.id); });
    var done = completedCount();
    if (!next || done === 0) {
        // Nothing started yet, or everything finished → hide the banner.
        el.classList.remove('visible');
        el.onclick = null;
        return;
    }
    el.classList.add('visible');
    var label = el.querySelector('.cb-label');
    if (label) label.innerHTML = 'Continúa por el <strong>Capítulo ' +
        String(next.id).padStart(2, '0') + ' · ' + next.title + '</strong>';
    el.onclick = function () { openChapter(next.id); };
}

// ===== TRAVELING ROCKET (rides the line to reflect real completion) =====
function travelRocketSVG() {
    return `<svg viewBox="0 0 64 64" class="journey-rocket-svg"><defs>
        <linearGradient id="trk1" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#C966FF"/><stop offset="100%" stop-color="#A100FF"/></linearGradient>
        <linearGradient id="trk2" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#ff6b4a"/><stop offset="100%" stop-color="#ffb400"/></linearGradient>
    </defs>
    <path d="M32 4 C32 4 20 18 20 34 L20 44 L26 40 L26 48 L32 52 L38 48 L38 40 L44 44 L44 34 C44 18 32 4 32 4Z" fill="url(#trk1)"/>
    <circle cx="32" cy="26" r="4.5" fill="#fff" opacity=".92"/>
    <circle cx="32" cy="26" r="2.6" fill="#A100FF"/>
    <path d="M14 36 Q18 30 20 34" fill="#6E54E6"/><path d="M44 34 Q46 30 50 36" fill="#6E54E6"/>
    <path d="M26 50 Q28 60 32 62 Q36 60 38 50" fill="url(#trk2)" opacity=".95">
        <animate attributeName="d" values="M26 50 Q28 60 32 62 Q36 60 38 50;M27 50 Q29 57 32 59 Q35 57 37 50;M26 50 Q28 60 32 62 Q36 60 38 50" dur="0.5s" repeatCount="indefinite"/>
    </path>
    </svg>`;
}

function updateJourneyRocket() {
    var gf = document.getElementById('group-formacion');
    if (gf && gf.hidden) return;                 // área Formación no visible
    var lp = document.getElementById('learning-path');
    if (lp && lp.hidden) return;                 // timeline not visible (map view)
    const journey = document.querySelector('.journey');
    const rocket = document.getElementById('journey-rocket');
    const progress = document.getElementById('journey-progress');
    if (!journey || !rocket || !progress) return;
    const lineTop = 50;                          // matches .journey-line top
    const travel = journey.offsetHeight - 100;   // top 50px + bottom 50px insets
    // The rocket travels down the line as you SCROLL through the chapters.
    const rect = journey.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    var sp = (vh * 0.5 - rect.top) / (rect.height || 1);
    sp = Math.max(0, Math.min(1, sp));
    rocket.style.top = (lineTop + sp * travel) + 'px';
    // The bright trail reflects your REAL progress (completed chapters).
    const total = LEARNING_PATH.length;
    const frac = total ? completedCount() / total : 0;
    progress.style.height = Math.max(0, frac * travel) + 'px';
}

let _jrTicking = false;
function _jrOnScroll() {
    if (_jrTicking) return;
    _jrTicking = true;
    requestAnimationFrame(function () {
        updateJourneyRocket();
        if (typeof updateConstellationRocket === 'function') updateConstellationRocket();
        _jrTicking = false;
    });
}
function setupJourneyRocket() {
    updateJourneyRocket();
    window.removeEventListener('scroll', _jrOnScroll);
    window.removeEventListener('resize', _jrOnScroll);
    window.addEventListener('scroll', _jrOnScroll, { passive: true });
    window.addEventListener('resize', _jrOnScroll, { passive: true });
}

// Cohete dedicado de la constelacion: IDs de degradado propios (trkc*) para que
// pinte aunque el cohete del timeline (mismos paths) este en display:none.
function constellationRocketSVG() {
    return `<svg viewBox="0 0 64 64" class="cst-rocket-svg"><defs>
        <linearGradient id="trkc1" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#C966FF"/><stop offset="100%" stop-color="#A100FF"/></linearGradient>
        <linearGradient id="trkc2" x1=".5" y1="0" x2=".5" y2="1"><stop offset="0%" stop-color="#ff6b4a"/><stop offset="100%" stop-color="#ffb400"/></linearGradient>
    </defs>
    <path d="M32 4 C32 4 20 18 20 34 L20 44 L26 40 L26 48 L32 52 L38 48 L38 40 L44 44 L44 34 C44 18 32 4 32 4Z" fill="url(#trkc1)"/>
    <circle cx="32" cy="26" r="4.5" fill="#fff" opacity=".92"/>
    <circle cx="32" cy="26" r="2.6" fill="#A100FF"/>
    <path d="M14 36 Q18 30 20 34" fill="#6E54E6"/><path d="M44 34 Q46 30 50 36" fill="#6E54E6"/>
    <path d="M26 50 Q28 60 32 62 Q36 60 38 50" fill="url(#trkc2)" opacity=".95">
        <animate attributeName="d" values="M26 50 Q28 60 32 62 Q36 60 38 50;M27 50 Q29 57 32 59 Q35 57 37 50;M26 50 Q28 60 32 62 Q36 60 38 50" dur="0.5s" repeatCount="indefinite"/>
    </path>
    </svg>`;
}

// ===== VISTA MAPA / CONSTELACION (toggle con el timeline) =====
// Posiciones (x%, y%) de cada capitulo siguiendo una onda suave (sin/coseno),
// que se lee como una ruta estelar armónica en lugar de un zigzag.
var CONSTELLATION_POS = [
    [6, 48], [15, 63], [24, 70], [33, 63], [42, 48],
    [51, 33], [60, 26], [69, 32], [78, 47], [87, 62], [95, 70]
];
// Catmull-Rom -> cubic Bezier: una curva suave que pasa por todos los puntos.
function smoothPath(pts) {
    if (!pts.length) return '';
    if (pts.length < 3) return 'M' + pts.map(function (p) { return p[0] + ',' + p[1]; }).join(' L');
    var d = 'M' + pts[0][0] + ',' + pts[0][1];
    for (var i = 0; i < pts.length - 1; i++) {
        var p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || pts[i + 1];
        var c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
        var c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
        d += ' C' + c1x.toFixed(2) + ',' + c1y.toFixed(2) + ' ' + c2x.toFixed(2) + ',' + c2y.toFixed(2) + ' ' + p2[0] + ',' + p2[1];
    }
    return d;
}
function renderConstellation() {
    var el = document.getElementById('constellation-view');
    if (!el) return;
    var pts = LEARNING_PATH.map(function (c, i) { return CONSTELLATION_POS[i] || [50, 50]; });
    var d = smoothPath(pts);
    var nodes = LEARNING_PATH.map(function (c, i) {
        var p = CONSTELLATION_POS[i] || [50, 50];
        return '<button class="cst-node" type="button" data-chapter="' + c.id + '" ' +
            'style="left:' + p[0] + '%;top:' + p[1] + '%" onclick="openChapter(' + c.id + ')" ' +
            'aria-label="Capítulo ' + c.id + ': ' + c.title + '">' +
            '<span class="cst-dot">' + c.id + '</span>' +
            '<span class="cst-label">' + c.title + '</span></button>';
    }).join('');
    el.innerHTML =
        '<svg class="cst-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">' +
        '<defs><linearGradient id="cstgrad" x1="0" y1="0" x2="1" y2="0">' +
        '<stop offset="0%" stop-color="#A100FF"/><stop offset="55%" stop-color="#6E54E6"/><stop offset="100%" stop-color="#5db4f5"/>' +
        '</linearGradient></defs>' +
        '<path id="cst-path" d="' + d + '" fill="none" stroke="url(#cstgrad)" stroke-width="2" ' +
        'vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" opacity="0.26"/>' +
        '<path class="cst-flow" d="' + d + '" fill="none" stroke="url(#cstgrad)" stroke-width="2" ' +
        'vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-dasharray="1.5 7"/>' +
        '<path id="cst-progress" class="cst-progress" d="' + d + '" fill="none" stroke="url(#cstgrad)" stroke-width="2.6" ' +
        'vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round"/>' +
        '</svg>' +
        '<div class="cst-marker cst-start" style="left:7%;top:19%"><span class="cm-icon">&#128640;</span><span class="cm-label">Inicio del viaje</span></div>' +
        '<div class="cst-marker cst-end" style="left:90%;top:91%"><span class="cm-icon">&#127942;</span><span class="cm-label">&iexcl;Dominas Claude!</span></div>' +
        '<div class="cst-rocket" id="cst-rocket" aria-hidden="true">' + constellationRocketSVG() + '</div>' +
        nodes;
    refreshConstellationDone();
}
function updateConstellationRocket() {
    var el = document.getElementById('constellation-view');
    var path = document.getElementById('cst-path');
    var prog = document.getElementById('cst-progress');
    var rocket = document.getElementById('cst-rocket');
    if (!el || !path || !rocket || el.hidden) return;
    var len = path.getTotalLength();
    if (!len) return;
    var rect = el.getBoundingClientRect();
    // Estela = avance real (capitulos completados).
    var total = LEARNING_PATH.length;
    var frac = total ? completedCount() / total : 0;
    if (prog) { prog.style.strokeDasharray = len; prog.style.strokeDashoffset = len * (1 - frac); }
    // Cohete = posicion de scroll a lo largo de la ruta (se desplaza por los capitulos).
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var sp = (vh * 0.5 - rect.top) / (rect.height || 1);
    sp = Math.max(0, Math.min(1, sp));
    var pt = path.getPointAtLength(len * sp);
    var ahead = path.getPointAtLength(Math.min(len, len * sp + 1));
    // El viewBox 0..100 se estira al contenedor (preserveAspectRatio none): la
    // tangente para orientar el cohete hay que medirla en píxeles reales.
    var dx = (ahead.x - pt.x) * (rect.width || 1) / 100;
    var dy = (ahead.y - pt.y) * (rect.height || 1) / 100;
    var ang = Math.atan2(dy, dx) * 180 / Math.PI;
    rocket.style.left = pt.x + '%';
    rocket.style.top = pt.y + '%';
    rocket.style.transform = 'translate(-50%,-50%) rotate(' + (ang + 90).toFixed(1) + 'deg)';
}
function refreshConstellationDone() {
    var nextC = LEARNING_PATH.find(function (c) { return !isChapterDone(c.id); });
    var nextId = nextC ? nextC.id : null;
    LEARNING_PATH.forEach(function (c) {
        var n = document.querySelector('.cst-node[data-chapter="' + c.id + '"]');
        if (n) {
            n.classList.toggle('done', isChapterDone(c.id));
            n.classList.toggle('cst-next', c.id === nextId);   // proximo capitulo: late como faro
        }
    });
    updateConstellationRocket();
}
function setItinView(view) {
    var lp = document.getElementById('learning-path');
    var cv = document.getElementById('constellation-view');
    var isMap = view === 'map';
    if (lp) lp.hidden = isMap;
    if (cv) cv.hidden = !isMap;
    document.querySelectorAll('.ivt-btn').forEach(function (b) {
        b.classList.toggle('active', b.dataset.view === view);
        b.setAttribute('aria-pressed', b.dataset.view === view ? 'true' : 'false');
    });
    if (isMap) renderConstellation();
    try { localStorage.setItem('hrItinView', view); } catch (e) {}
}

// ===== CHAPTER VIEWER (SLIDE-BASED) =====
let cvCurrent = 0;
let cvTotal = 0;
let cvChapterId = 0;

function openChapter(id) {
    const ch = LEARNING_PATH.find(c => c.id === id);
    if (!ch) return;
    cvCurrent = 0;
    cvChapterId = id;

    const modal = document.getElementById('modal-overlay');
    const modalEl = modal.querySelector('.modal');
    const content = document.getElementById('modal-content');
    modalEl.classList.add('modal-chapter');

    const slides = [];
    slides.push(cvRenderIntro(ch));
    ch.content.forEach((block, i) => slides.push(cvRenderBlock(block, ch)));
    if (ch.resources.length || (ch.relatedPrompts && ch.relatedPrompts.length))
        slides.push(cvRenderResources(ch));
    cvTotal = slides.length;

    content.innerHTML = `
        <div class="cv">
            <div class="cv-header">
                <div class="cv-section">${String(ch.id).padStart(2,'0')} &mdash; ${ch.title.toUpperCase()}</div>
                <div class="cv-progress"><div class="cv-bar" style="width:${(1/cvTotal)*100}%"></div></div>
                <div class="cv-counter">1 / ${cvTotal}</div>
                <button class="cv-done-btn${isChapterDone(ch.id) ? ' done' : ''}" id="cv-done-btn" type="button"
                    onclick="toggleChapterDone(${ch.id})" title="Marcar capítulo como completado">${isChapterDone(ch.id) ? '&#10003; Completado' : 'Marcar como completado'}</button>
                <button class="cv-fs-btn" id="cv-fs-btn" type="button" onclick="toggleChapterFullscreen()" title="Modo presentación" aria-label="Modo presentación">&#9974;</button>
            </div>
            <div class="cv-slides">
                ${slides.map((s,i) => `<div class="cv-slide${i===0?' cv-active':''}">${s}</div>`).join('')}
            </div>
            <div class="cv-nav">
                <button class="cv-prev" onclick="navigateChapter(-1)" disabled>&#8592; Anterior</button>
                <div class="cv-dots">
                    ${slides.map((_,i) => `<span class="cv-dot${i===0?' cv-dot-active':''}" onclick="goToSlide(${i})"></span>`).join('')}
                </div>
                <button class="cv-next" onclick="navigateChapter(1)">Siguiente &#8594;</button>
            </div>
        </div>`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function navigateChapter(dir) {
    const n = cvCurrent + dir;
    if (n < 0 || n >= cvTotal) return;
    goToSlide(n);
}

function goToSlide(idx) {
    if (idx < 0 || idx >= cvTotal) return;
    const slides = document.querySelectorAll('.cv-slide');
    const dots = document.querySelectorAll('.cv-dot');
    slides[cvCurrent].classList.remove('cv-active');
    dots[cvCurrent].classList.remove('cv-dot-active');
    if (cvCurrent < idx) dots[cvCurrent].classList.add('cv-dot-done');
    cvCurrent = idx;
    slides[cvCurrent].classList.add('cv-active');
    dots[cvCurrent].classList.add('cv-dot-active');
    document.querySelector('.cv-bar').style.width = `${((cvCurrent+1)/cvTotal)*100}%`;
    document.querySelector('.cv-counter').textContent = `${cvCurrent+1} / ${cvTotal}`;
    document.querySelector('.cv-prev').disabled = cvCurrent === 0;
    const nextBtn = document.querySelector('.cv-next');
    nextBtn.disabled = false;
    if (cvCurrent === cvTotal - 1) {
        // Reaching the last slide auto-marks the chapter as completed.
        if (!isChapterDone(cvChapterId)) setChapterDone(cvChapterId, true);
        const next = LEARNING_PATH.find(c => c.id === cvChapterId + 1);
        if (next) {
            nextBtn.innerHTML = 'Cap&iacute;tulo siguiente &#8594;';
            nextBtn.onclick = () => openChapter(next.id);
        } else {
            nextBtn.innerHTML = 'Finalizar &#10003;';
            nextBtn.onclick = closeModal;
        }
    } else {
        nextBtn.innerHTML = 'Siguiente &#8594;';
        nextBtn.onclick = () => navigateChapter(1);
    }
    document.querySelector('.cv-slides').scrollTop = 0;
}

// --- Slide renderers ---

function cvRenderIntro(ch) {
    return `
        <div class="cv-intro-with-robot">
            <div>
                <span class="cv-intro-badge">${String(ch.id).padStart(2,'0')} &mdash; ${ch.difficulty.toUpperCase()} &bull; ${ch.duration}</span>
                <h2 class="cv-intro-title"><span class="cv-intro-icon">${chapterIcon3D(ch.id)}</span>${ch.title}</h2>
                <div class="cv-intro-meta">
                    <span class="chapter-difficulty diff-${ch.difficulty}">${ch.difficulty}</span>
                    <span class="chapter-duration">&#9201; ${ch.duration}</span>
                    <span style="color:var(--text-muted);font-size:0.82rem">${ch.content.length} secciones</span>
                </div>
                <p class="cv-intro-text">${ch.intro}</p>
                <span class="cv-section-label">Qu&eacute; aprender&aacute;s</span>
                <div class="cv-topics-grid">
                    ${ch.topics.map(t => `<div class="cv-topic-item"><span class="cv-topic-icon">&#8594;</span>${t}</div>`).join('')}
                </div>
            </div>
            <div class="cv-intro-robot robot-float">${cardDeco(ch.id)}</div>
        </div>`;
}

function cvRenderBlock(block, ch) {
    if (block.type === 'concept') return cvRenderConcept(block, ch);
    if (block.type === 'tip') return cvRenderTip(block);
    if (block.type === 'example') return cvRenderExample(block);
    if (block.type === 'exercise') return cvRenderExercise(block);
    return '';
}

// Inline **bold** -> <strong>, and split text into paragraphs on blank lines.
function cvFmt(s) {
    return String(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}
function cvParas(text, cls) {
    return String(text).split(/\n\n+/).map(block => {
        const lines = block.split('\n');
        if (lines.length > 1 && lines.every(l => /^\s*-\s+/.test(l))) {
            return `<ul class="cv-list">${lines.map(l => `<li>${cvFmt(l.replace(/^\s*-\s+/, '').trim())}</li>`).join('')}</ul>`;
        }
        return `<p class="${cls}">${cvFmt(block.replace(/\n/g, ' ').trim())}</p>`;
    }).join('');
}

function cvRenderConcept(block, ch) {
    let widget = '';
    const t = block.title.toLowerCase();
    if (t.includes('claude vs chatgpt vs claude code')) widget = cvWidgetComparison();
    else if (t.includes('opus, sonnet y haiku') || t.includes('tres modelos')) widget = cvWidgetModels();
    else if (t.includes('activación de claude enterprise') || t.includes('activacion de claude enterprise')) widget = cvWidgetActivation();
    else if (t.includes('tres zonas')) widget = cvWidgetTrafficLight();
    else if (t.includes('comandos de referencia')) widget = cvWidgetCommands();
    else if (t.includes('web vs claude code') || t.includes('web vs. claude code')) widget = cvWidgetWebVsCode();
    else if (t.includes('framework craft')) widget = cvWidgetCraft();
    else if (t.includes('asistentes vs agentes') || t.includes('agentes')) widget = cvWidgetAgents();
    else if (t.includes('glosario esencial')) widget = cvWidgetGlossary();

    return `
        <div>
            <span class="cv-type-badge concept">Concepto</span>
            <h3 class="cv-concept-title">${block.title}</h3>
            ${cvParas(block.text, 'cv-concept-text')}
            ${widget}
        </div>`;
}

function cvRenderTip(block) {
    return `
        <div>
            <div class="cv-alert alert-tip">
                <span class="cv-alert-icon">&#128161;</span>
                <div class="cv-alert-content">
                    <div class="cv-alert-label">Consejo pr&aacute;ctico</div>
                    <p>${cvFmt(block.text)}</p>
                </div>
            </div>
        </div>`;
}

function cvRenderExample(block) {
    return `
        <div>
            <span class="cv-type-badge example">Ejemplo pr&aacute;ctico</span>
            <h3 class="cv-concept-title">${block.title}</h3>
            <p class="cv-concept-text" style="margin-bottom:16px">${cvFmt(block.explanation)}</p>
            <div class="cv-terminal">
                <div class="cv-terminal-header">
                    <div class="cv-terminal-dots"><span></span><span></span><span></span></div>
                    <span class="cv-terminal-title">Prompt</span>
                </div>
                <div class="cv-terminal-body">
                    <button class="cv-terminal-copy" onclick="copyText(\`${escapeTemplate(block.prompt)}\`)">Copiar</button>
${escapeHtml(block.prompt)}</div>
            </div>
        </div>`;
}

function cvRenderExercise(block) {
    const steps = block.instructions
        .split(/(?=\d+\.\s)/)
        .filter(s => s.trim())
        .map(s => s.replace(/^\d+\.\s*/, '').trim());

    return `
        <div>
            <span class="cv-type-badge exercise">Ejercicio</span>
            <h3 class="cv-concept-title">${block.title}</h3>
            <div class="cv-exercise-steps">
                ${steps.map((s,i) => `
                    <div class="cv-exercise-step">
                        <span class="cv-step-num">${i+1}</span>
                        <span class="cv-step-text">${s}</span>
                    </div>`).join('')}
            </div>
        </div>`;
}

function cvRenderResources(ch) {
    const res = ch.resources.length ? `
        <span class="cv-section-label">Recursos recomendados</span>
        <div class="resource-list" style="margin-bottom:24px">
            ${ch.resources.map(r => `
                <a href="${r.url}" target="_blank" rel="noopener" class="resource-item">
                    <span class="resource-type rtype-${r.type}">${r.type}</span>
                    <div class="resource-info">
                        <div class="resource-name">${r.name}</div>
                        <div class="resource-desc">${r.desc}</div>
                    </div>
                    ${r.free ? '<span class="resource-free">GRATIS</span>' : ''}
                </a>`).join('')}
        </div>` : '';

    const rel = ch.relatedPrompts && ch.relatedPrompts.length ? `
        <span class="cv-section-label">Prompts relacionados</span>
        <div class="resource-list">
            ${ch.relatedPrompts.map(pid => {
                const p = PROMPTS.find(pr => pr.id === pid);
                if (!p) return '';
                return `
                    <div class="resource-item" style="cursor:pointer" onclick="copyPromptText('${p.id}')">
                        <span class="resource-type rtype-guia">${p.cat.split(' ')[0]}</span>
                        <div class="resource-info">
                            <div class="resource-name">${p.title}</div>
                            <div class="resource-desc">${p.desc}</div>
                        </div>
                        <span style="font-size:0.75rem;color:var(--purple);font-weight:600">COPIAR</span>
                    </div>`;
            }).join('')}
        </div>` : '';

    return `
        <div>
            <span class="cv-type-badge resources">Recursos y siguiente paso</span>
            <h3 class="cv-concept-title">&#127891; Completa tu aprendizaje</h3>
            <p class="cv-concept-text" style="margin-bottom:24px">Recursos recomendados y prompts de la biblioteca para seguir practicando.</p>
            ${res}${rel}
            ${cvNextChapterCta(ch)}
        </div>`;
}

function cvNextChapterCta(ch) {
    const next = LEARNING_PATH.find(c => c.id === ch.id + 1);
    if (next) {
        return `<div class="cv-next-chapter" onclick="openChapter(${next.id})">
            <div class="cv-next-chapter-info">
                <span class="cv-next-chapter-label">Siguiente cap&iacute;tulo</span>
                <span class="cv-next-chapter-title">${String(next.id).padStart(2, '0')} &middot; ${next.title}</span>
            </div>
            <span class="cv-next-chapter-arrow">&#8594;</span>
        </div>`;
    }
    return `<div class="cv-finish-card">&#127881; &iexcl;Has completado todo el itinerario! Enhorabuena &mdash; ya dominas Claude como HRBP.</div>`;
}

// --- Interactive widgets ---

// Reusable selectable cards: click a card to reveal its detailed explanation.
let cvSelStore = {};
function cvSelectable(items, cols) {
    const gid = 'sel_' + Math.random().toString(36).slice(2, 7);
    cvSelStore[gid] = items.map(i => i.detail);
    const cards = items.map((it, idx) => `
        <button class="cv-sel-card${idx === 0 ? ' cv-sel-active' : ''}" onclick="cvSelect('${gid}',${idx})">
            <span class="cv-sel-icon">${it.icon}</span>
            <span class="cv-sel-title">${it.title}</span>
            ${it.tag ? `<span class="cv-sel-tag" style="${it.tagStyle || ''}">${it.tag}</span>` : ''}
        </button>`).join('');
    return `<div class="cv-selectable" id="${gid}">
        <div class="cv-sel-cards" style="grid-template-columns:repeat(${cols || items.length},1fr)">${cards}</div>
        <div class="cv-sel-detail" id="${gid}_d">
            <span class="cv-sel-detail-hint">&#128072; Toca cada opci&oacute;n para ver el detalle</span>
            ${items[0].detail}
        </div>
    </div>`;
}
function cvSelect(gid, idx) {
    const root = document.getElementById(gid);
    if (!root) return;
    [...root.querySelectorAll('.cv-sel-card')].forEach((c, i) => c.classList.toggle('cv-sel-active', i === idx));
    const d = document.getElementById(gid + '_d');
    d.innerHTML = cvSelStore[gid][idx];
    d.classList.remove('cv-sel-detail-anim');
    void d.offsetWidth;
    d.classList.add('cv-sel-detail-anim');
}

function cvWidgetComparison() {
    return cvSelectable([
        {
            icon: '&#129302;', title: 'ChatGPT', tag: 'OpenAI',
            tagStyle: 'background:rgba(16,163,127,.1);color:#10A37F',
            detail: '<strong>ChatGPT (OpenAI)</strong> es un asistente generalista con una ventana de 128K tokens y un ecosistema amplio de integraciones visuales (DALL&middot;E) y plugins. Es v&aacute;lido para tareas gen&eacute;ricas, pero para el HRBP se queda por detr&aacute;s de Claude en razonamiento sobre documentos largos y en redacci&oacute;n institucional en espa&ntilde;ol.'
        },
        {
            icon: '&#129504;', title: 'Claude (Web)', tag: 'Recomendado',
            tagStyle: 'background:var(--purple-dim);color:var(--purple)',
            detail: '<strong>Claude web</strong> es tu herramienta por defecto. Asistente conversacional con <strong>200K tokens</strong> de contexto (&asymp;500 p&aacute;ginas), superior en razonamiento, an&aacute;lisis de documentos largos y redacci&oacute;n en espa&ntilde;ol. Perfecto para pensar, analizar datos y generar documentos. Accedes con SSO @accenture.com.'
        },
        {
            icon: '&#128187;', title: 'Claude Code', tag: 'Avanzado',
            tagStyle: 'background:rgba(93,180,245,.1);color:var(--blue)',
            detail: '<strong>Claude Code</strong> es Claude dentro de tu terminal. No solo conversa: lee y escribe archivos reales, ejecuta scripts y automatiza procesos completos de varios pasos. Ideal cuando la tarea toca varios archivos o quieres automatizar algo recurrente. T&uacute; supervisas; &eacute;l ejecuta.'
        }
    ]);
}

function cvWidgetModels() {
    return cvSelectable([
        {
            icon: '&#9878;&#65039;', title: 'Opus', tag: 'M&aacute;s potente',
            tagStyle: 'background:rgba(255,107,107,.08);color:#D63031',
            detail: '<strong>Opus</strong> es el modelo m&aacute;s potente. &Uacute;salo para razonamiento complejo y trabajo de profundidad: arrancar un an&aacute;lisis de cero, construir un plan estrat&eacute;gico elaborado o cuando la calidad del razonamiento importa m&aacute;s que la velocidad.'
        },
        {
            icon: '&#9881;&#65039;', title: 'Sonnet', tag: 'Equilibrado',
            tagStyle: 'background:var(--purple-dim);color:var(--purple)',
            detail: '<strong>Sonnet</strong> es el equilibrio perfecto para el d&iacute;a a d&iacute;a del HRBP: redacci&oacute;n, an&aacute;lisis de datos, preparaci&oacute;n de briefings. R&aacute;pido y muy capaz. Si dudas qu&eacute; modelo usar, empieza siempre por aqu&iacute;.'
        },
        {
            icon: '&#9889;', title: 'Haiku', tag: 'M&aacute;s r&aacute;pido',
            tagStyle: 'background:var(--green-dim);color:#00B894',
            detail: '<strong>Haiku</strong> es el m&aacute;s r&aacute;pido y ligero. Perfecto para tareas simples y puntuales: reformular un p&aacute;rrafo, clasificar comentarios, hacer res&uacute;menes cortos. Responde casi al instante.'
        }
    ]);
}

function cvWidgetActivation() {
    return `
        <div class="cv-info-grid">
            <div class="cv-info-card">
                <h5>&#9312; Fase 1 &mdash; Antes de tener licencia</h5>
                <div class="cv-exercise-steps">
                    <div class="cv-exercise-step"><span class="cv-step-num">1</span><span class="cv-step-text">Revisar las Responsible AI Use Guidelines</span></div>
                    <div class="cv-exercise-step"><span class="cv-step-num">2</span><span class="cv-step-text">Firmar el Responsible AI Agreement</span></div>
                    <div class="cv-exercise-step"><span class="cv-step-num">3</span><span class="cv-step-text">Solicitar licencia en el Software Catalog (necesitas WBS)</span></div>
                </div>
            </div>
            <div class="cv-info-card">
                <h5>&#9313; Fase 2 &mdash; Una vez tienes licencia</h5>
                <div class="cv-exercise-steps">
                    <div class="cv-exercise-step"><span class="cv-step-num">4</span><span class="cv-step-text">Accede a claude.ai con tu email @accenture.com</span></div>
                    <div class="cv-exercise-step"><span class="cv-step-num">5</span><span class="cv-step-text">Haz clic en &ldquo;Continue with SSO&rdquo;</span></div>
                    <div class="cv-exercise-step"><span class="cv-step-num">6</span><span class="cv-step-text">Para Claude Code: selecciona &ldquo;Enterprise&rdquo; (no &ldquo;Personal&rdquo;)</span></div>
                </div>
            </div>
        </div>
        <div class="cv-alert alert-warning" style="margin-top:16px">
            <span class="cv-alert-icon">&#9888;&#65039;</span>
            <div class="cv-alert-content">
                <div class="cv-alert-label">Importante</div>
                <p>Solicitar licencia no garantiza recibirla. Las licencias se asignan seg&uacute;n disponibilidad. Soporte t&eacute;cnico: ServiceNow, categor&iacute;a &ldquo;Claude Enterprise&rdquo;.</p>
            </div>
        </div>`;
}

function cvWidgetTrafficLight() {
    return `
        <div class="cv-traffic">
            <div class="cv-traffic-item traffic-red">
                <div class="cv-traffic-icon">&#128683;</div>
                <div class="cv-traffic-label">Nunca compartir</div>
                <p>DNI, email personal, historial m&eacute;dico, contrase&ntilde;as, informaci&oacute;n Restricted</p>
            </div>
            <div class="cv-traffic-item traffic-yellow">
                <div class="cv-traffic-icon">&#9888;&#65039;</div>
                <div class="cv-traffic-label">Con precauci&oacute;n</div>
                <p>Datos de proyecto de cliente (confirmar con CAL), contenido de terceros</p>
            </div>
            <div class="cv-traffic-item traffic-green">
                <div class="cv-traffic-icon">&#9989;</div>
                <div class="cv-traffic-label">Siempre hacer</div>
                <p>Etiquetar confidencialidad, revisar output, verificar datos, contactar Legal</p>
            </div>
        </div>`;
}

function cvWidgetCommands() {
    return `
        <div class="cv-info-grid">
            <div class="cv-info-card">
                <h5>&#128187; Arranque (PowerShell)</h5>
                <div class="cv-terminal" style="margin-top:10px">
                    <div class="cv-terminal-header">
                        <div class="cv-terminal-dots"><span></span><span></span><span></span></div>
                        <span class="cv-terminal-title">Terminal</span>
                    </div>
                    <div class="cv-terminal-body" style="font-size:0.76rem;padding:14px">claude          # lanza Claude Code
claude -c       # retoma &uacute;ltima sesi&oacute;n
claude "prompt" # modo one-shot</div>
                </div>
            </div>
            <div class="cv-info-card">
                <h5>&#9889; Slash Commands</h5>
                <div class="cv-terminal" style="margin-top:10px">
                    <div class="cv-terminal-header">
                        <div class="cv-terminal-dots"><span></span><span></span><span></span></div>
                        <span class="cv-terminal-title">Claude Code</span>
                    </div>
                    <div class="cv-terminal-body" style="font-size:0.76rem;padding:14px">/clear  # limpia contexto
/init   # genera CLAUDE.md
/model  # cambia modelo
/cost   # coste de sesi&oacute;n
/undo   # revierte cambio</div>
                </div>
            </div>
        </div>`;
}

function cvWidgetWebVsCode() {
    return cvSelectable([
        {
            icon: '&#128172;', title: 'Claude Web', tag: 'Para pensar',
            tagStyle: 'background:var(--purple-dim);color:var(--purple)',
            detail: '<strong>Claude Web es para pensar.</strong> Intercambias ideas, texto y documentos en un chat. Genera contenido que t&uacute; despu&eacute;s copias, ajustas y aplicas. Es tu sitio para explorar, analizar y redactar. No toca nada de tu ordenador: todo se queda en la conversaci&oacute;n.'
        },
        {
            icon: '&#128187;', title: 'Claude Code', tag: 'Para ejecutar',
            tagStyle: 'background:rgba(93,180,245,.1);color:var(--blue)',
            detail: '<strong>Claude Code es para ejecutar.</strong> Le das un objetivo y act&uacute;a: lee y escribe archivos reales de tu carpeta, ejecuta scripts y automatiza procesos completos de varios pasos. Ideal para tareas repetitivas o que tocan muchos archivos. T&uacute; supervisas y confirmas.'
        }
    ]);
}

function cvWidgetCraft() {
    const L = (l, c) => `<span style="color:${c};font-weight:800;font-size:1.6rem">${l}</span>`;
    return cvSelectable([
        {
            icon: L('C', 'var(--purple)'), title: 'Contexto',
            detail: '<strong>C &mdash; Contexto.</strong> Qui&eacute;n eres y en qu&eacute; situaci&oacute;n est&aacute;s. <em>Ej: &ldquo;Soy HRBP de una capability de S&amp;PE con 380 personas; preparo el briefing mensual para el MD.&rdquo;</em> Sin contexto, Claude responde gen&eacute;rico.'
        },
        {
            icon: L('R', 'var(--brand-2)'), title: 'Rol',
            detail: '<strong>R &mdash; Rol.</strong> El papel que quieres que Claude adopte. <em>Ej: &ldquo;Act&uacute;a como un Chief People Officer experimentado.&rdquo;</em> Asignar un rol eleva el nivel y el enfoque de la respuesta.'
        },
        {
            icon: L('A', 'var(--brand-3)'), title: 'Acci&oacute;n',
            detail: '<strong>A &mdash; Acci&oacute;n.</strong> Qu&eacute; quieres que haga exactamente, con verbos claros. <em>Ej: &ldquo;Identifica las 3 prioridades, construye la narrativa y prop&oacute;n acciones a 90 d&iacute;as.&rdquo;</em>'
        },
        {
            icon: L('F', 'var(--blue)'), title: 'Formato',
            detail: '<strong>F &mdash; Formato.</strong> C&oacute;mo quieres recibir la respuesta. <em>Ej: &ldquo;Briefing de una p&aacute;gina, con tabla de m&eacute;tricas y secci&oacute;n de pr&oacute;ximos pasos. M&aacute;ximo 300 palabras.&rdquo;</em>'
        },
        {
            icon: L('T', 'var(--green)'), title: 'Tono',
            detail: '<strong>T &mdash; Tono.</strong> El registro adecuado para tu audiencia. <em>Ej: &ldquo;Ejecutivo y directo, sin jerga de RRHH, pensado para un MD.&rdquo;</em>'
        }
    ], 5);
}

function cvWidgetAgents() {
    return cvSelectable([
        {
            icon: '&#129302;', title: 'Asistente', tag: 'Claude Web',
            tagStyle: 'background:var(--purple-dim);color:var(--purple)',
            detail: '<strong>Un asistente genera output que t&uacute; aplicas.</strong> Le pides algo, te responde, y t&uacute; copias, pegas y ajustas. Trabaja de un paso en un paso, bajo tu direcci&oacute;n constante. Ideal para explorar ideas, redactar borradores o resolver dudas puntuales. Es como tener a Claude web a tu lado.'
        },
        {
            icon: '&#129504;', title: 'Agente', tag: 'Claude Code',
            tagStyle: 'background:rgba(93,180,245,.1);color:var(--blue)',
            detail: '<strong>Un agente recibe un objetivo y lo persigue.</strong> Planifica los pasos, lee y escribe archivos reales, ejecuta y va iterando hasta completar la tarea &mdash; mientras t&uacute; supervisas. &Uacute;salo cuando la tarea tiene varios pasos encadenados o quieres automatizar algo recurrente. Es Claude Code trabajando para ti.'
        }
    ]);
}

function cvWidgetGlossary() {
    const terms = [
        { t:'LLM', d:'Modelo de lenguaje grande: la tecnolog&iacute;a detr&aacute;s de Claude' },
        { t:'Prompt', d:'Mensaje o instrucci&oacute;n que escribes a Claude' },
        { t:'Token', d:'Unidad m&iacute;nima de texto (1 token &asymp; 4 caracteres &asymp; 0,75 palabras)' },
        { t:'Ventana de contexto', d:'Todo lo que Claude &ldquo;ve&rdquo; en una sesi&oacute;n; al cerrarla se borra' },
        { t:'Iterar', d:'Refinar la respuesta en la misma conversaci&oacute;n, sin empezar de cero' },
        { t:'Alucinaci&oacute;n', d:'Info incorrecta generada con aparente confianza &mdash; verifica siempre' },
        { t:'Modelo', d:'Versi&oacute;n de Claude: Opus (potente), Sonnet (equilibrado), Haiku (r&aacute;pido)' },
        { t:'Claude web', d:'La versi&oacute;n de chat en el navegador (claude.ai)' },
        { t:'Claude Code', d:'Claude en la terminal: lee y escribe archivos reales' },
        { t:'Asistente vs Agente', d:'Asistente genera y t&uacute; aplicas; agente ejecuta y t&uacute; supervisas' },
        { t:'CLAUDE.md', d:'Archivo de instrucciones permanentes que Claude lee al arrancar' },
        { t:'Proyecto', d:'Espacio en Claude con contexto y documentos persistentes' },
        { t:'Skill', d:'Comando (/nombre) con un flujo de trabajo ya incorporado' },
        { t:'Prompt chaining', d:'Encadenar prompts: la salida de uno es la entrada del siguiente' },
        { t:'Anonimizar', d:'Sustituir datos personales por IDs o categor&iacute;as antes de pegar' },
        { t:'MCP', d:'Protocolo para conectar Claude con herramientas externas' },
        { t:'SSO', d:'Autenticaci&oacute;n &uacute;nica con tu email @accenture.com' },
        { t:'Enterprise', d:'La licencia corporativa de Accenture: no entrena el modelo con tus datos' }
    ];
    return `
        <div class="cv-info-grid" style="margin-top:20px">
            ${terms.map(t => `
                <div style="display:flex;gap:10px;padding:10px 14px;background:var(--bg-alt);border-radius:var(--radius-sm);border:1px solid var(--border)">
                    <strong style="color:var(--purple);font-size:0.82rem;flex:0 0 96px;line-height:1.3">${t.t}</strong>
                    <span style="font-size:0.82rem;color:var(--text-light)">${t.d}</span>
                </div>`).join('')}
        </div>`;
}

// ===== THEME (claro / oscuro / sistema) =====
const THEME_KEY = 'hrThemePref';

function getThemePref() {
    try { return localStorage.getItem(THEME_KEY) || 'system'; } catch (e) { return 'system'; }
}

function resolveTheme(pref) {
    if (pref === 'system') {
        return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    }
    return pref;
}

function applyThemePref(pref) {
    document.documentElement.setAttribute('data-theme', resolveTheme(pref));
    document.querySelectorAll('.theme-opt').forEach(b => {
        const active = b.dataset.themeChoice === pref;
        b.classList.toggle('active', active);
        b.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
}

function setThemePref(pref) {
    try { localStorage.setItem(THEME_KEY, pref); } catch (e) {}
    applyThemePref(pref);
}

document.querySelectorAll('.theme-opt').forEach(b => {
    b.addEventListener('click', () => setThemePref(b.dataset.themeChoice));
});

if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (getThemePref() === 'system') applyThemePref('system');
    });
}

applyThemePref(getThemePref());

// ===== GLOBAL SEARCH (Ctrl/Cmd + K) =====
let _searchIndex = null;
function buildSearchIndex() {
    var idx = [];
    LEARNING_PATH.forEach(function (c) {
        idx.push({
            type: 'Capítulo', action: 'chapter', id: c.id,
            label: String(c.id).padStart(2, '0') + ' · ' + c.title,
            sub: c.subtitle,
            hay: (c.title + ' ' + c.subtitle + ' ' + (c.topics || []).join(' ') + ' ' + (CHAPTER_CHIPS[c.id] || []).join(' ')).toLowerCase()
        });
    });
    if (typeof PROMPTS !== 'undefined') PROMPTS.forEach(function (p) {
        idx.push({
            type: 'Prompt', action: 'prompt', id: p.id,
            label: p.title, sub: p.desc || p.cat,
            hay: (p.title + ' ' + (p.desc || '') + ' ' + (p.cat || '') + ' ' + (p.text || '')).toLowerCase()
        });
    });
    if (typeof EXERCISES !== 'undefined') EXERCISES.forEach(function (e) {
        idx.push({
            type: 'Ejercicio', action: 'exercise', id: e.id,
            label: e.title, sub: e.desc,
            hay: (e.title + ' ' + (e.desc || '')).toLowerCase()
        });
    });
    if (typeof CATALOG !== 'undefined') CATALOG.forEach(function (c) {
        idx.push({
            type: 'Avanzado', action: 'catalog', id: c.id,
            label: c.name,
            sub: (window.CATALOG_CAT_LABELS && window.CATALOG_CAT_LABELS[c.cat]) || 'Catálogo avanzado',
            hay: (c.name + ' ' + (c.gets || '') + ' ' + (c.when || '') + ' ' + (c.prompt || '')).toLowerCase()
        });
    });
    return idx;
}

function openSearch() {
    if (!_searchIndex) _searchIndex = buildSearchIndex();
    var ov = document.getElementById('search-overlay');
    if (!ov) return;
    ov.classList.add('active');
    document.body.style.overflow = 'hidden';
    var input = document.getElementById('search-input');
    input.value = '';
    runSearch('');
    setTimeout(function () { input.focus(); }, 30);
}
function closeSearch() {
    var ov = document.getElementById('search-overlay');
    if (ov) ov.classList.remove('active');
    if (!document.getElementById('modal-overlay').classList.contains('active')) document.body.style.overflow = '';
}
function runSearch(q) {
    q = (q || '').trim().toLowerCase();
    var results = document.getElementById('search-results');
    if (!results) return;
    if (q.length < 2) {
        results.innerHTML = '<div class="search-hint">Escribe para buscar en capítulos, prompts y ejercicios…</div>';
        return;
    }
    if (!_searchIndex) _searchIndex = buildSearchIndex();
    var matches = _searchIndex.filter(function (it) { return it.hay.indexOf(q) !== -1; }).slice(0, 24);
    if (!matches.length) {
        results.innerHTML = '<div class="search-hint">Sin resultados para &ldquo;' + escapeHtml(q) + '&rdquo;.</div>';
        return;
    }
    results.innerHTML = matches.map(function (m) {
        var idArg = (m.action === 'prompt' || m.action === 'catalog') ? "'" + m.id + "'" : m.id;
        return '<button class="search-result" type="button" onclick="searchGo(\'' + m.action + '\',' + idArg + ')">' +
            '<span class="sr-type sr-' + m.action + '">' + m.type + '</span>' +
            '<span class="sr-main"><span class="sr-label">' + escapeHtml(m.label) + '</span>' +
            '<span class="sr-sub">' + escapeHtml(m.sub || '') + '</span></span>' +
            '<span class="sr-arrow" aria-hidden="true">&#8594;</span></button>';
    }).join('');
}
function searchGo(action, id) {
    closeSearch();
    if (action === 'chapter') openChapter(id);
    else if (action === 'exercise') openExercise(id);
    else if (action === 'prompt') goToPrompt(id);
    else if (action === 'catalog') goToCatalog(id);
}
function goToCatalog(id) {
    if (typeof window.openCatalogTab === 'function') window.openCatalogTab();
    var sec = document.getElementById('avanzado');
    if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(function () {
        var card = document.querySelector('.cat-card[data-id="' + id + '"]');
        if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.classList.add('flash');
            setTimeout(function () { card.classList.remove('flash'); }, 1600);
        }
    }, 460);
}
function goToPrompt(id) {
    renderPrompts('all');
    var sec = document.getElementById('prompts');
    if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(function () {
        var card = document.querySelector('.prompt-card[data-prompt-id="' + id + '"]');
        if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.classList.add('flash');
            setTimeout(function () { card.classList.remove('flash'); }, 1600);
        }
    }, 360);
}

(function wireSearch() {
    var trigger = document.getElementById('search-trigger');
    if (trigger) trigger.addEventListener('click', openSearch);
    var input = document.getElementById('search-input');
    if (input) input.addEventListener('input', function () { runSearch(input.value); });
    var ov = document.getElementById('search-overlay');
    if (ov) ov.addEventListener('click', function (e) { if (e.target === ov) closeSearch(); });
    document.addEventListener('keydown', function (e) {
        if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
            e.preventDefault();
            var open = document.getElementById('search-overlay').classList.contains('active');
            open ? closeSearch() : openSearch();
        } else if (e.key === 'Escape' && document.getElementById('search-overlay').classList.contains('active')) {
            closeSearch();
        }
    });
})();

// ===== ONBOARDING (mini-tour en la primera visita) =====
var ONBOARD_KEY = 'hrOnboarded';
var ONBOARD_STEPS = [
    { icon: '&#128640;', title: 'Bienvenido/a al portal de Claude para HR', text: 'Tu itinerario formativo, 152 prompts listos y herramientas para dominar Claude como HRBP de S&amp;PE. Te lo enseñamos en 20 segundos.' },
    { icon: '&#129518;', title: 'Itinerario con progreso real', text: 'Son 11 capítulos conectados. Marca los que completes y verás tu avance reflejado en la ruta. Haz clic en cualquier tarjeta para ver su temario.' },
    { icon: '&#128269;', title: 'Busca cualquier cosa al instante', text: 'Pulsa <kbd>Ctrl</kbd> + <kbd>K</kbd> en cualquier momento para buscar en capítulos, prompts y ejercicios.' },
    { icon: '&#127912;', title: 'A tu manera', text: 'Cambia entre tema claro y oscuro arriba a la derecha, y usa el <strong>Generador</strong> para crear prompts a tu medida. ¡Listo!' }
];
var _obStep = 0;
function maybeShowOnboarding() {
    var seen; try { seen = localStorage.getItem(ONBOARD_KEY); } catch (e) {}
    if (!seen) showOnboarding();
}
function showOnboarding() {
    _obStep = 0;
    var ov = document.getElementById('onboard-overlay');
    if (!ov) {
        ov = document.createElement('div');
        ov.className = 'onboard-overlay';
        ov.id = 'onboard-overlay';
        ov.innerHTML =
            '<div class="onboard-card" role="dialog" aria-modal="true" aria-label="Bienvenida">' +
            '<button class="onboard-skip" type="button" onclick="closeOnboarding()">Saltar</button>' +
            '<div class="onboard-body" id="onboard-body"></div>' +
            '<div class="onboard-foot"><div class="onboard-dots" id="onboard-dots"></div>' +
            '<button class="btn btn-primary onboard-next" id="onboard-next" type="button" onclick="onboardNext()"></button></div>' +
            '</div>';
        document.body.appendChild(ov);
        ov.addEventListener('click', function (e) { if (e.target === ov) closeOnboarding(); });
    }
    document.body.style.overflow = 'hidden';
    renderOnboardStep();
    requestAnimationFrame(function () { ov.classList.add('active'); });
}
function renderOnboardStep() {
    var s = ONBOARD_STEPS[_obStep];
    var body = document.getElementById('onboard-body');
    if (body) body.innerHTML = '<div class="onboard-icon">' + s.icon + '</div><h3>' + s.title + '</h3><p>' + s.text + '</p>';
    var dots = document.getElementById('onboard-dots');
    if (dots) dots.innerHTML = ONBOARD_STEPS.map(function (_, i) { return '<span class="ob-dot' + (i === _obStep ? ' active' : '') + '"></span>'; }).join('');
    var next = document.getElementById('onboard-next');
    if (next) next.innerHTML = _obStep === ONBOARD_STEPS.length - 1 ? 'Empezar &#8594;' : 'Siguiente';
}
function onboardNext() {
    if (_obStep < ONBOARD_STEPS.length - 1) { _obStep++; renderOnboardStep(); }
    else closeOnboarding();
}
function closeOnboarding() {
    try { localStorage.setItem(ONBOARD_KEY, '1'); } catch (e) {}
    var ov = document.getElementById('onboard-overlay');
    if (ov) { ov.classList.remove('active'); setTimeout(function () { if (ov.parentNode) ov.parentNode.removeChild(ov); }, 250); }
    if (!document.getElementById('modal-overlay').classList.contains('active')) document.body.style.overflow = '';
}

// ===== SCROLL REVEAL (animaciones de entrada) =====
var _revealIO = null;
function observeReveals() {
    if (!window.IntersectionObserver) return;
    if (!_revealIO) {
        _revealIO = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (en.isIntersecting) {
                    en.target.classList.add('reveal-in');
                    _revealIO.unobserve(en.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
    }
    document.querySelectorAll('.section-header, .journey-stop, .tip-card, .exercise-card').forEach(function (el) {
        if (!el.classList.contains('reveal')) {
            el.classList.add('reveal');
            _revealIO.observe(el);
        }
    });
}

// ===== INIT =====
setupViews();          // reparte las secciones en 3 áreas y muestra la inicial
renderLearningPath();
refreshProgressUI();   // paint completion state (node checks, rocket, hero progress)
renderFilters();
renderPrompts();
renderExercises();
renderComparador();
observeReveals();
maybeShowOnboarding();

// Toggle de vista del itinerario (Linea de tiempo / Mapa)
document.querySelectorAll('.ivt-btn').forEach(function (b) {
    b.addEventListener('click', function () { setItinView(b.dataset.view); });
});
(function () {
    var saved; try { saved = localStorage.getItem('hrItinView'); } catch (e) {}
    if (saved === 'map') setItinView('map');
})();

// Itinerary background particles — seeded now that the journey is laid out,
// so the field fills the full section height. Calmer "starfield" vs the hero.
if (window.initParticles) {
    initParticles(document.getElementById('itinerary-particles'), {
        count: 90,
        connect: false,        // pure starfield (no link lines) — much cheaper
        interactive: false,    // no mouse repel/links over the reading area
        resScale: 0.6,         // render the tall buffer at 60% then upscale
        alphaBase: 0.18,
        alphaRange: 0.5,
        speed: 0.65
    });
}

// Prompt sorting & view-mode controls
const _sortSel = document.getElementById('prompt-sort');
if (_sortSel) _sortSel.addEventListener('change', () => { currentSort = _sortSel.value; renderPrompts(); });
document.querySelectorAll('.view-btn').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.view-btn').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    currentView = b.dataset.view;
    renderPrompts();
}));
