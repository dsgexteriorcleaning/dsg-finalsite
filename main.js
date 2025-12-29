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
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
// Mobile Menu
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav .nav-container');
    const navLinks = document.querySelector('.nav-links');
    
    if (!navLinks) return;
    
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'mobile-menu-btn';
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    document.body.appendChild(overlay);
    
    // Insert hamburger
    nav.insertBefore(hamburger, navLinks);
    
    // Toggle menu
    hamburger.onclick = function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
    };
    
    // Close on overlay click
    overlay.onclick = function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
    };
    
    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.onclick = function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
        };
    });
});
