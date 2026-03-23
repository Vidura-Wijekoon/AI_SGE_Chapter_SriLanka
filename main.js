// =====================================================
// SHARED JAVASCRIPT ; AI SGE Sri Lanka Website
// =====================================================

// --- Navbar scroll effect ---
(function () {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
})();

// --- Mobile hamburger menu ---
(function () {
    const btn = document.getElementById('hamburger');
    const menu = document.getElementById('mobileMenu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('open');
        btn.classList.toggle('open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            menu.classList.remove('open');
            btn.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
})();

// --- Scroll reveal (IntersectionObserver) ---
(function () {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => observer.observe(el));
})();

// --- Animated counter ---
(function () {
    const targets = document.querySelectorAll('[data-target]');
    if (!targets.length) return;

    const animateCounter = (el, target) => {
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 60));
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = current;
        }, 25);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                animateCounter(e.target, parseInt(e.target.dataset.target));
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.5 });

    targets.forEach(t => observer.observe(t));
})();

// --- Contact/Subscribe form → mailto ---
(function () {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name    = (document.getElementById('c-name')?.value || '').trim();
            const email   = (document.getElementById('c-email')?.value || '').trim();
            const interest= (document.getElementById('c-interest')?.value || 'General');
            const message = (document.getElementById('c-message')?.value || '').trim();

            const subject = encodeURIComponent(`[AI SGE SL] ${interest} ; Message from ${name}`);
            const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nInterest Area: ${interest}\n\n${message}`);
            window.location.href = `mailto:info@aisgechaptersrilanka.org?subject=${subject}&body=${body}`;
        });
    }

    const subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name     = (document.getElementById('s-name')?.value || '').trim();
            const email    = (document.getElementById('s-email')?.value || '').trim();
            const interest = (document.getElementById('s-interest')?.value || 'General');

            const subject = encodeURIComponent(`[AI SGE SL] Subscription Request ; ${name}`);
            const body    = encodeURIComponent(`New subscription request:\n\nName: ${name}\nEmail: ${email}\nInterest Area: ${interest}\n\nPlease add me to your mailing list.`);
            window.location.href = `mailto:info@aisgechaptersrilanka.org?subject=${subject}&body=${body}`;
        });
    }
})();

// --- Responsive 2-col grid (stacks on mobile) ---
(function () {
    const twoCol = document.querySelectorAll('.responsive-2col');
    if (window.innerWidth <= 768) {
        twoCol.forEach(el => {
            el.style.gridTemplateColumns = '1fr';
        });
    }
})();
