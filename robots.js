// HR Robot Mascots for S&PE — Claude Portal
// Head-only cute robots with unique personalities

const ROBOT_HEADS = {
    welcome: {
        badge: 'S&PE', accent: '#5df5a0',
        shape: 'round', ears: 'antenna', eyes: 'big', mouth: 'smile', hat: null, extra: 'wave'
    },
    teacher: {
        badge: 'S&PE', accent: '#5df5a0',
        shape: 'round', ears: 'bolts', eyes: 'big', mouth: 'smile', hat: 'graduation', extra: null
    },
    analyst: {
        badge: 'HR', accent: '#5db4f5',
        shape: 'square', ears: 'discs', eyes: 'glasses', mouth: 'neutral', hat: null, extra: 'chart'
    },
    security: {
        badge: 'HR', accent: '#ffb400',
        shape: 'hex', ears: 'antenna', eyes: 'visor', mouth: 'serious', hat: 'shield', extra: null
    },
    coder: {
        badge: 'S&PE', accent: '#5df5a0',
        shape: 'square', ears: 'antenna', eyes: 'glasses', mouth: 'grin', hat: 'headphones', extra: 'code'
    },
    coach: {
        badge: 'HR', accent: '#5db4f5',
        shape: 'round', ears: 'small', eyes: 'happy', mouth: 'open', hat: null, extra: 'heart'
    },
    strategist: {
        badge: 'HR', accent: '#C966FF',
        shape: 'tall', ears: 'bolts', eyes: 'wink', mouth: 'smile', hat: 'crown', extra: null
    },
    data: {
        badge: 'S&PE', accent: '#5df5a0',
        shape: 'wide', ears: 'discs', eyes: 'scan', mouth: 'neutral', hat: null, extra: 'bars'
    },
    spark: {
        badge: 'S&PE', accent: '#ffb400',
        shape: 'round', ears: 'lightning', eyes: 'star', mouth: 'grin', hat: null, extra: 'sparkle'
    },
    mentor: {
        badge: 'HR', accent: '#5db4f5',
        shape: 'tall', ears: 'small', eyes: 'kind', mouth: 'open', hat: 'beret', extra: null
    }
};

function robotSVG(type = 'teacher', customBadge) {
    const cfg = ROBOT_HEADS[type] || ROBOT_HEADS.teacher;
    const badge = customBadge || cfg.badge;
    const a = cfg.accent;
    const uid = type + '_' + Math.random().toString(36).slice(2, 6);

    let head = '', earL = '', earR = '', eyesHTML = '', mouthHTML = '', hatHTML = '', extraHTML = '';
    const cx = 60, cy = 58;

    // --- HEAD SHAPES ---
    switch (cfg.shape) {
        case 'round':
            head = `<rect x="22" y="30" width="76" height="60" rx="28" fill="url(#rH${uid})"/>
                    <rect x="28" y="36" width="64" height="48" rx="20" fill="#e8d5ff" opacity=".18"/>`;
            break;
        case 'square':
            head = `<rect x="22" y="30" width="76" height="62" rx="14" fill="url(#rH${uid})"/>
                    <rect x="28" y="36" width="64" height="50" rx="10" fill="#e8d5ff" opacity=".18"/>`;
            break;
        case 'hex':
            head = `<path d="M60 28 L96 42 L96 72 L60 92 L24 72 L24 42 Z" fill="url(#rH${uid})"/>
                    <path d="M60 34 L90 46 L90 68 L60 84 L30 68 L30 46 Z" fill="#e8d5ff" opacity=".15"/>`;
            break;
        case 'tall':
            head = `<rect x="26" y="26" width="68" height="68" rx="22" fill="url(#rH${uid})"/>
                    <rect x="32" y="32" width="56" height="56" rx="16" fill="#e8d5ff" opacity=".18"/>`;
            break;
        case 'wide':
            head = `<rect x="16" y="34" width="88" height="54" rx="24" fill="url(#rH${uid})"/>
                    <rect x="22" y="40" width="76" height="42" rx="18" fill="#e8d5ff" opacity=".18"/>`;
            break;
    }

    // --- EARS / SIDE ELEMENTS ---
    switch (cfg.ears) {
        case 'antenna':
            earL = `<line x1="44" y1="18" x2="44" y2="32" stroke="#A100FF" stroke-width="2.5" stroke-linecap="round"/>
                    <circle cx="44" cy="14" r="5" fill="${a}" filter="url(#rG${uid})">
                        <animate attributeName="opacity" values="1;.3;1" dur="2.5s" repeatCount="indefinite"/></circle>`;
            earR = `<line x1="76" y1="18" x2="76" y2="32" stroke="#A100FF" stroke-width="2.5" stroke-linecap="round"/>
                    <circle cx="76" cy="14" r="4" fill="${a}" filter="url(#rG${uid})">
                        <animate attributeName="opacity" values=".3;1;.3" dur="2.5s" repeatCount="indefinite"/></circle>`;
            break;
        case 'bolts':
            earL = `<circle cx="18" cy="58" r="8" fill="#8800DD" stroke="#A100FF" stroke-width="2"/>
                    <circle cx="18" cy="58" r="3" fill="${a}"/>`;
            earR = `<circle cx="102" cy="58" r="8" fill="#8800DD" stroke="#A100FF" stroke-width="2"/>
                    <circle cx="102" cy="58" r="3" fill="${a}"/>`;
            break;
        case 'discs':
            earL = `<rect x="10" y="48" width="12" height="20" rx="6" fill="#8800DD"/>`;
            earR = `<rect x="98" y="48" width="12" height="20" rx="6" fill="#8800DD"/>`;
            break;
        case 'small':
            earL = `<circle cx="22" cy="55" r="5" fill="#8800DD"/>`;
            earR = `<circle cx="98" cy="55" r="5" fill="#8800DD"/>`;
            break;
        case 'lightning':
            earL = `<path d="M40 12 L36 22 L42 22 L38 32" fill="none" stroke="${a}" stroke-width="2.5" stroke-linecap="round"/>`;
            earR = `<path d="M80 12 L84 22 L78 22 L82 32" fill="none" stroke="${a}" stroke-width="2.5" stroke-linecap="round"/>`;
            break;
    }

    // --- EYES ---
    switch (cfg.eyes) {
        case 'big':
            eyesHTML = `<circle cx="46" cy="56" r="10" fill="#fff"/><circle cx="74" cy="56" r="10" fill="#fff"/>
                <circle cx="48" cy="56" r="5" fill="#1a1228"><animate attributeName="cx" values="48;50;48" dur="4s" repeatCount="indefinite"/></circle>
                <circle cx="76" cy="56" r="5" fill="#1a1228"><animate attributeName="cx" values="76;78;76" dur="4s" repeatCount="indefinite"/></circle>
                <circle cx="49.5" cy="53.5" r="2" fill="#fff"/><circle cx="77.5" cy="53.5" r="2" fill="#fff"/>`;
            break;
        case 'glasses':
            eyesHTML = `<rect x="34" y="48" width="22" height="18" rx="5" fill="none" stroke="#fff" stroke-width="2.5"/>
                <rect x="64" y="48" width="22" height="18" rx="5" fill="none" stroke="#fff" stroke-width="2.5"/>
                <line x1="56" y1="57" x2="64" y2="57" stroke="#fff" stroke-width="2"/>
                <circle cx="45" cy="57" r="4" fill="#1a1228"/><circle cx="75" cy="57" r="4" fill="#1a1228"/>
                <circle cx="46.5" cy="55" r="1.5" fill="#fff"/><circle cx="76.5" cy="55" r="1.5" fill="#fff"/>`;
            break;
        case 'visor':
            eyesHTML = `<rect x="32" y="50" width="56" height="14" rx="7" fill="rgba(0,0,0,.3)" stroke="${a}" stroke-width="1.5"/>
                <circle cx="46" cy="57" r="3.5" fill="${a}"><animate attributeName="opacity" values="1;.5;1" dur="1.5s" repeatCount="indefinite"/></circle>
                <circle cx="74" cy="57" r="3.5" fill="${a}"><animate attributeName="opacity" values=".5;1;.5" dur="1.5s" repeatCount="indefinite"/></circle>
                <line x1="54" y1="57" x2="66" y2="57" stroke="${a}" stroke-width="1" opacity=".5"/>`;
            break;
        case 'happy':
            eyesHTML = `<path d="M38 54 Q45 48 52 54" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>
                <path d="M68 54 Q75 48 82 54" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>`;
            break;
        case 'wink':
            eyesHTML = `<circle cx="46" cy="56" r="9" fill="#fff"/>
                <circle cx="48" cy="56" r="4.5" fill="#1a1228"/>
                <circle cx="49.5" cy="54" r="1.5" fill="#fff"/>
                <path d="M68 56 Q75 50 82 56" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>`;
            break;
        case 'scan':
            eyesHTML = `<rect x="36" y="50" width="16" height="14" rx="3" fill="#0a0a12"/>
                <rect x="68" y="50" width="16" height="14" rx="3" fill="#0a0a12"/>
                <rect x="39" y="55" width="10" height="2" rx="1" fill="${a}"><animate attributeName="y" values="53;59;53" dur="2s" repeatCount="indefinite"/></rect>
                <rect x="71" y="55" width="10" height="2" rx="1" fill="${a}"><animate attributeName="y" values="59;53;59" dur="2s" repeatCount="indefinite"/></rect>`;
            break;
        case 'star':
            eyesHTML = `<text x="46" y="60" text-anchor="middle" font-size="14" fill="#fff">★</text>
                <text x="74" y="60" text-anchor="middle" font-size="14" fill="#fff">★</text>`;
            break;
        case 'kind':
            eyesHTML = `<circle cx="46" cy="55" r="8" fill="#fff"/><circle cx="74" cy="55" r="8" fill="#fff"/>
                <circle cx="47" cy="55" r="4" fill="#1a1228"/>
                <circle cx="75" cy="55" r="4" fill="#1a1228"/>
                <circle cx="48.5" cy="53" r="1.5" fill="#fff"/><circle cx="76.5" cy="53" r="1.5" fill="#fff"/>
                <path d="M38 50 Q42 47 46 50" stroke="#e8d5ff" stroke-width="1.5" fill="none"/>
                <path d="M74 50 Q78 47 82 50" stroke="#e8d5ff" stroke-width="1.5" fill="none"/>`;
            break;
    }

    // --- MOUTH ---
    switch (cfg.mouth) {
        case 'smile':
            mouthHTML = `<path d="M48 72 Q60 80 72 72" stroke="#fff" fill="none" stroke-width="2" stroke-linecap="round" opacity=".8"/>`;
            break;
        case 'grin':
            mouthHTML = `<path d="M46 70 Q60 82 74 70" stroke="#fff" fill="rgba(255,255,255,.15)" stroke-width="2" stroke-linecap="round"/>`;
            break;
        case 'neutral':
            mouthHTML = `<line x1="50" y1="74" x2="70" y2="74" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".6"/>`;
            break;
        case 'serious':
            mouthHTML = `<rect x="48" y="72" width="24" height="3" rx="1.5" fill="#fff" opacity=".5"/>`;
            break;
        case 'open':
            mouthHTML = `<ellipse cx="60" cy="74" rx="8" ry="5" fill="#1a1228" opacity=".5"/>
                <path d="M52 73 Q60 80 68 73" stroke="#fff" fill="none" stroke-width="1.5"/>`;
            break;
    }

    // --- HAT / TOP ---
    switch (cfg.hat) {
        case 'graduation':
            hatHTML = `<polygon points="30,28 60,14 90,28 60,36" fill="#6E54E6"/>
                <rect x="56" y="12" width="8" height="4" rx="2" fill="#5a42c0"/>
                <line x1="87" y1="28" x2="95" y2="38" stroke="#A100FF" stroke-width="1.5"/>
                <circle cx="95" cy="40" r="3" fill="${a}"><animate attributeName="opacity" values="1;.4;1" dur="2s" repeatCount="indefinite"/></circle>`;
            break;
        case 'shield':
            hatHTML = `<g transform="translate(46,6)">
                <path d="M0,8 L14,0 L28,8 L28,18 L14,26 L0,18Z" fill="${a}" opacity=".9"/>
                <text x="14" y="17" text-anchor="middle" font-size="10" font-weight="bold" fill="#fff">✓</text></g>`;
            break;
        case 'headphones':
            hatHTML = `<path d="M26 44 Q26 20 60 18 Q94 20 94 44" fill="none" stroke="#333" stroke-width="4"/>
                <rect x="18" y="38" width="12" height="18" rx="5" fill="#333"/>
                <rect x="90" y="38" width="12" height="18" rx="5" fill="#333"/>
                <rect x="20" y="40" width="8" height="14" rx="4" fill="${a}" opacity=".7"/>
                <rect x="92" y="40" width="8" height="14" rx="4" fill="${a}" opacity=".7"/>`;
            break;
        case 'crown':
            hatHTML = `<path d="M36 30 L40 18 L48 26 L60 12 L72 26 L80 18 L84 30Z" fill="${a}"/>
                <circle cx="40" cy="16" r="2" fill="#fff"/><circle cx="60" cy="10" r="2.5" fill="#fff"/>
                <circle cx="80" cy="16" r="2" fill="#fff"/>`;
            break;
        case 'beret':
            hatHTML = `<ellipse cx="58" cy="32" rx="28" ry="10" fill="#6E54E6"/>
                <circle cx="58" cy="24" r="4" fill="#5a42c0"/>`;
            break;
    }

    // --- EXTRA DECORATIONS ---
    switch (cfg.extra) {
        case 'wave':
            extraHTML = `<g transform="translate(96,36)">
                <path d="M0,12 Q6,0 12,4" stroke="${a}" stroke-width="2.5" fill="none" stroke-linecap="round">
                    <animateTransform attributeName="transform" type="rotate" values="-10,6,12;10,6,12;-10,6,12" dur="1.5s" repeatCount="indefinite"/>
                </path>
            </g>`;
            break;
        case 'chart':
            extraHTML = `<g transform="translate(90,64)" opacity=".85">
                <rect x="0" y="8" width="5" height="10" rx="1.5" fill="${a}"/>
                <rect x="7" y="3" width="5" height="15" rx="1.5" fill="${a}" opacity=".7"/>
                <rect x="14" y="6" width="5" height="12" rx="1.5" fill="${a}" opacity=".5"/>
            </g>`;
            break;
        case 'code':
            extraHTML = `<g transform="translate(92,42)" opacity=".8">
                <text font-size="10" fill="${a}" font-family="monospace">&lt;/&gt;</text>
            </g>`;
            break;
        case 'heart':
            extraHTML = `<g transform="translate(92,38)">
                <path d="M8,4 C8,0 14,0 14,4 C14,0 20,0 20,4 C20,10 14,16 14,16 C14,16 8,10 8,4Z" fill="#ff6b8a" opacity=".8">
                    <animate attributeName="opacity" values=".8;.5;.8" dur="2s" repeatCount="indefinite"/>
                </path>
            </g>`;
            break;
        case 'bars':
            extraHTML = `<g transform="translate(6,64)" opacity=".7">
                <rect x="0" y="10" width="4" height="8" rx="1" fill="${a}"/>
                <rect x="6" y="5" width="4" height="13" rx="1" fill="${a}"/>
                <rect x="12" y="8" width="4" height="10" rx="1" fill="${a}"/>
            </g>`;
            break;
        case 'sparkle':
            extraHTML = `<g>
                <circle cx="98" cy="36" r="2.5" fill="${a}"><animate attributeName="r" values="2.5;1;2.5" dur="1.5s" repeatCount="indefinite"/></circle>
                <circle cx="14" cy="42" r="2" fill="${a}"><animate attributeName="r" values="2;0.5;2" dur="2s" repeatCount="indefinite"/></circle>
                <circle cx="104" cy="60" r="1.5" fill="${a}"><animate attributeName="r" values="1.5;0.5;1.5" dur="1.8s" repeatCount="indefinite"/></circle>
            </g>`;
            break;
    }

    // --- BADGE on chin ---
    const badgeY = cfg.shape === 'hex' ? 80 : (cfg.shape === 'tall' ? 82 : 78);
    const badgeHTML = `<rect x="42" y="${badgeY}" width="36" height="14" rx="7" fill="#fff" opacity=".95"/>
        <text x="60" y="${badgeY + 10.5}" text-anchor="middle" font-size="${badge.length > 3 ? 7 : 8.5}" font-weight="800" fill="#A100FF" font-family="sans-serif">${badge}</text>`;

    // --- CHEEKS (blush) ---
    const cheeks = (cfg.eyes !== 'visor' && cfg.eyes !== 'scan')
        ? `<circle cx="34" cy="66" r="5" fill="#ff9ff3" opacity=".18"/><circle cx="86" cy="66" r="5" fill="#ff9ff3" opacity=".18"/>`
        : '';

    return `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" class="robot-svg" aria-hidden="true">
    <defs>
        <linearGradient id="rH${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#C966FF"/><stop offset="100%" stop-color="#A100FF"/></linearGradient>
        <filter id="rG${uid}"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    ${hatHTML}
    ${earL}${earR}
    ${head}
    ${eyesHTML}
    ${cheeks}
    ${mouthHTML}
    ${badgeHTML}
    ${extraHTML}
    </svg>`;
}

function chapterRobot(chapterId) {
    const map = {
        1: 'welcome', 2: 'mentor', 3: 'teacher',
        4: 'analyst', 5: 'spark', 6: 'strategist',
        7: 'data', 8: 'coder', 9: 'security',
        10: 'coach', 11: 'teacher'
    };
    return robotSVG(map[chapterId] || 'teacher');
}

// --- Abstract animated 3D-style decorations (variety beyond robots) ---
function _gid(p) { return p + Math.random().toString(36).slice(2, 6); }
function _grad(id) {
    return `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#C966FF"/><stop offset="100%" stop-color="#A100FF"/></linearGradient>`;
}

function decoGear() {
    const u = _gid('gr');
    return `<svg viewBox="0 0 100 100" class="deco-svg" aria-hidden="true"><defs>${_grad(u)}</defs>
        <ellipse cx="50" cy="92" rx="20" ry="4" fill="rgba(161,0,255,.16)"/>
        <g class="deco-spin" style="transform-origin:50px 48px">
            <circle cx="50" cy="48" r="30" fill="none" stroke="url(#${u})" stroke-width="14" stroke-dasharray="7 9.8" stroke-linecap="round"/>
        </g>
        <circle cx="50" cy="48" r="22" fill="url(#${u})"/>
        <circle cx="50" cy="48" r="9" fill="#fff" opacity=".92"/>
    </svg>`;
}

function decoBars() {
    const u = _gid('ba');
    return `<svg viewBox="0 0 100 100" class="deco-svg" aria-hidden="true"><defs>${_grad(u)}</defs>
        <ellipse cx="50" cy="92" rx="24" ry="4" fill="rgba(161,0,255,.16)"/>
        <rect x="22" y="40" width="14" height="40" rx="4" fill="url(#${u})"><animate attributeName="height" values="40;24;40" dur="2.4s" repeatCount="indefinite"/><animate attributeName="y" values="40;56;40" dur="2.4s" repeatCount="indefinite"/></rect>
        <rect x="43" y="28" width="14" height="52" rx="4" fill="url(#${u})" opacity=".85"><animate attributeName="height" values="52;36;52" dur="2s" repeatCount="indefinite"/><animate attributeName="y" values="28;44;28" dur="2s" repeatCount="indefinite"/></rect>
        <rect x="64" y="48" width="14" height="32" rx="4" fill="url(#${u})" opacity=".7"><animate attributeName="height" values="32;52;32" dur="2.6s" repeatCount="indefinite"/><animate attributeName="y" values="48;28;48" dur="2.6s" repeatCount="indefinite"/></rect>
    </svg>`;
}

function decoOrb() {
    const u = _gid('or');
    return `<svg viewBox="0 0 100 100" class="deco-svg" aria-hidden="true"><defs>${_grad(u)}</defs>
        <ellipse cx="50" cy="92" rx="20" ry="4" fill="rgba(161,0,255,.16)"/>
        <g class="deco-spin-slow" style="transform-origin:50px 48px">
            <line x1="50" y1="48" x2="22" y2="30" stroke="url(#${u})" stroke-width="2" opacity=".5"/>
            <line x1="50" y1="48" x2="80" y2="34" stroke="url(#${u})" stroke-width="2" opacity=".5"/>
            <line x1="50" y1="48" x2="68" y2="76" stroke="url(#${u})" stroke-width="2" opacity=".5"/>
            <circle cx="22" cy="30" r="6" fill="url(#${u})"/>
            <circle cx="80" cy="34" r="5" fill="#5df5a0"/>
            <circle cx="68" cy="76" r="5" fill="#C966FF"/>
        </g>
        <circle cx="50" cy="48" r="13" fill="url(#${u})"/>
        <circle cx="50" cy="48" r="6" fill="#fff" opacity=".9"><animate attributeName="r" values="6;3.5;6" dur="2s" repeatCount="indefinite"/></circle>
    </svg>`;
}

function decoTerminal() {
    return `<svg viewBox="0 0 100 100" class="deco-svg" aria-hidden="true">
        <ellipse cx="50" cy="92" rx="26" ry="4" fill="rgba(161,0,255,.16)"/>
        <rect x="16" y="24" width="68" height="52" rx="10" fill="#1a1228" stroke="#A100FF" stroke-width="2.5"/>
        <circle cx="26" cy="34" r="2.8" fill="#ff5f57"/><circle cx="35" cy="34" r="2.8" fill="#febc2e"/><circle cx="44" cy="34" r="2.8" fill="#28c840"/>
        <text x="25" y="58" font-size="15" fill="#5df5a0" font-family="monospace">&gt;_</text>
        <rect x="45" y="48" width="9" height="13" fill="#5df5a0"><animate attributeName="opacity" values="1;1;0;0" dur="1.1s" repeatCount="indefinite"/></rect>
    </svg>`;
}

function decoFlow() {
    const u = _gid('fl');
    return `<svg viewBox="0 0 100 100" class="deco-svg" aria-hidden="true"><defs>${_grad(u)}</defs>
        <ellipse cx="50" cy="92" rx="22" ry="4" fill="rgba(161,0,255,.16)"/>
        <path d="M30 32 L70 50 L34 72" fill="none" stroke="url(#${u})" stroke-width="3" opacity=".45" stroke-linecap="round"/>
        <rect x="22" y="24" width="17" height="17" rx="5" fill="url(#${u})"/>
        <rect x="62" y="42" width="17" height="17" rx="5" fill="#5df5a0"/>
        <rect x="26" y="64" width="17" height="17" rx="5" fill="#C966FF"/>
        <circle r="4.5" fill="#fff"><animateMotion dur="2.2s" repeatCount="indefinite" path="M30 32 L70 50 L34 72"/></circle>
    </svg>`;
}

function decoChat() {
    const u = _gid('ch');
    return `<svg viewBox="0 0 100 100" class="deco-svg" aria-hidden="true"><defs>${_grad(u)}</defs>
        <ellipse cx="50" cy="92" rx="22" ry="4" fill="rgba(161,0,255,.16)"/>
        <rect x="12" y="22" width="76" height="44" rx="14" fill="url(#${u})"/>
        <path d="M30 60 L23 80 L50 63 Z" fill="url(#${u})"/>
        <circle cx="34" cy="44" r="5" fill="#fff"><animate attributeName="opacity" values="1;.3;1" dur="1.2s" repeatCount="indefinite"/></circle>
        <circle cx="50" cy="44" r="5" fill="#fff"><animate attributeName="opacity" values="1;.3;1" dur="1.2s" begin="0.2s" repeatCount="indefinite"/></circle>
        <circle cx="66" cy="44" r="5" fill="#fff"><animate attributeName="opacity" values="1;.3;1" dur="1.2s" begin="0.4s" repeatCount="indefinite"/></circle>
    </svg>`;
}

// Mix of branded robots and abstract animations, one decoration per chapter card.
function cardDeco(chapterId) {
    const abstract = { 2: decoGear, 3: decoChat, 4: decoBars, 7: decoOrb, 8: decoTerminal, 10: decoFlow };
    if (abstract[chapterId]) return abstract[chapterId]();
    const robots = { 1: 'welcome', 5: 'spark', 6: 'strategist', 9: 'security', 11: 'mentor' };
    return robotSVG(robots[chapterId] || 'teacher');
}

function slideRobot(blockType) {
    const map = { concept: 'teacher', tip: 'coach', example: 'coder', exercise: 'spark', resources: 'welcome' };
    return robotSVG(map[blockType] || 'teacher');
}
