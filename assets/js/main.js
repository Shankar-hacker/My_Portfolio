/**
* Enhanced Portfolio JavaScript
* Modern interactions and smooth animations
*/

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#header .nav-menu a', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Smooth scrolling for navigation links
   */
  on('click', '.nav-menu a', function(e) {
    if (select(this.hash)) {
      e.preventDefault()
      
      let navbar = select('#header')
      if (navbar.classList.contains('header-top')) {
        navbar.classList.remove('header-top')
        setTimeout(function() {
          navbar.classList.add('header-top')
        }, 1350)
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Smooth scroll function
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('header-top')
        if (nextElement) nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('header-top')
        if (nextElement) nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.scroll-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
    
    on('click', '.scroll-to-top', function(e) {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#header').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.nav-menu .drop-down > a', function(e) {
    if (select('#header').classList.contains('mobile-nav-active')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#header')
      if (navbar.classList.contains('header-top')) {
        navbar.classList.remove('header-top')
        setTimeout(function() {
          navbar.classList.add('header-top')
        }, 1350)
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Portfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      // Wait a bit to ensure Isotope is loaded
      setTimeout(() => {
        let portfolioIsotope = new Isotope(portfolioContainer, {
          itemSelector: '.portfolio-item',
          layoutMode: 'fitRows'
        });

        let portfolioFilters = select('#portfolio-flters li', true);

        on('click', '#portfolio-flters li', function(e) {
          e.preventDefault();
          portfolioFilters.forEach(function(el) {
            el.classList.remove('filter-active');
          });
          this.classList.add('filter-active');

          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          
          // Add animation delay to portfolio items
          setTimeout(() => {
            portfolioIsotope.layout();
          }, 300);
        }, true);
      }, 100);
    }
  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Skills animation on scroll
   */
  let skillsSection = select('#skills');
  if (skillsSection) {
    let skillsWaypoint = new Waypoint({
      element: skillsSection,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Enhanced Animations and Interactions
   */

  // Parallax effect for header
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const header = select('#header');
    if (header) {
      header.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });

  // Smooth reveal animations for sections
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe all sections for animation
  const sections = select('section', true);
  sections.forEach(section => {
    observer.observe(section);
  });

  // Enhanced hover effects for project cards
  const projectCards = select('.project-card', true);
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-15px) scale(1.03)';
      this.style.boxShadow = '0 30px 60px rgba(18, 214, 64, 0.4)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '0 10px 30px rgba(18, 214, 64, 0.2)';
    });
  });

  // Dynamic particle background
  function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
      particlesContainer.appendChild(particle);
    }
  }

  // Initialize particles on load
  window.addEventListener('load', createParticles);

  // Enhanced social media hover effects
  const socialIcons = select('.social-icon', true);
  socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.2) rotate(360deg)';
    });
    
    icon.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
    });
  });

  // Smooth typing effect for animated text (without typewriter)
  const animatedText = select('.animated-text');
  if (animatedText) {
    const texts = ['a passionate Developer', 'an AI Enthusiast', 'a Problem Solver', 'a Creative Thinker'];
    let textIndex = 0;
    
    function changeText() {
      animatedText.style.opacity = '0';
      setTimeout(() => {
        animatedText.textContent = texts[textIndex];
        animatedText.style.opacity = '1';
        textIndex = (textIndex + 1) % texts.length;
      }, 500);
    }
    
    setInterval(changeText, 3000);
  }

  // Enhanced scroll progress indicator
  function updateScrollProgress() {
    const scrollProgress = document.createElement('div');
    scrollProgress.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, #12d640, #15e64a);
      z-index: 9999;
      transition: width 0.3s ease;
    `;
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      scrollProgress.style.width = scrollPercent + '%';
    });
  }

  // Initialize scroll progress
  window.addEventListener('load', updateScrollProgress);

  // Enhanced form interactions
  const formInputs = select('input, textarea', true);
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      if (this.value === '') {
        this.parentElement.classList.remove('focused');
      }
    });
  });

  // Smooth section transitions
  function smoothSectionTransitions() {
    const sections = select('section', true);
    
    sections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(50px)';
      section.style.transition = 'all 0.8s ease';
    });

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }

  // Initialize smooth transitions
  window.addEventListener('load', smoothSectionTransitions);

  // Enhanced mobile menu
  const mobileMenuToggle = select('.mobile-nav-toggle');
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      document.body.classList.toggle('mobile-nav-open');
    });
  }

  // Close mobile menu when clicking on a link
  const mobileNavLinks = select('.nav-menu a', true);
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('mobile-nav-open');
    });
  });

  // Enhanced loading states for external links
  const externalLinks = select('a[target="_blank"]', true);
  externalLinks.forEach(link => {
    link.addEventListener('click', function() {
      this.style.opacity = '0.7';
      this.style.transform = 'scale(0.95)';
      
      setTimeout(() => {
        this.style.opacity = '1';
        this.style.transform = 'scale(1)';
      }, 200);
    });
  });

  // Dynamic favicon based on scroll position
  function updateFavicon() {
    const favicon = select('link[rel="icon"]');
    if (favicon) {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent > 50) {
        favicon.href = '/favicon-active.png';
      } else {
        favicon.href = '/favicon.png';
      }
    }
  }

  window.addEventListener('scroll', updateFavicon);

  // Enhanced error handling for images
  const images = select('img', true);
  images.forEach(img => {
    img.addEventListener('error', function() {
      this.style.opacity = '0.5';
      this.alt = 'Image not available';
    });
    
    img.addEventListener('load', function() {
      this.style.opacity = '1';
    });
  });

  // Performance optimization: Lazy loading for images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    const lazyImages = select('img[data-src]', true);
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  /**
   * Portfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      // Initialize Isotope
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      // Add click event to filter buttons
      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        
        // Remove active class from all filters
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        
        // Add active class to clicked filter
        this.classList.add('filter-active');

        // Apply filter
        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        
        // Refresh layout after filtering
        setTimeout(() => {
          portfolioIsotope.layout();
        }, 300);
      }, true);
    }
  });

})();
// Fallback portfolio filter in case Isotope fails
document.addEventListener('DOMContentLoaded', function() {
  // Wait for everything to load
  setTimeout(function() {
    const filterButtons = document.querySelectorAll('#portfolio-flters li');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
      filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Remove active class from all buttons
          filterButtons.forEach(btn => btn.classList.remove('filter-active'));
          
          // Add active class to clicked button
          this.classList.add('filter-active');
          
          // Get filter value
          const filterValue = this.getAttribute('data-filter');
          
          // Apply filter
          portfolioItems.forEach(item => {
            if (filterValue === '*') {
              // Show all items
              item.style.display = 'block';
              item.style.opacity = '1';
            } else {
              // Check if item has the filter class
              const filterClass = filterValue.replace('.', '');
              if (item.classList.contains(filterClass)) {
                // Show item
                item.style.display = 'block';
                item.style.opacity = '1';
              } else {
                // Hide item
                item.style.display = 'none';
                item.style.opacity = '0';
              }
            }
          });
        });
      });
    }
  }, 1000);
});