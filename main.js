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
