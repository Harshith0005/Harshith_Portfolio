/* TNV Harshith Portfolio — script.js */

document.addEventListener('DOMContentLoaded', () => {

    // ── Scroll Reveal ──
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach((el, i) => {
        // Stagger siblings
        el.style.transitionDelay = `${(i % 4) * 0.08}s`;
        revealObserver.observe(el);
    });

    // ── Navbar scroll style ──
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // ── Smooth scroll for all anchor links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ── Hamburger menu toggle (mobile) ──
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'rgba(10,10,10,0.98)';
            navLinks.style.padding = '1.5rem 5%';
            navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
        });
    }

    // ── Hero watermark subtle parallax ──
    const watermark = document.querySelector('.hero-watermark');
    if (watermark) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            watermark.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.3}px))`;
        }, { passive: true });
    }

    // ── Active nav link highlight ──
    const sections = document.querySelectorAll('section[id], section[id="contact"]');
    const navAnchors = document.querySelectorAll('.nav-links a');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navAnchors.forEach(a => {
                    a.style.color = a.getAttribute('href') === `#${id}`
                        ? '#ffffff'
                        : '';
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => sectionObserver.observe(s));

});
