// Reusable particle field. Exposes window.initParticles(canvas, opts) and
// auto-initialises the hero and the itinerary backgrounds.
(function () {
    const DEFAULT_COLORS = [
        'rgba(161,0,255,',    // purple
        'rgba(110,84,230,',   // brand-2
        'rgba(184,59,214,',   // brand-3
        'rgba(93,245,160,',   // green accent
        'rgba(93,180,245,'    // blue accent
    ];

    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function initParticles(canvas, opts) {
        if (!canvas) return;
        opts = opts || {};
        const ctx = canvas.getContext('2d');

        const COLORS = opts.colors || DEFAULT_COLORS;
        const COUNT = opts.count != null ? opts.count : 65;
        const CONNECT_DIST = opts.connectDist != null ? opts.connectDist : 140;
        const MOUSE_DIST = opts.mouseDist != null ? opts.mouseDist : 180;
        const CONNECT = opts.connect !== false;
        const LINK_OPACITY = opts.linkOpacity != null ? opts.linkOpacity : 0.15;
        const ALPHA_BASE = opts.alphaBase != null ? opts.alphaBase : 0.2;
        const ALPHA_RANGE = opts.alphaRange != null ? opts.alphaRange : 0.5;
        const SPEED = opts.speed != null ? opts.speed : 1;
        const INTERACTIVE = opts.interactive !== false;
        const RES_SCALE = opts.resScale != null ? opts.resScale : 1;

        let w, h, particles, mouse = { x: -999, y: -999 };
        let visible = true;

        function resize() {
            const rect = canvas.parentElement.getBoundingClientRect();
            // Backing buffer can be rendered at a lower resolution than the
            // displayed size (CSS stretches it) to cut per-frame pixel work on
            // tall sections; the canvas element keeps its full CSS size.
            w = canvas.width = Math.max(1, Math.round(rect.width * RES_SCALE));
            h = canvas.height = Math.max(1, Math.round(rect.height * RES_SCALE));
        }

        function createParticle() {
            const colorBase = COLORS[Math.floor(Math.random() * COLORS.length)];
            const size = Math.random() * 2.5 + 0.8;
            return {
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.4 * SPEED,
                vy: (Math.random() - 0.5) * 0.3 * SPEED,
                size: size,
                color: colorBase,
                alpha: Math.random() * ALPHA_RANGE + ALPHA_BASE,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.02 + 0.005
            };
        }

        function init() {
            resize();
            particles = Array.from({ length: COUNT }, createParticle);
        }

        function draw() {
            // Skip all rendering while the field is scrolled out of view — the
            // loop keeps ticking cheaply and resumes when it scrolls back in.
            if (!visible) {
                if (!reduceMotion) requestAnimationFrame(draw);
                return;
            }

            ctx.clearRect(0, 0, w, h);

            if (CONNECT) {
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < CONNECT_DIST) {
                            const opacity = (1 - dist / CONNECT_DIST) * LINK_OPACITY;
                            ctx.strokeStyle = `rgba(161,0,255,${opacity})`;
                            ctx.lineWidth = 0.6;
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.stroke();
                        }
                    }
                }
            }

            if (INTERACTIVE) {
                for (const p of particles) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < MOUSE_DIST) {
                        const opacity = (1 - dist / MOUSE_DIST) * 0.3;
                        ctx.strokeStyle = `rgba(161,0,255,${opacity})`;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }

            for (const p of particles) {
                p.pulse += p.pulseSpeed;
                const pulseAlpha = p.alpha + Math.sin(p.pulse) * 0.15;
                const a = Math.max(0.05, Math.min(0.85, pulseAlpha));

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = p.color + (a * 0.15) + ')';
                ctx.fill();

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color + a + ')';
                ctx.fill();

                p.x += p.vx;
                p.y += p.vy;

                if (INTERACTIVE) {
                    const mdx = p.x - mouse.x;
                    const mdy = p.y - mouse.y;
                    const md = Math.sqrt(mdx * mdx + mdy * mdy);
                    if (md < MOUSE_DIST && md > 0) {
                        const force = (1 - md / MOUSE_DIST) * 0.3;
                        p.vx += (mdx / md) * force;
                        p.vy += (mdy / md) * force;
                    }
                }

                p.vx *= 0.99;
                p.vy *= 0.99;

                if (p.x < -10) p.x = w + 10;
                if (p.x > w + 10) p.x = -10;
                if (p.y < -10) p.y = h + 10;
                if (p.y > h + 10) p.y = -10;
            }

            if (!reduceMotion) requestAnimationFrame(draw);
        }

        if (INTERACTIVE) {
            canvas.parentElement.addEventListener('mousemove', function (e) {
                const rect = canvas.getBoundingClientRect();
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
            });
            canvas.parentElement.addEventListener('mouseleave', function () {
                mouse.x = -999;
                mouse.y = -999;
            });
        }

        window.addEventListener('resize', function () {
            resize();
            particles.forEach(p => {
                if (p.x > w) p.x = Math.random() * w;
                if (p.y > h) p.y = Math.random() * h;
            });
        });

        // Keep the canvas matched to its container even when content below it
        // grows/shrinks (e.g. the itinerary expanding a chapter's topics).
        // Pause rendering when this field isn't on screen.
        if (window.IntersectionObserver) {
            const io = new IntersectionObserver(function (entries) {
                visible = entries[0].isIntersecting;
            }, { threshold: 0 });
            io.observe(canvas);
        }

        // Keep the drawing buffer matched to the container when it grows/shrinks
        // (e.g. a chapter expanding its topics). Re-seed only on a large change.
        if (window.ResizeObserver) {
            const ro = new ResizeObserver(function () {
                const rect = canvas.parentElement.getBoundingClientRect();
                if (Math.abs(rect.height - h) > 400 || Math.abs(rect.width - w) > 100) {
                    init();
                } else if (Math.abs(rect.width - w) > 1 || Math.abs(rect.height - h) > 1) {
                    resize();
                }
            });
            ro.observe(canvas.parentElement);
        }

        init();
        draw();
    }

    window.initParticles = initParticles;

    // Hero — vivid, connected, interactive (original behaviour).
    initParticles(document.getElementById('hero-particles'), {});

    // The itinerary field is initialised from app.js *after* the journey is
    // rendered, so the section already has its full height when we seed it.
})();
