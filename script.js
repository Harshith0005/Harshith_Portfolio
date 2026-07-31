/* TNV Harshith Portfolio — script.js */

document.addEventListener('DOMContentLoaded', () => {

    // ── Cursor Glow ──
    const cursorGlow = document.getElementById('cursorGlow');
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    let isMouseOnPage = false;

    if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            isMouseOnPage = true;
            cursorGlow.classList.add('active');
        });

        document.addEventListener('mouseleave', () => {
            isMouseOnPage = false;
            cursorGlow.classList.remove('active');
        });

        document.addEventListener('mouseenter', () => {
            isMouseOnPage = true;
            cursorGlow.classList.add('active');
        });

        // Smooth lerp animation for cursor glow
        const animateGlow = () => {
            if (isMouseOnPage) {
                glowX += (mouseX - glowX) * 0.12;
                glowY += (mouseY - glowY) * 0.12;
                cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
            }
            requestAnimationFrame(animateGlow);
        };
        animateGlow();
    }

    // ── Scroll Reveal ──
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    reveals.forEach((el, i) => {
        el.style.transitionDelay = `${(i % 6) * 0.07}s`;
        revealObserver.observe(el);
    });

    // ── Navbar scroll style ──
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    }, { passive: true });

    // ── Smooth scroll for all anchor links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 70;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                const hamburger = document.getElementById('hamburger');
                if (navLinks && hamburger && window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // ── Hamburger menu toggle (mobile) ──
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isOpen = navLinks.style.display === 'flex';
            navLinks.style.display = isOpen ? 'none' : 'flex';
            if (!isOpen) {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'rgba(5, 10, 10, 0.98)';
                navLinks.style.backdropFilter = 'blur(16px)';
                navLinks.style.padding = '1.5rem 5%';
                navLinks.style.borderBottom = '1px solid rgba(16, 185, 129, 0.15)';
                navLinks.style.gap = '1.5rem';
                navLinks.style.zIndex = '100';
            }
        });
    }

    // ── Hero watermark subtle parallax ──
    const watermark = document.querySelector('.hero-watermark');
    if (watermark) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY < window.innerHeight) {
                watermark.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.35}px))`;
                watermark.style.opacity = Math.max(0.01, 0.05 - (scrollY * 0.00004));
            }
        }, { passive: true });
    }

    // ── Parallax for hero photo on mouse move ──
    const heroPhoto = document.querySelector('.hero-photo-wrapper');
    if (heroPhoto && window.matchMedia('(pointer: fine)').matches) {
        document.querySelector('.hero-section').addEventListener('mousemove', (e) => {
            const rect = heroPhoto.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) / 60;
            const deltaY = (e.clientY - centerY) / 60;
            heroPhoto.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
        document.querySelector('.hero-section').addEventListener('mouseleave', () => {
            heroPhoto.style.transform = 'translate(0, 0)';
        });
    }

    // ── Active nav link highlight ──
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navAnchors.forEach(a => {
                    const isActive = a.getAttribute('href') === `#${id}`;
                    if (isActive) {
                        a.style.color = '#f0fdfa';
                    } else {
                        a.style.color = '';
                    }
                });
            }
        });
    }, { threshold: 0.35, rootMargin: '-80px 0px -40% 0px' });

    sections.forEach(s => sectionObserver.observe(s));

    // ── Magnetic hover for CTA buttons ──
    const magnetize = (el, strength = 20) => {
        if (!el || !window.matchMedia('(pointer: fine)').matches) return;
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x / (rect.width / 2) * strength * 0.5}px, ${y / (rect.height / 2) * strength * 0.5}px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    };

    document.querySelectorAll('.btn-primary, .btn-ghost, .btn-solid, .project-link-primary, .stat-card, .social-square').forEach(el => {
        magnetize(el);
    });

    // ── Skills row auto-scroll (gentle infinite loop) ──
    const skillsRow = document.querySelector('.skills-row');
    if (skillsRow) {
        let isScrolling = false;
        let scrollDir = 1;

        // Mouse drag scroll for skills
        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;

        skillsRow.addEventListener('mousedown', (e) => {
            isDown = true;
            isScrolling = false;
            skillsRow.style.cursor = 'grabbing';
            startX = e.pageX - skillsRow.offsetLeft;
            scrollLeft = skillsRow.scrollLeft;
        });
        skillsRow.addEventListener('mouseleave', () => {
            isDown = false;
            skillsRow.style.cursor = '';
        });
        skillsRow.addEventListener('mouseup', () => {
            isDown = false;
            skillsRow.style.cursor = '';
        });
        skillsRow.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - skillsRow.offsetLeft;
            const walk = (x - startX) * 1.5;
            skillsRow.scrollLeft = scrollLeft - walk;
        });

        // Gentle auto-scroll when not interacting
        let autoScrollRAF;
        const startAutoScroll = () => {
            const autoScroll = () => {
                if (isDown) { autoScrollRAF = requestAnimationFrame(autoScroll); return; }
                skillsRow.scrollLeft += scrollDir * 0.4;
                // Bounce back at edges
                if (skillsRow.scrollLeft >= skillsRow.scrollWidth - skillsRow.clientWidth - 5) {
                    scrollDir = -1;
                } else if (skillsRow.scrollLeft <= 5) {
                    scrollDir = 1;
                }
                autoScrollRAF = requestAnimationFrame(autoScroll);
            };
            autoScrollRAF = requestAnimationFrame(autoScroll);
        };

        // Pause on hover
        skillsRow.addEventListener('mouseenter', () => {
            if (autoScrollRAF) cancelAnimationFrame(autoScrollRAF);
        });
        skillsRow.addEventListener('mouseleave', () => {
            startAutoScroll();
        });

        // Start after a delay
        setTimeout(startAutoScroll, 3000);
    }

    // ── Tilt effect for project cards ──
    const projectCards = document.querySelectorAll('.project-card');
    if (window.matchMedia('(pointer: fine)').matches) {
        projectCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -3;
                const rotateY = ((x - centerX) / centerX) * 3;
                card.style.transform = `translateY(-10px) perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // ── Count-up animation for about stats ──
    const statNums = document.querySelectorAll('.stat-num');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const originalText = el.textContent;
                // Find numbers in string
                const match = originalText.match(/(\d+)/);
                if (match) {
                    const target = parseInt(match[1], 10);
                    const suffix = originalText.replace(match[1], '');
                    const duration = 1500;
                    const startTime = performance.now();

                    const animate = (now) => {
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 4); // ease-out quart
                        const current = Math.round(target * eased);
                        el.textContent = current + suffix;
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                }
                statObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNums.forEach(s => statObserver.observe(s));

    // ── Contact Form ──
    const contactForm    = document.getElementById('contactForm');
    const contactSuccess = document.getElementById('contactSuccess');
    const contactSubmit  = document.getElementById('contactSubmit');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name    = document.getElementById('contactName').value.trim();
            const email   = document.getElementById('contactEmail').value.trim();
            const phone   = document.getElementById('contactPhone')?.value.trim() || '';
            const message = document.getElementById('contactMessage').value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all required fields before sending.');
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            contactSubmit.disabled = true;
            contactSubmit.textContent = 'Sending…';

            const formData = new FormData(contactForm);
            formData.set('name', name);
            formData.set('email', email);
            formData.set('message', message);
            if (phone) formData.set('phone', phone);

            try {
                const res  = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                const data = await res.json();

                if (data.success) {
                    contactForm.style.display = 'none';
                    contactSuccess.style.display = 'flex';
                    contactForm.reset();

                    setTimeout(() => {
                        contactSuccess.style.display = 'none';
                        contactForm.style.display    = 'flex';
                        contactForm.style.flexDirection = 'column';
                        contactSubmit.disabled    = false;
                        contactSubmit.textContent = 'Send Message';
                    }, 7000);
                } else {
                    throw new Error(data.message || 'Submission failed');
                }
            } catch (err) {
                contactSubmit.disabled    = false;
                contactSubmit.textContent = 'Send Message';
                alert('Something went wrong: ' + err.message + '\nPlease try again or email directly: tnvharshith@gmail.com');
            }
        });
    }

});
