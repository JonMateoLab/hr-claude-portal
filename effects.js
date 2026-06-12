/* ============================================================================
 *  effects.js — Galería de efectos visuales en vivo (pilar "Avanzado")
 *  ---------------------------------------------------------------------------
 *  Cada tarjeta muestra un efecto funcionando + la frase exacta para pedírselo
 *  a Claude. Inspirado en la "Galería de efectos" interna de C&B Analytics,
 *  reescrito para integrarse con el tema claro/oscuro del portal y reutilizar
 *  copyText()/initParticles() ya existentes en el portal.
 *
 *  Estructura:
 *    1. FX[]  -> datos + HTML del demo de cada efecto
 *    2. runners -> funciones de animación (count-up, donut, gauge, barras...)
 *    3. render -> pinta la galería + barra de categorías
 *    4. observers -> reproduce cada efecto al entrar en pantalla + botón replay
 *    5. interacción -> tooltip, tilt, orbes parallax, scan line, partículas
 * ========================================================================== */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Etiquetas de las categorías del filtro de la galería.
    var FX_CATS = {
        all: 'Todos',
        num: 'Cifras y números',
        bars: 'Barras y proporciones',
        circ: 'Circulares y medidores',
        trend: 'Tendencias y flujos',
        kpi: 'Dashboards y KPIs',
        reveal: 'Revelado y foco',
        amb: 'Ambiente y fondo',
        inter: 'Interacción',
        cele: 'Énfasis y celebración'
    };

    // ===== 1. DATOS DE LOS EFECTOS =====
    // demo: HTML del mini-demo (usa variables CSS del portal a través de .fx-gallery).
    // ask:  frase lista para copiar ("Cómo pedírselo a Claude").
    var FX = [
        /* --- Cifras y números --- */
        {
            cat: 'num', level: 'Intermedio', name: 'Count-up de cifras',
            desc: 'El número cuenta desde 0 hasta su valor con desaceleración suave. Da sensación de dashboard en vivo y dirige la mirada a la cifra.',
            ask: 'Pon las cifras grandes con un count-up animado que cuente desde 0 hasta el valor final al entrar en cada sección. Elegante y rápido, sin parecer excesivo.',
            demo: '<div class="d-count cu" data-target="11.5" data-dec="1" data-pre="≈€" data-suf="M">≈€0M</div>'
        },
        {
            cat: 'num', level: 'Intermedio', name: 'Slot machine (rodillo)',
            desc: 'Cada dígito gira como una máquina tragaperras hasta fijar el número. Más llamativo que el count-up para una cifra estrella.',
            ask: 'Haz que la cifra estrella aparezca con un efecto rodillo tipo slot machine, donde cada dígito gira hasta fijarse en su valor.',
            demo: '<div class="d-slot" data-slot="5761"></div>'
        },
        {
            cat: 'num', level: 'Intermedio', name: 'Odómetro monetario',
            desc: 'Cuenta ascendente con formato de moneda y color de acento. Ideal para presupuestos, ahorros o inversión.',
            ask: 'Muestra el importe como un odómetro que sube hasta el total en euros, con separador de miles y color de acento.',
            demo: '<div class="d-money cu" data-target="3780000" data-thou="1" data-pre="€">€0</div>'
        },
        {
            cat: 'num', level: 'Básico', name: 'Texto shimmer',
            desc: 'Un brillo recorre el texto en bucle. Para títulos o el dato protagonista del slide.',
            ask: 'Dale al título un efecto shimmer, con un brillo que recorre el texto en bucle de forma sutil.',
            demo: '<div class="d-shimmer">+3,0%</div>'
        },
        {
            cat: 'num', level: 'Básico', name: 'Glow pulsante',
            desc: 'La cifra respira con un resplandor morado. Marca el dato más importante sin necesidad de contar.',
            ask: 'Aplica un glow pulsante al dato protagonista de ese bloque, un resplandor suave que respira.',
            demo: '<div class="d-glow on">−37%</div>'
        },
        {
            cat: 'num', level: 'Básico', name: 'Typewriter',
            desc: 'El texto se escribe letra a letra como una máquina de escribir. Para frases de apertura o conclusiones.',
            ask: 'Haz que la frase clave aparezca con efecto máquina de escribir, escribiéndose letra a letra.',
            demo: '<div class="d-type" data-type="Ciclo FY26 · Junio">&nbsp;</div>'
        },

        /* --- Barras y proporciones --- */
        {
            cat: 'bars', level: 'Básico', name: 'Barras progresivas',
            desc: 'Las barras se rellenan al entrar, con retardo escalonado entre ellas. La base para comparar magnitudes.',
            ask: 'Que las barras se rellenen progresivamente, en cascada y con un pequeño retardo entre cada una, al entrar en pantalla.',
            demo: '<div class="d-bars" data-bars><div class="d-bar-tr"><div class="d-bar-fl" data-w="78"></div></div><div class="d-bar-tr"><div class="d-bar-fl" data-w="54"></div></div><div class="d-bar-tr"><div class="d-bar-fl" data-w="31"></div></div></div>'
        },
        {
            cat: 'bars', level: 'Intermedio', name: 'Barras apiladas que crecen',
            desc: 'Segmentos que crecen desde abajo apilándose. Para la composición de un total (p. ej. fijo + variable).',
            ask: 'Usa una barra apilada que crece desde abajo mostrando la composición del total por segmentos.',
            demo: '<div class="d-stack" data-stack><div class="s1" data-h="34"></div><div class="s2" data-h="33"></div><div class="s3" data-h="33"></div></div>'
        },
        {
            cat: 'bars', level: 'Básico', name: 'Split bar proporcional',
            desc: 'Una sola barra horizontal dividida en segmentos con %. Compacta y clara para repartos.',
            ask: 'Mete una split bar proporcional: una barra dividida en segmentos con el porcentaje dentro de cada uno.',
            demo: '<div class="d-split"><div class="sp1">34%</div><div class="sp2">33%</div><div class="sp3">33%</div></div>'
        },
        {
            cat: 'bars', level: 'Intermedio', name: 'Heatmap de celdas',
            desc: 'Una rejilla de celdas que se iluminan por intensidad. Para densidad de datos: segmentos × niveles.',
            ask: 'Representa la matriz como un heatmap de celdas que se encienden por intensidad, de menos a más.',
            demo: '<div class="d-heat" data-heat></div>'
        },

        /* --- Circulares y medidores --- */
        {
            cat: 'circ', level: 'Intermedio', name: 'Donut / anillo de progreso',
            desc: 'Un anillo que se dibuja hasta el % con la cifra contando en el centro. Mejor que una barra para una sola proporción.',
            ask: 'Cambia esa barra por un donut animado: un anillo que se dibuja hasta el porcentaje, con la cifra contando en el centro.',
            demo: '<div class="d-donut" data-donut="81"><svg width="120" height="120" viewBox="0 0 120 120"><circle class="bg" cx="60" cy="60" r="54"/><circle class="fg" cx="60" cy="60" r="54"/></svg><div class="ctr cu" data-target="81" data-suf="%">0%</div></div>'
        },
        {
            cat: 'circ', level: 'Intermedio', name: 'Gauge / velocímetro',
            desc: 'Medidor semicircular tipo velocímetro. Comunica bien el nivel sobre un máximo (cobertura, riesgo).',
            ask: 'Muestra ese indicador como un gauge semicircular tipo velocímetro que se llena hasta el valor.',
            demo: '<div class="d-gauge" data-gauge="73"><svg width="150" height="90" viewBox="0 0 150 90"><path class="ga-bg" d="M10 80 A65 65 0 0 1 140 80"/><path class="ga-fg" d="M10 80 A65 65 0 0 1 140 80"/></svg><div class="ga-val cu" data-target="73" data-suf="%">0%</div></div>'
        },
        {
            cat: 'circ', level: 'Avanzado', name: 'Radial pulse',
            desc: 'Un punto que emite ondas concéntricas. Para señalar un foco, una alerta o un punto caliente.',
            ask: 'Pon un radial pulse para señalar el punto de atención: un punto que emite ondas concéntricas.',
            demo: '<div class="d-pulse"><span class="ring"></span><span class="ring"></span><span class="ring"></span><span class="core"></span></div>'
        },

        /* --- Tendencias y flujos --- */
        {
            cat: 'trend', level: 'Intermedio', name: 'Sparkline que se dibuja',
            desc: 'Una mini-línea de tendencia que se traza sola con área degradada. Para evolución temporal compacta.',
            ask: 'Añade un sparkline que se dibuje solo, con su área degradada, mostrando la tendencia del periodo.',
            demo: '<svg class="d-spark" data-spark viewBox="0 0 200 60" preserveAspectRatio="none" height="60"><path class="area" d="M0 50 L30 40 L60 45 L90 25 L120 30 L150 12 L200 18 L200 60 L0 60 Z"/><path class="line" d="M0 50 L30 40 L60 45 L90 25 L120 30 L150 12 L200 18"/></svg>'
        },
        {
            cat: 'trend', level: 'Intermedio', name: 'Línea/ruta que se traza',
            desc: 'Un trazo que se dibuja punto a punto, como una ruta en un mapa. Para procesos, flujos o journeys.',
            ask: 'Dibuja el proceso como una ruta que se traza paso a paso, con puntos en cada hito.',
            demo: '<div class="d-route" data-route><svg width="200" height="80" viewBox="0 0 200 80"><path d="M10 60 L60 60 L100 25 L150 25 L190 50"/><circle class="dot" cx="10" cy="60" r="4"/><circle class="dot" cx="100" cy="25" r="4"/><circle class="dot" cx="190" cy="50" r="4"/></svg></div>'
        },
        {
            cat: 'trend', level: 'Básico', name: 'Equalizer / waveform',
            desc: 'Barras verticales que oscilan en bucle. Decorativo, da sensación de datos en vivo o actividad.',
            ask: 'Mete un equalizer animado de fondo para dar sensación de datos en vivo y actividad.',
            demo: '<div class="d-eq"><span style="animation-delay:0s"></span><span style="animation-delay:.15s"></span><span style="animation-delay:.3s"></span><span style="animation-delay:.45s"></span><span style="animation-delay:.2s"></span><span style="animation-delay:.35s"></span><span style="animation-delay:.1s"></span></div>'
        },
        {
            cat: 'trend', level: 'Intermedio', name: 'Marquee de KPIs',
            desc: 'Una cinta de cifras que se desplaza en bucle horizontal. Para un ticker de métricas tipo bolsa.',
            ask: 'Pon una cinta tipo marquee con los KPIs desplazándose en bucle horizontal, como un ticker.',
            demo: '<div class="d-marq"><div class="track"><span class="ki"><b>≈€11,5M</b> inversión</span><span class="ki"><b>5.761</b> empleados</span><span class="ki"><b>+3,0%</b> crecimiento</span><span class="ki"><b>−37%</b> brecha</span><span class="ki"><b>≈€11,5M</b> inversión</span><span class="ki"><b>5.761</b> empleados</span><span class="ki"><b>+3,0%</b> crecimiento</span><span class="ki"><b>−37%</b> brecha</span></div></div>'
        },

        /* --- Dashboards y KPIs --- */
        {
            cat: 'kpi', level: 'Intermedio', name: 'Cards KPI premium',
            desc: 'Convierte cada métrica en un bloque ejecutivo: valor animado, variación, tendencia y semáforo de estado.',
            ask: 'Crea cards KPI premium para las métricas principales. Cada card con valor animado, variación frente al periodo anterior, mini-tendencia y semáforo de estado.',
            demo: '<div class="d-kpis"><div class="d-kpi"><span class="k-l">Attrition</span><span class="k-v cu" data-target="12.4" data-dec="1" data-suf="%">0%</span><span class="k-d down">▼ 2,1 pts</span></div><div class="d-kpi"><span class="k-l">Engagement</span><span class="k-v cu" data-target="78" data-suf="">0</span><span class="k-d up">▲ 4 pts</span></div></div>'
        },
        {
            cat: 'kpi', level: 'Básico', name: 'Semáforo de riesgo',
            desc: 'Clasifica visualmente cada elemento en bajo / medio / alto. Prioriza problemas, riesgos o desviaciones de un vistazo.',
            ask: 'Añade un sistema de semáforo para clasificar el riesgo en bajo, medio y alto, con criterio de clasificación y acción recomendada por nivel.',
            demo: '<div class="d-sema"><div class="se g"><span class="dot"></span>Bajo</div><div class="se a"><span class="dot"></span>Medio</div><div class="se r on"><span class="dot"></span>Alto</div></div>'
        },

        /* --- Revelado y foco --- */
        {
            cat: 'reveal', level: 'Intermedio', name: 'Revelado en cascada',
            desc: 'Los bloques aparecen uno a uno deslizándose. Controlas el ritmo del relato.',
            ask: 'Que los bullets o bloques aparezcan en cascada, uno a uno deslizándose, al entrar en la sección.',
            demo: '<div class="d-cascade" data-cascade><div class="ci">Diagnóstico del periodo</div><div class="ci">Insight principal</div><div class="ci">Recomendación a leadership</div></div>'
        },
        {
            cat: 'reveal', level: 'Avanzado', name: 'Modo foco (spotlight)',
            desc: 'Atenúa todo menos el bloque que explicas. Dirige la atención de la audiencia punto por punto.',
            ask: 'Añade un modo foco que atenúe todo menos el punto que voy explicando, y que avance con la barra espaciadora.',
            demo: '<div class="d-spot on" data-spot><div class="li lit">Punto en foco ahora</div><div class="li">Siguiente punto</div><div class="li">Punto posterior</div></div>'
        },
        {
            cat: 'reveal', level: 'Intermedio', name: 'Flip card',
            desc: 'Una tarjeta que gira en 3D para revelar el dato detrás. Para antes/después o pregunta-respuesta.',
            ask: 'Haz tarjetas tipo flip que giren en 3D para revelar el dato al pasar el ratón o al hacer clic.',
            demo: '<div class="d-flip" onclick="this.classList.toggle(\'on\')"><div class="d-flip-in"><div class="d-flip-f">¿Cobertura?</div><div class="d-flip-b">98%</div></div></div>'
        },

        /* --- Ambiente y fondo --- */
        {
            cat: 'amb', level: 'Avanzado', name: 'Partículas constelación',
            desc: 'Puntos conectados por líneas que flotan en el fondo. Ambiente tech, sutil por diseño.',
            ask: 'Pon partículas tipo constelación en el fondo, discretas y conectadas por líneas, para dar un ambiente tecnológico sin distraer.',
            demo: '<canvas class="d-field" data-fxparticles></canvas><span class="d-amb-label">fondo animado</span>'
        },
        {
            cat: 'amb', level: 'Intermedio', name: 'Orbes con parallax',
            desc: 'Manchas de color difuminadas que se mueven con el cursor dando profundidad.',
            ask: 'Añade orbes de color difuminados con parallax que sigan suavemente el ratón en el fondo.',
            demo: '<div class="d-orbs" data-orbs><div class="orbA"></div><div class="orbB"></div></div><span class="d-amb-label">mueve el ratón</span>'
        },
        {
            cat: 'amb', level: 'Intermedio', name: 'Scan line',
            desc: 'Una línea fina que recorre la pantalla verticalmente. El efecto escáner tecnológico.',
            ask: 'Añade una scan line: una línea fina luminosa que recorre la pantalla de arriba abajo en bucle.',
            demo: '<div class="d-scan" data-scan><div class="scanl"></div></div><span class="d-amb-label">línea escáner</span>'
        },
        {
            cat: 'amb', level: 'Básico', name: 'Grid + viñeta',
            desc: 'Rejilla técnica de fondo con máscara radial que oscurece los bordes. Da marco y foco al centro.',
            ask: 'Pon una rejilla técnica de fondo con viñeta radial, que oscurezca los bordes y dé foco al centro.',
            demo: '<div class="d-grid"></div><span class="d-amb-label">rejilla + viñeta</span>'
        },

        /* --- Interacción --- */
        {
            cat: 'inter', level: 'Avanzado', name: 'Tilt 3D al hover',
            desc: 'La tarjeta se inclina en 3D siguiendo el cursor. Sensación táctil y premium.',
            ask: 'Dale a las tarjetas un efecto tilt 3D que siga el ratón, inclinándose suavemente hacia el cursor.',
            demo: '<div class="d-tilt" data-tilt>3D Tilt</div>'
        },
        {
            cat: 'inter', level: 'Intermedio', name: 'Tooltip al hover',
            desc: 'Una etiqueta flotante con el detalle del dato al pasar el ratón. Para datos secundarios sin saturar.',
            ask: 'Añade tooltips al hover con el desglose que hay detrás de cada cifra, para no saturar la pantalla.',
            demo: '<div class="d-tip" data-tipdemo>5.761<div class="tipbox">ES ≈5.180 · PT ≈540 · AD ≈40</div></div><span class="d-amb-label">pasa el ratón</span>'
        },
        {
            cat: 'inter', level: 'Básico', name: 'Barra de progreso de sesión',
            desc: 'Una línea fina arriba que muestra cuánto llevas de la presentación o del documento.',
            ask: 'Pon una barra de progreso fina arriba que indique el avance de la sesión o del scroll.',
            demo: '<div class="d-progress" data-prog><div class="pf" data-w="62"></div></div>'
        },

        /* --- Énfasis y celebración --- */
        {
            cat: 'cele', level: 'Básico', name: 'Badge pop',
            desc: 'Un sello circular que aparece con rebote. Para hitos, sellos de logrado o conclusiones.',
            ask: 'Haz aparecer un badge circular con efecto rebote en el hito conseguido.',
            demo: '<div class="d-badge" data-badge>✓</div>'
        },
        {
            cat: 'cele', level: 'Básico', name: 'Compare antes → después',
            desc: 'Dos cajas con una flecha animada entre ellas. El patrón visual para mostrar una mejora.',
            ask: 'Muestra el antes y el después como dos cajas con una flecha animada entre ellas, destacando la mejora.',
            demo: '<div class="d-compare"><div class="box b1"><span class="n">1.322</span><span class="l">antes</span></div><span class="arr">→</span><div class="box b2"><span class="n">833</span><span class="l">después</span></div></div>'
        },
        {
            cat: 'cele', level: 'Intermedio', name: 'Confeti',
            desc: 'Partículas de color que caen. Solo para el slide de cierre o un resultado muy positivo. Con moderación.',
            ask: 'Lanza un confeti sutil en el slide de cierre o cuando se alcance un resultado muy positivo.',
            demo: '<div class="d-confetti" data-confetti></div><span class="d-amb-label">↻ para lanzar</span>'
        }
    ];

    // ===== 2. RUNNERS (animaciones) =====
    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

    function countUp(el) {
        var tg = parseFloat(el.dataset.target); if (isNaN(tg)) return;
        var dec = parseInt(el.dataset.dec || '0'), pre = el.dataset.pre || '', suf = el.dataset.suf || '', thou = el.dataset.thou === '1';
        var dur = 1200, st = performance.now();
        function fmt(v) { var s = dec > 0 ? v.toFixed(dec).replace('.', ',') : Math.round(v).toString(); if (thou) s = Math.round(v).toLocaleString('es-ES'); return pre + s + suf; }
        if (reduceMotion) { el.textContent = fmt(tg); return; }
        function step(n) { var t = Math.min((n - st) / dur, 1), e = easeOut(t); el.textContent = fmt(tg * e); if (t < 1) requestAnimationFrame(step); else el.textContent = fmt(tg); }
        requestAnimationFrame(step);
    }

    function slot(el) {
        var val = el.dataset.slot; el.innerHTML = '';
        [].forEach.call(val, function (d, i) {
            if (d < '0' || d > '9') { var s = document.createElement('span'); s.textContent = d; s.className = 'sep'; el.appendChild(s); return; }
            var col = document.createElement('div'); col.className = 'col';
            var strip = document.createElement('div'); strip.className = 'strip';
            var final = parseInt(d);
            for (var n = 0; n < 30 + final; n++) { var sp = document.createElement('span'); sp.textContent = (n % 10); strip.appendChild(sp); }
            col.appendChild(strip); el.appendChild(col);
            if (reduceMotion) { strip.style.transform = 'translateY(-' + ((29 + final)) * 52 + 'px)'; return; }
            strip.style.transform = 'translateY(0)';
            requestAnimationFrame(function () { setTimeout(function () { strip.style.transform = 'translateY(-' + ((29 + final) * 52) + 'px)'; }, 60 + i * 100); });
        });
    }

    function bars(el) { el.querySelectorAll('.d-bar-fl').forEach(function (b, i) { b.style.width = '0'; setTimeout(function () { b.style.width = b.dataset.w + '%'; }, 100 + i * 180); }); }
    function stack(el) { el.querySelectorAll('div[data-h]').forEach(function (s, i) { s.style.height = '0'; setTimeout(function () { s.style.height = s.dataset.h + '%'; }, 150 + i * 220); }); }
    function donut(el) { var fg = el.querySelector('.fg'), pct = parseFloat(el.dataset.donut), circ = 339.3; fg.style.strokeDashoffset = circ; setTimeout(function () { fg.style.strokeDashoffset = circ * (1 - pct / 100); }, 150); var c = el.querySelector('.cu'); if (c) countUp(c); }
    function gauge(el) { var fg = el.querySelector('.ga-fg'), pct = parseFloat(el.dataset.gauge), len = 204; fg.style.strokeDasharray = len; fg.style.strokeDashoffset = len; setTimeout(function () { fg.style.strokeDashoffset = len * (1 - pct / 100); }, 150); var c = el.querySelector('.cu'); if (c) countUp(c); }
    function spark(el) { el.classList.remove('on'); void el.offsetWidth; el.classList.add('on'); }
    function route(el) { el.classList.remove('on'); void el.offsetWidth; el.classList.add('on'); }
    function cascade(el) { el.classList.remove('on'); var items = el.querySelectorAll('.ci'); items.forEach(function (i) { i.style.transitionDelay = ''; }); void el.offsetWidth; items.forEach(function (it, i) { it.style.transitionDelay = (i * 0.18) + 's'; }); el.classList.add('on'); }
    function heat(el) {
        if (!el.dataset.built) { for (var i = 0; i < 24; i++) el.appendChild(document.createElement('span')); el.dataset.built = '1'; }
        var cells = el.querySelectorAll('span');
        cells.forEach(function (c, i) { c.style.background = ''; c.style.boxShadow = 'none'; setTimeout(function () { var v = Math.random(); c.style.background = 'rgba(161,0,255,' + (0.15 + v * 0.7) + ')'; if (v > 0.7) c.style.boxShadow = '0 0 8px rgba(161,0,255,0.6)'; }, i * 35); });
    }
    function typew(el) { var txt = el.dataset.type; el.textContent = ''; if (reduceMotion) { el.textContent = txt; return; } var i = 0; clearInterval(el._t); el._t = setInterval(function () { el.textContent = txt.slice(0, ++i); if (i >= txt.length) clearInterval(el._t); }, 70); }
    function badge(el) { el.classList.remove('on'); void el.offsetWidth; el.classList.add('on'); }
    function prog(el) { var f = el.querySelector('.pf'); f.style.width = '0'; setTimeout(function () { f.style.width = f.dataset.w + '%'; }, 120); }
    function kpis(el) { el.querySelectorAll('.cu').forEach(countUp); }
    function confetti(el) {
        el.innerHTML = ''; var cols = ['#A100FF', '#C966FF', '#5df5a0', '#ffb400', '#5db4f5'];
        for (var i = 0; i < 40; i++) { var c = document.createElement('i'); c.style.left = Math.random() * 100 + '%'; c.style.background = cols[i % cols.length]; c.style.animation = 'fxfall ' + (1 + Math.random() * 1.2) + 's ease-in ' + (Math.random() * 0.4) + 's forwards'; el.appendChild(c); }
    }

    // Reproduce todos los efectos contenidos en una tarjeta.
    function runCard(card) {
        card.querySelectorAll('.cu:not(.ctr):not(.ga-val):not(.k-v)').forEach(countUp);
        card.querySelectorAll('.d-kpis').forEach(kpis);
        card.querySelectorAll('[data-slot]').forEach(slot);
        card.querySelectorAll('[data-bars]').forEach(bars);
        card.querySelectorAll('[data-stack]').forEach(stack);
        card.querySelectorAll('[data-donut]').forEach(donut);
        card.querySelectorAll('[data-gauge]').forEach(gauge);
        card.querySelectorAll('[data-spark]').forEach(spark);
        card.querySelectorAll('[data-route]').forEach(route);
        card.querySelectorAll('[data-cascade]').forEach(cascade);
        card.querySelectorAll('[data-heat]').forEach(heat);
        card.querySelectorAll('[data-type]').forEach(typew);
        card.querySelectorAll('[data-badge]').forEach(badge);
        card.querySelectorAll('[data-prog]').forEach(prog);
        card.querySelectorAll('[data-confetti]').forEach(confetti);
    }

    // ===== 3. RENDER =====
    function levelSlug(l) { return (l || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }

    function render() {
        var gallery = document.getElementById('fx-gallery');
        var catbar = document.getElementById('fx-catbar');
        if (!gallery) return;

        // Barra de categorías (filtro).
        if (catbar) {
            var cats = ['all'].concat(Object.keys(FX_CATS).filter(function (k) { return k !== 'all'; }));
            catbar.innerHTML = cats.map(function (c, i) {
                return '<button class="fx-cat' + (i === 0 ? ' active' : '') + '" type="button" data-fxcat="' + c + '">' + FX_CATS[c] + '</button>';
            }).join('');
            catbar.querySelectorAll('.fx-cat').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    catbar.querySelectorAll('.fx-cat').forEach(function (b) { b.classList.remove('active'); });
                    btn.classList.add('active');
                    filterCat(btn.dataset.fxcat);
                });
            });
        }

        gallery.innerHTML = FX.map(function (fx, idx) {
            var n = String(idx + 1).padStart(2, '0');
            return '' +
                '<div class="fx" data-fx data-fxidx="' + idx + '" data-cat="' + fx.cat + '">' +
                '  <div class="fx-stage">' +
                '    <button class="fx-replay" type="button" title="Reproducir de nuevo" aria-label="Reproducir de nuevo">&#8635;</button>' +
                     fx.demo +
                '  </div>' +
                '  <div class="fx-meta">' +
                '    <div class="fx-top"><span class="fx-num">FX·' + n + '</span><span class="fx-level lvl-' + levelSlug(fx.level) + '">' + fx.level + '</span></div>' +
                '    <div class="fx-name">' + fx.name + '</div>' +
                '    <div class="fx-desc">' + fx.desc + '</div>' +
                '    <div class="fx-ask">' +
                '      <div class="fx-ask-top"><span class="fx-ask-label">Cómo pedírselo a Claude</span>' +
                '      <button class="fx-copy" type="button" data-fxcopy="' + idx + '">Copiar</button></div>' +
                '      <span class="q">' + escapeAsk(fx.ask) + '</span>' +
                '    </div>' +
                '  </div>' +
                '</div>';
        }).join('');

        // Replay por tarjeta.
        gallery.querySelectorAll('.fx-replay').forEach(function (btn) {
            btn.addEventListener('click', function (e) { e.stopPropagation(); runCard(btn.closest('.fx')); });
        });
        // Copiar la frase "Cómo pedirlo" (reutiliza copyText del portal).
        gallery.querySelectorAll('.fx-copy').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var ask = FX[parseInt(btn.dataset.fxcopy)].ask;
                if (typeof window.copyText === 'function') window.copyText(ask, btn);
                else if (navigator.clipboard) navigator.clipboard.writeText(ask);
            });
        });

        wireInteractions(gallery);
        observe(gallery);
    }

    // Escapa la frase para mostrarla como texto (sin romper el HTML).
    function escapeAsk(t) { var d = document.createElement('div'); d.textContent = t; return d.innerHTML; }

    function filterCat(cat) {
        document.querySelectorAll('#fx-gallery .fx').forEach(function (card) {
            var show = cat === 'all' || card.dataset.cat === cat;
            card.style.display = show ? '' : 'none';
        });
    }

    // ===== 4. OBSERVER (reproduce al entrar en pantalla) =====
    function observe(gallery) {
        if (!window.IntersectionObserver) { gallery.querySelectorAll('.fx').forEach(runCard); return; }
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) { if (e.isIntersecting) { runCard(e.target); io.unobserve(e.target); } });
        }, { threshold: 0.3 });
        gallery.querySelectorAll('.fx').forEach(function (c) { io.observe(c); });
    }

    // ===== 5. INTERACCIÓN (tooltip, tilt, orbes, scan, partículas) =====
    function wireInteractions(root) {
        // Tooltip
        root.querySelectorAll('[data-tipdemo]').forEach(function (el) {
            var box = el.querySelector('.tipbox');
            el.addEventListener('mouseenter', function () { box.classList.add('on'); });
            el.addEventListener('mouseleave', function () { box.classList.remove('on'); });
        });
        // Tilt 3D
        root.querySelectorAll('[data-tilt]').forEach(function (el) {
            el.addEventListener('mousemove', function (e) { var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; el.style.transform = 'rotateY(' + (x * 22) + 'deg) rotateX(' + (-y * 22) + 'deg)'; });
            el.addEventListener('mouseleave', function () { el.style.transform = 'rotateY(0) rotateX(0)'; });
        });
        // Orbes parallax
        root.querySelectorAll('[data-orbs]').forEach(function (wrap) {
            var stage = wrap.closest('.fx-stage'); var a = wrap.querySelector('.orbA'), b = wrap.querySelector('.orbB');
            stage.addEventListener('mousemove', function (e) { var r = stage.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; a.style.transform = 'translate(' + (x * 30) + 'px,' + (y * 30) + 'px)'; b.style.transform = 'translate(' + (x * -36) + 'px,' + (y * -36) + 'px)'; });
        });
        // Scan line
        root.querySelectorAll('[data-scan]').forEach(function (wrap) {
            if (reduceMotion) return;
            var l = wrap.querySelector('.scanl'); var p = 0; setInterval(function () { p = (p + 0.8) % 100; l.style.top = p + '%'; l.style.opacity = (p < 6 || p > 94) ? 0 : 0.7; }, 30);
        });
        // Partículas (reutiliza initParticles del portal si existe)
        root.querySelectorAll('[data-fxparticles]').forEach(function (cv) {
            if (window.initParticles) {
                window.initParticles(cv, { count: 22, connectDist: 70, interactive: false, alphaBase: 0.3, alphaRange: 0.5, speed: 0.8, resScale: 1, linkOpacity: 0.25 });
            }
        });
    }

    // Inyecta el keyframe del confeti (scoped a la galería con su propio nombre).
    var sty = document.createElement('style');
    sty.textContent = '@keyframes fxfall{0%{opacity:0;transform:translateY(-10px) rotate(0)}10%{opacity:1}100%{opacity:0;transform:translateY(190px) rotate(400deg)}}';
    document.head.appendChild(sty);

    // Arranque (el DOM de la sección es estático en index.html).
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
    else render();

    // Expone por si se quiere reproducir desde fuera.
    window.fxRunCard = runCard;
})();
