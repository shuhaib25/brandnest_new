document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const preloader = document.getElementById('preloader');
    const scrollProgress = document.querySelector('.scroll-progress');
    const backToTop = document.querySelector('.back-to-top');
    const cursor = document.querySelector('.custom-cursor');
    const cursorInner = document.querySelector('.custom-cursor-inner');

    // Hide Preloader
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }
        }, 1000);
    });

    // Custom Cursor Movement
    document.addEventListener('mousemove', (e) => {
        if (cursor && cursorInner) {
            cursor.style.transform = `translate(${e.clientX - 12.5}px, ${e.clientY - 12.5}px)`;
            cursorInner.style.transform = `translate(${e.clientX - 2.5}px, ${e.clientY - 2.5}px)`;
        }
    });

    // Cursor Hover Effect
    const interactiveElements = document.querySelectorAll('a, button, .service-card-new, .testimonial-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursor) {
                cursor.style.transform += ' scale(2)';
                cursor.style.borderColor = 'var(--accent-color)';
                cursor.style.backgroundColor = 'rgba(248, 164, 0, 0.1)';
                cursorInner.style.opacity = '0';
            }
        });
        el.addEventListener('mouseleave', () => {
            if (cursor) {
                cursor.style.transform = cursor.style.transform.replace(' scale(2)', '');
                cursor.style.borderColor = 'var(--accent-color)';
                cursor.style.backgroundColor = 'transparent';
                cursorInner.style.opacity = '1';
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Navbar Auto-Close
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('navbarNav');
    if (menuToggle && typeof bootstrap !== 'undefined') {
        const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });
        navLinks.forEach((l) => {
            l.addEventListener('click', () => {
                if (window.innerWidth < 992) {
                    bsCollapse.hide();
                }
            });
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission animation
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Request Received';
                btn.style.backgroundColor = '#10b981';
                btn.style.borderColor = '#10b981';

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                    btn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 2000);
        });
    }

    // Magnetic Effect for Buttons & Back to Top
    const magnets = document.querySelectorAll('.btn-custom, .social-links a, .back-to-top');
    magnets.forEach(magnet => {
        magnet.addEventListener('mousemove', (e) => {
            const position = magnet.getBoundingClientRect();
            const x = (e.clientX - position.left - position.width / 2) * 0.3;
            const y = (e.clientY - position.top - position.height / 2) * 0.5;
            magnet.style.transform = `translate(${x}px, ${y}px)`;
        });
        magnet.addEventListener('mouseleave', () => {
            magnet.style.transform = 'translate(0px, 0px)';
        });
    });

    // Progress Bar & Back to Top visibility
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        if (scrollProgress) {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (scrolled / windowHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        }

        if (backToTop) {
            if (scrolled > 500) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        }
    });
});
