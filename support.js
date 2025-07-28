// Support page JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initFAQ();
    initSmoothScrolling();
    initAnimations();
    initThemeDetection();
});

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinksItems = navLinks.querySelectorAll('a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }
}

// FAQ toggle functionality
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('.faq-icon');
            
            // Close other open FAQs
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    const otherAnswer = otherQuestion.nextElementSibling;
                    const otherIcon = otherQuestion.querySelector('.faq-icon');
                    otherAnswer.classList.remove('active');
                    otherQuestion.classList.remove('active');
                    if (otherIcon) otherIcon.textContent = '+';
                }
            });
            
            // Toggle current FAQ
            answer.classList.toggle('active');
            this.classList.toggle('active');
            
            if (icon) {
                icon.textContent = answer.classList.contains('active') ? '−' : '+';
            }
        });
    });
}

// Smooth scrolling functionality
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animation on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .privacy-card, .faq-item, .trouble-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Theme detection and handling
function initThemeDetection() {
    // Check for saved theme preference or default to auto
    const savedTheme = localStorage.getItem('theme') || 'auto';
    applyTheme(savedTheme);
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addListener(function(e) {
        if (savedTheme === 'auto') {
            applyTheme('auto');
        }
    });
}

function applyTheme(theme) {
    const root = document.documentElement;
    
    if (theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        root.classList.add('dark-theme');
    } else {
        root.classList.remove('dark-theme');
    }
}

// Utility functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function toggleFAQ(button) {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('.faq-icon');
    
    // Close other open FAQs
    const allFaqQuestions = document.querySelectorAll('.faq-question');
    allFaqQuestions.forEach(otherQuestion => {
        if (otherQuestion !== button) {
            const otherAnswer = otherQuestion.nextElementSibling;
            const otherIcon = otherQuestion.querySelector('.faq-icon');
            otherAnswer.classList.remove('active');
            otherQuestion.classList.remove('active');
            if (otherIcon) otherIcon.textContent = '+';
        }
    });
    
    // Toggle current FAQ
    answer.classList.toggle('active');
    button.classList.toggle('active');
    
    if (icon) {
        icon.textContent = answer.classList.contains('active') ? '−' : '+';
    }
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Add loading animation for images
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
}

// Initialize image preloading
preloadImages();

// Add CSS for mobile menu active state
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: var(--surface-color);
            border-top: 1px solid var(--border-color);
            padding: var(--spacing-md);
            flex-direction: column;
            gap: var(--spacing-md);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-links.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
    
    .navbar.scrolled {
        background-color: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
    }
    
    .dark-theme .navbar.scrolled {
        background-color: rgba(28, 28, 30, 0.95);
    }
    
    img.loaded {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
    
    img {
        opacity: 0;
    }
`;

// Inject mobile menu styles
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);

// Add analytics tracking (if needed)
function trackEvent(eventName, eventData = {}) {
    // Google Analytics 4 event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Custom event tracking
    console.log('Event tracked:', eventName, eventData);
}

// Track important user interactions
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-primary, .btn-secondary, .download-btn')) {
        trackEvent('button_click', {
            button_text: e.target.textContent.trim(),
            button_type: e.target.className.includes('primary') ? 'primary' : 'secondary'
        });
    }
    
    if (e.target.matches('.faq-question')) {
        trackEvent('faq_toggle', {
            question_text: e.target.textContent.trim()
        });
    }
    
    if (e.target.matches('a[href^="#"]')) {
        trackEvent('navigation_click', {
            target_section: e.target.getAttribute('href')
        });
    }
});

// Performance optimization: Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
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
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuBtn && navLinks) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    }
    
    // Enter key activates focused elements
    if (e.key === 'Enter') {
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.classList.contains('faq-question')) {
            focusedElement.click();
        }
    }
});

// Add service worker registration (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Export functions for global access
window.scrollToSection = scrollToSection;
window.toggleFAQ = toggleFAQ;
window.trackEvent = trackEvent; 