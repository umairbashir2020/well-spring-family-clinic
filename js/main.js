// Main JavaScript file for WellSpring Family Clinic website - FIXED VERSION

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("Website loaded successfully!");
    
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize scroll animations (FIXED - won't hide content initially)
    initScrollAnimations();
    
    // Set current year in footer
    setCurrentYear();
    
    // Initialize back to top button
    initBackToTop();
});

// Mobile Navigation Toggle
function initMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

// Scroll Animations - FIXED VERSION
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // REMOVED the code that sets opacity to 0 initially
    // Elements will be visible by default, then animate when scrolled
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all animated elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Set current year in footer
function setCurrentYear() {
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        const content = yearElement.innerHTML;
        if (content.includes('2024')) {
            yearElement.innerHTML = content.replace('2024', currentYear);
        }
    }
}

// Back to top button functionality
function initBackToTop() {
    // Only create button if it doesn't exist
    if (document.querySelector('.back-to-top')) return;
    
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.display = 'none';
    backToTopButton.style.position = 'fixed';
    backToTopButton.style.bottom = '20px';
    backToTopButton.style.right = '20px';
    backToTopButton.style.zIndex = '99';
    backToTopButton.style.backgroundColor = '#2c7fb8';
    backToTopButton.style.color = 'white';
    backToTopButton.style.border = 'none';
    backToTopButton.style.borderRadius = '50%';
    backToTopButton.style.width = '50px';
    backToTopButton.style.height = '50px';
    backToTopButton.style.fontSize = '1.5rem';
    backToTopButton.style.cursor = 'pointer';
    backToTopButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    backToTopButton.style.transition = 'all 0.3s ease';
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#1d5a83';
        this.style.transform = 'scale(1.1)';
    });
    
    backToTopButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#2c7fb8';
        this.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(backToTopButton);
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});