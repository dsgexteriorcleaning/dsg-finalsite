// Pricing calculator - NO PRICING SHOWN, just collects data
document.addEventListener('DOMContentLoaded', function() {
    const location = document.getElementById('location');
    const alert = document.getElementById('countyAlert');
    
    if (location && alert) {
        location.addEventListener('change', function() {
            const value = this.value;
            if (value.includes('putnam')) {
                alert.textContent = '💰 Putnam County: Pricing is approximately 10% higher than Dutchess County base rates.';
                alert.style.display = 'block';
            } else if (value.includes('westchester')) {
                alert.textContent = '💰 Westchester County: Pricing is approximately 15-35% higher than Dutchess County base rates due to travel distance and market conditions.';
                alert.style.display = 'block';
            } else {
                alert.style.display = 'none';
            }
        });
    }
});
