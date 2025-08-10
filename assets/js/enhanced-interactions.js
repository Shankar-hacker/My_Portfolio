/**
 * Enhanced Interactive Features
 * Additional animations and user experience improvements
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth page load animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });

    // Enhanced cursor trail effect
    let cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(18, 214, 64, 0.8), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    // Interactive elements hover effects
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-wrap, .icon-box');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'radial-gradient(circle, rgba(18, 214, 64, 0.6), rgba(21, 230, 74, 0.3))';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'radial-gradient(circle, rgba(18, 214, 64, 0.8), transparent)';
        });
    });

    // Dynamic background gradient animation
    let gradientAngle = 0;
    function animateBackground() {
        gradientAngle += 0.5;
        document.body.style.background = `
            linear-gradient(${gradientAngle}deg, 
                rgba(12, 20, 38, 0.95) 0%, 
                rgba(26, 35, 50, 0.9) 50%, 
                rgba(15, 20, 25, 0.95) 100%)
        `;
        requestAnimationFrame(animateBackground);
    }
    animateBackground();

    // Enhanced scroll-triggered animations
    function createScrollTrigger(element, animation) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = animation;
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(element);
    }

    // Apply scroll animations to various elements
    const animatedElements = [
        { selector: '.section-title h2', animation: 'fadeInDown 1s ease forwards' },
        { selector: '.icon-box', animation: 'fadeInUp 0.8s ease forwards' },
        { selector: '.portfolio-wrap', animation: 'zoomIn 0.6s ease forwards' },
        { selector: '.info-box', animation: 'slideInLeft 0.8s ease forwards' }
    ];

    animatedElements.forEach(({ selector, animation }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.animationDelay = `${index * 0.1}s`;
            createScrollTrigger(element, animation);
        });
    });

    // Interactive skill bars animation
    const skillBars = document.querySelectorAll('.skill-icon');
    skillBars.forEach((skill, index) => {
        skill.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.2) rotate(5deg)';
            this.style.filter = 'brightness(1.2) saturate(1.3)';
        });
        
        skill.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
            this.style.filter = 'brightness(1) saturate(1)';
        });
    });

    // Enhanced project card interactions
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('a')) {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });

    // Dynamic text color animation
    const dynamicTexts = document.querySelectorAll('.animated-text, .section-title h2');
    dynamicTexts.forEach(text => {
        let hue = 0;
        setInterval(() => {
            hue = (hue + 1) % 360;
            text.style.filter = `hue-rotate(${hue}deg)`;
        }, 100);
    });

    // Enhanced form validation with animations
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('invalid', function() {
            this.style.animation = 'shake 0.5s ease';
            this.style.borderColor = '#ff4757';
        });
        
        input.addEventListener('input', function() {
            if (this.validity.valid) {
                this.style.borderColor = '#12d640';
                this.style.animation = 'none';
            }
        });
    });

    // Parallax effect for background elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Interactive navigation highlighting
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active navigation on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Enhanced loading states
    const loadingElements = document.querySelectorAll('[data-loading]');
    loadingElements.forEach(element => {
        element.addEventListener('click', function() {
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            
            const loader = document.createElement('div');
            loader.className = 'loading-overlay';
            loader.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(18, 214, 64, 0.1);
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            const spinner = document.createElement('div');
            spinner.className = 'loading';
            loader.appendChild(spinner);
            this.appendChild(loader);
            
            setTimeout(() => {
                loader.remove();
            }, 1000);
        });
    });

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        @keyframes zoomIn {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .cursor-trail {
            transition: all 0.1s ease !important;
        }
        
        @media (max-width: 768px) {
            .cursor-trail {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Optimized scroll handler
    const optimizedScrollHandler = debounce(function() {
        // Scroll-based animations and effects
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        // Update progress indicators
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            bar.style.width = Math.min(scrollPercent, 100) + '%';
        });
    }, 10);

    window.addEventListener('scroll', optimizedScrollHandler);

    // Accessibility improvements
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Enhanced focus indicators for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, input, textarea, [tabindex]');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #12d640';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Enhanced mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileMenuToggle && mobileNav) {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'mobile-nav-overlay';
        document.body.appendChild(overlay);
        
        mobileMenuToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.classList.toggle('mobile-nav-open');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (mobileNav.classList.contains('active')) {
                icon.className = 'bx bx-x';
            } else {
                icon.className = 'bx bx-menu';
            }
        });
        
        // Close menu when clicking overlay
        overlay.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('mobile-nav-open');
            mobileMenuToggle.querySelector('i').className = 'bx bx-menu';
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('mobile-nav-open');
                mobileMenuToggle.querySelector('i').className = 'bx bx-menu';
            });
        });
    }

    console.log('Enhanced portfolio interactions loaded successfully! 🚀');
});