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

// ===== RENDER FILTERS =====
function renderFilters() {
    const bar = document.getElementById('filter-bar');
    const cats = ['all', ...new Set(PROMPTS.map(p => p.cat))];

    bar.innerHTML = cats.map(cat => {
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
function renderPrompts(filter = 'all') {
    const grid = document.getElementById('prompts-grid');
    const filtered = filter === 'all' ? PROMPTS : PROMPTS.filter(p => p.cat === filter);

    grid.innerHTML = filtered.map(p => `
        <div class="prompt-card" data-category="${p.cat}">
            <div class="prompt-card-header">
                <span class="prompt-category">${p.cat}</span>
            </div>
            <div class="prompt-card-body">
                <h3>${p.title}</h3>
                <p class="prompt-desc">${p.desc}</p>
                <div class="prompt-text">${escapeHtml(p.text)}</div>
            </div>
            <div class="prompt-card-actions">
                <button class="btn btn-sm btn-secondary" onclick="toggleExpand(this)">Ver completo</button>
                <button class="btn btn-sm btn-copy" onclick="copyPromptText('${p.id}')">Copiar</button>
            </div>
        </div>
    `).join('');
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
function copyPromptText(id) {
    const prompt = PROMPTS.find(p => p.id === id);
    if (prompt) {
        navigator.clipboard.writeText(prompt.text).then(() => showToast());
    }
}

function copyText(text) {
    navigator.clipboard.writeText(text).then(() => showToast());
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
                        <button class="copy-code" onclick="copyText(\`${escapeTemplate(step.code)}\`)">Copiar</button>
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
});

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');
    document.body.style.overflow = '';
}

// ===== GENERATOR =====
document.getElementById('generate-btn').addEventListener('click', generatePrompt);

function generatePrompt() {
    const task = document.getElementById('gen-task').value;
    const context = document.getElementById('gen-context').value;
    const format = document.getElementById('gen-format').value;
    const tone = document.querySelector('input[name="tone"]:checked').value;

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
            base: `Eres un consultor especializado en politicas de HR y cumplimiento normativo para empresas tecnologicas.`,
            task: `Crea o revisa una politica de HR`,
            details: `La politica debe incluir:\n1. Objetivo y alcance\n2. Definiciones clave\n3. Normas y procedimientos\n4. Responsabilidades (HRBP, People Lead, empleado)\n5. Excepciones y proceso de escalacion\n6. Marco legal aplicable`
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
    let prompt = `${t.base}\n\n${t.task}.\n\n${t.details}`;
    if (context) prompt += `\n\nContexto adicional: ${context}`;
    prompt += `\n\n${toneMap[tone]}`;
    prompt += `\n\n${formatMap[format]}`;

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

window.addEventListener('scroll', () => {
    const sections = ['inicio', 'prompts', 'ejercicios', 'generador'];
    let current = '';
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= 100) current = id;
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
});

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

// ===== RENDER LEARNING PATH =====
function renderLearningPath() {
    const container = document.getElementById('learning-path');

    container.innerHTML = LEARNING_PATH.map(ch => `
        <div class="chapter-card" onclick="openChapter(${ch.id})">
            <div class="chapter-number">${ch.id}</div>
            <div class="chapter-body">
                <div class="chapter-meta">
                    <span class="chapter-difficulty diff-${ch.difficulty}">${ch.difficulty}</span>
                    <span class="chapter-duration">&#9201; ${ch.duration}</span>
                </div>
                <h3>${ch.icon} ${ch.title}</h3>
                <p class="chapter-subtitle">${ch.subtitle}</p>
                <div class="chapter-topics">
                    ${ch.topics.map(t => `<span class="chapter-topic">${t}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// ===== OPEN CHAPTER =====
function openChapter(id) {
    const ch = LEARNING_PATH.find(c => c.id === id);
    if (!ch) return;

    const modal = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content');

    const contentBlocks = ch.content.map(block => {
        if (block.type === 'concept') {
            return `
                <div class="chapter-content-block concept-block">
                    <span class="block-type-label">Concepto</span>
                    <h4>${block.title}</h4>
                    <p>${block.text}</p>
                </div>`;
        } else if (block.type === 'tip') {
            return `
                <div class="chapter-content-block tip-block">
                    <span class="block-type-label">Tip</span>
                    <p>${block.text}</p>
                </div>`;
        } else if (block.type === 'example') {
            return `
                <div class="chapter-content-block example-block">
                    <span class="block-type-label">Ejemplo practico</span>
                    <h4>${block.title}</h4>
                    <p>${block.explanation}</p>
                    <div class="code-block" style="margin-top:12px">
                        <button class="copy-code" onclick="copyText(\`${escapeTemplate(block.prompt)}\`)">Copiar</button>
                        ${escapeHtml(block.prompt)}
                    </div>
                </div>`;
        } else if (block.type === 'exercise') {
            return `
                <div class="chapter-content-block exercise-block">
                    <span class="block-type-label">Ejercicio</span>
                    <h4>${block.title}</h4>
                    <p>${block.instructions}</p>
                </div>`;
        }
        return '';
    }).join('');

    const resourcesHtml = ch.resources.length ? `
        <div class="chapter-resources">
            <h3>Recursos recomendados</h3>
            <div class="resource-list">
                ${ch.resources.map(r => `
                    <a href="${r.url}" target="_blank" rel="noopener" class="resource-item">
                        <span class="resource-type rtype-${r.type}">${r.type}</span>
                        <div class="resource-info">
                            <div class="resource-name">${r.name}</div>
                            <div class="resource-desc">${r.desc}</div>
                        </div>
                        ${r.free ? '<span class="resource-free">GRATIS</span>' : ''}
                    </a>
                `).join('')}
            </div>
        </div>
    ` : '';

    const relatedHtml = ch.relatedPrompts && ch.relatedPrompts.length ? `
        <div class="chapter-resources" style="margin-top:24px">
            <h3>Prompts relacionados de la biblioteca</h3>
            <div class="resource-list">
                ${ch.relatedPrompts.map(pid => {
                    const p = PROMPTS.find(pr => pr.id === pid);
                    if (!p) return '';
                    return `
                        <div class="resource-item" style="cursor:pointer" onclick="copyPromptText('${p.id}'); event.preventDefault();">
                            <span class="resource-type rtype-guia">${p.cat.split(' ')[0]}</span>
                            <div class="resource-info">
                                <div class="resource-name">${p.title}</div>
                                <div class="resource-desc">${p.desc}</div>
                            </div>
                            <span style="font-size:0.75rem;color:var(--purple);font-weight:600">COPIAR</span>
                        </div>`;
                }).join('')}
            </div>
        </div>
    ` : '';

    content.innerHTML = `
        <h2>${ch.icon} Capitulo ${ch.id}: ${ch.title}</h2>
        <div class="chapter-meta" style="margin:12px 0 20px">
            <span class="chapter-difficulty diff-${ch.difficulty}">${ch.difficulty}</span>
            <span class="chapter-duration">&#9201; ${ch.duration}</span>
        </div>
        <div class="chapter-detail-intro">${ch.intro}</div>
        ${contentBlocks}
        ${resourcesHtml}
        ${relatedHtml}
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ===== INIT =====
renderLearningPath();
renderFilters();
renderPrompts();
renderExercises();
