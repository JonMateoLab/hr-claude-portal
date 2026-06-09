(function () {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w, h, particles, mouse = { x: -999, y: -999 };
    const COLORS = [
        'rgba(161,0,255,',    // purple
        'rgba(110,84,230,',   // brand-2
        'rgba(184,59,214,',   // brand-3
        'rgba(93,245,160,',   // green accent
        'rgba(93,180,245,'    // blue accent
    ];
    const COUNT = 65;
    const CONNECT_DIST = 140;
    const MOUSE_DIST = 180;

    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        w = canvas.width = rect.width;
        h = canvas.height = rect.height;
    }

    function createParticle() {
        const colorBase = COLORS[Math.floor(Math.random() * COLORS.length)];
        const size = Math.random() * 2.5 + 0.8;
        return {
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.3,
            size: size,
            color: colorBase,
            alpha: Math.random() * 0.5 + 0.2,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: Math.random() * 0.02 + 0.005
        };
    }

    function init() {
        resize();
        particles = Array.from({ length: COUNT }, createParticle);
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);

        // connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECT_DIST) {
                    const opacity = (1 - dist / CONNECT_DIST) * 0.15;
                    ctx.strokeStyle = `rgba(161,0,255,${opacity})`;
                    ctx.lineWidth = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        // mouse connections
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

        // particles
        for (const p of particles) {
            p.pulse += p.pulseSpeed;
            const pulseAlpha = p.alpha + Math.sin(p.pulse) * 0.15;
            const a = Math.max(0.05, Math.min(0.8, pulseAlpha));

            // glow
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = p.color + (a * 0.15) + ')';
            ctx.fill();

            // core
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color + a + ')';
            ctx.fill();

            // move
            p.x += p.vx;
            p.y += p.vy;

            // mouse repel
            const mdx = p.x - mouse.x;
            const mdy = p.y - mouse.y;
            const md = Math.sqrt(mdx * mdx + mdy * mdy);
            if (md < MOUSE_DIST && md > 0) {
                const force = (1 - md / MOUSE_DIST) * 0.3;
                p.vx += (mdx / md) * force;
                p.vy += (mdy / md) * force;
            }

            // damping
            p.vx *= 0.99;
            p.vy *= 0.99;

            // bounds
            if (p.x < -10) p.x = w + 10;
            if (p.x > w + 10) p.x = -10;
            if (p.y < -10) p.y = h + 10;
            if (p.y > h + 10) p.y = -10;
        }

        requestAnimationFrame(draw);
    }

    canvas.parentElement.addEventListener('mousemove', function (e) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    canvas.parentElement.addEventListener('mouseleave', function () {
        mouse.x = -999;
        mouse.y = -999;
    });

    window.addEventListener('resize', function () {
        resize();
        particles.forEach(p => {
            if (p.x > w) p.x = Math.random() * w;
            if (p.y > h) p.y = Math.random() * h;
        });
    });

    init();
    draw();
})();
