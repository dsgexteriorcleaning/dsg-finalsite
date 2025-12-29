document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('quoteForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Log for QuoteIQ integration
            console.log('Quote Request:', data);
            
            // Success message
            alert('Thank you! Your quote request has been received. We\'ll contact you within 2 hours with your personalized quote.');
            
            // Reset form
            this.reset();
            const alert = document.getElementById('countyAlert');
            if (alert) alert.style.display = 'none';
        });
    }
     // Veterans Form Handler
    const veteransForm = document.getElementById('veteransForm');
    if (veteransForm) {
        veteransForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            console.log('Veterans Application:', data);
            alert('Thank you for your service! Your application has been submitted. We\'ll contact you within 24 hours to verify eligibility and schedule your free service.');
            this.reset();
        });
    }
    // Mobile Menu Toggle
    const navContainer = document.querySelector('nav .nav-container');
    const navLinks = document.querySelector('.nav-links');
    
    if (navContainer && navLinks) {
        // Create hamburger button
        const hamburger = document.createElement('button');
        hamburger.className = 'mobile-menu-btn';
        hamburger.setAttribute('aria-label', 'Toggle Menu');
        hamburger.innerHTML = '<span></span><span></span><span></span>';
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'mobile-overlay';
        
        // Insert hamburger before nav links
        navContainer.insertBefore(hamburger, navLinks);
        document.body.appendChild(overlay);
        
        // Toggle menu function
        function toggleMenu() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        }
        
        // Hamburger click
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
        
        // Overlay click
        overlay.addEventListener('click', function() {
            toggleMenu();
        });
        
        // Close menu when clicking a link
        const menuLinks = navLinks.querySelectorAll('a');
        menuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            });
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});

