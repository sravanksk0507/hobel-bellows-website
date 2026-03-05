/* ==========================================
   HOBEL BELLOWS CO. — MAIN JAVASCRIPT
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Mobile Navigation ----------
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ---------- SMART NAVBAR SYSTEM ----------
    // Unified: transparent at the very top, solid white once scrolled — all pages.
    const navbar = document.getElementById("navbar");

    const handleNavScroll = () => {
        if (window.scrollY > 10) {
            navbar.classList.add("scrolled");
            navbar.classList.remove("in-hero");
        } else {
            navbar.classList.remove("scrolled");
            navbar.classList.add("in-hero");
        }
    };

    window.addEventListener("scroll", handleNavScroll);
    handleNavScroll(); // run immediately on page load

    // ---------- Active Nav Link ----------
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ---------- Scroll Reveal -----------
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealElements.forEach(el => revealObserver.observe(el));

    // ---------- Stats Counter ----------
    const counters = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                const suffix = el.dataset.suffix || '';
                const prefix = el.dataset.prefix || '';
                const duration = 2000;
                let start = 0;
                const startTime = performance.now();

                const animate = (now) => {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(eased * target);
                    el.textContent = prefix + current.toLocaleString() + suffix;
                    if (progress < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(el => counterObserver.observe(el));

    // ---------- Product Filter (Products page) ----------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-detail-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;

            productCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = '';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ---------- Contact Form (EmailJS handles submission in contact.html) ----------
    // Note: Client-side validation only — no submit interception so EmailJS can fire
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.querySelectorAll('input[required], textarea[required]').forEach(field => {
            field.addEventListener('blur', () => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'var(--primary)';
                } else {
                    field.style.borderColor = '';
                }
            });
        });
    }

    function showNotification(msg, type) {
        const existing = document.querySelector('.form-notification');
        if (existing) existing.remove();

        const notif = document.createElement('div');
        notif.className = `form-notification ${type}`;
        notif.textContent = msg;
        notif.style.cssText = `
      padding: 14px 24px;
      border-radius: 12px;
      margin-top: 16px;
      font-weight: 600;
      font-size: 0.92rem;
      animation: fadeIn 0.3s ease;
      ${type === 'success'
                ? 'background: #e8f5e9; color: #2e7d32; border: 1px solid #a5d6a7;'
                : 'background: #fce4ec; color: #c62828; border: 1px solid #ef9a9a;'}
    `;
        contactForm.appendChild(notif);
        setTimeout(() => notif.remove(), 5000);
    }

    // ---------- Map marker animations ----------
    const mapMarkers = document.querySelectorAll('.map-marker');
    mapMarkers.forEach((marker, i) => {
        marker.style.animationDelay = `${i * 0.2}s`;
    });

    // ---------- Smooth scroll for anchor links ----------
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// CSS animation keyframe injected
const style = document.createElement('style');
style.textContent = `@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`;
document.head.appendChild(style);
