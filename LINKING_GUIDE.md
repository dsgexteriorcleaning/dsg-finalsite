# 🔗 Complete Navigation & Linking Guide

## 📄 All Pages in Your Website

1. **index.html** - Homepage
2. **quote.html** - General quote request form
3. **services.html** - All services detailed
4. **bundles.html** - Service bundles page
5. **plans.html** - Home care plans
6. **veterans.html** - Veterans program info
7. **veterans-form.html** - Veterans application form (SEPARATE)
8. **reviews.html** - Customer reviews
9. **blog.html** - Blog listing
10. **about.html** - About DSG

---

## 🧭 How Navigation is Set Up

### **Main Navigation (in header):**
```html
<ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="services.html">Services</a></li>
    <li><a href="bundles.html">Bundles</a></li>
    <li><a href="plans.html">Plans</a></li>
    <li><a href="veterans.html">Veterans</a></li>
</ul>
```

### **CTA Button (in header):**
```html
<a href="quote.html" class="cta-btn">Get Free Quote</a>
```

---

## 📍 Where Each Page Links To

### **index.html (Homepage):**
Links to:
- `quote.html` - Multiple "Get Quote" buttons
- `services.html` - "View All Services"
- `bundles.html` - From bundles section
- `plans.html` - From plans mention
- `veterans.html` - Veterans highlight section
- `reviews.html` - Footer link
- `blog.html` - Footer link

### **quote.html (General Quote Form):**
- This is the MAIN quote form for regular services
- For: Individual services, bundles, home care plans

### **veterans-form.html (Veterans Application):**
- SEPARATE form specifically for veterans program
- Different fields (military status, branch, etc.)
- Linked from `veterans.html` page

### **veterans.html:**
Now links to:
- `veterans-form.html` - "Apply for Veterans Program" button
- NOT to quote.html

---

## ✅ How to Add Links in HTML

### **Link to Another Page:**
```html
<a href="bundles.html">View Our Bundles</a>
```

### **Link to Quote Form:**
```html
<a href="quote.html" class="btn-primary">Get Free Quote</a>
```

### **Link to Veterans Form:**
```html
<a href="veterans-form.html" class="btn-primary">Apply for Veterans Program</a>
```

### **Link to Reviews:**
```html
<a href="reviews.html">See Customer Reviews</a>
```

### **Link to Blog:**
```html
<a href="blog.html">Read Our Blog</a>
```

---

## 🎯 How to Add Bundles Link to Homepage

Open **index.html** and find the bundles section. It already has:

```html
<section class="section bundles-section">
    <div class="section-container">
        <div class="section-header">
            <h2 class="section-title">Service Bundles - Save Big!</h2>
        </div>
        <!-- Bundle cards here -->
    </div>
</section>
```

To add a "View All Bundles" link, add this after the bundle cards:

```html
<div style="text-align: center; margin-top: 40px;">
    <a href="bundles.html" class="btn-primary-large">View All Bundle Details →</a>
</div>
```

---

## 🔄 How to Update Navigation on All Pages

If you want to add "Bundles" to the main navigation, update the `<nav>` section on EVERY page:

**Find this:**
```html
<ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="services.html">Services</a></li>
    <li><a href="plans.html">Plans</a></li>
    <li><a href="veterans.html">Veterans</a></li>
</ul>
```

**Change to:**
```html
<ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="services.html">Services</a></li>
    <li><a href="bundles.html">Bundles</a></li>
    <li><a href="plans.html">Plans</a></li>
    <li><a href="veterans.html">Veterans</a></li>
</ul>
```

**Update on these pages:**
- index.html
- quote.html
- services.html
- bundles.html
- plans.html
- veterans.html
- veterans-form.html
- reviews.html
- blog.html
- about.html

---

## 📋 Footer Links Structure

All pages have this footer structure:

```html
<footer>
    <div class="footer-container">
        <div class="footer-section">
            <h3>Services</h3>
            <ul>
                <li><a href="services.html">All Services</a></li>
                <li><a href="bundles.html">Bundles</a></li>
                <li><a href="plans.html">Plans</a></li>
            </ul>
        </div>
        <div class="footer-section">
            <h3>Company</h3>
            <ul>
                <li><a href="https://dsgclean.com/review" target="_blank">Leave a Google Review ⭐</a></li><li><a href="quote.html">Get Quote</a></li>
                <li><a href="reviews.html">Reviews</a></li>
                <li><a href="blog.html">Blog</a></li>
                <li><a href="veterans.html">Veterans</a></li>
                <li><a href="about.html">About</a></li>
            </ul>
        </div>
    </div>
</footer>
```

---

## 🎨 Button Styles Used

### **Primary CTA:**
```html
<a href="quote.html" class="btn-cta-primary">Get Quote →</a>
```

### **Secondary CTA:**
```html
<a href="tel:+18455550123" class="btn-cta-secondary">Call Us</a>
```

### **Service Link:**
```html
<a href="quote.html" class="service-cta">Get Quote →</a>
```

### **Bundle Button:**
```html
<a href="quote.html" class="bundle-cta">Get Custom Quote</a>
```

---

## ✅ Quick Reference: Where to Go for What

**Want a quote for regular service?** → `quote.html`
**Want to apply for veterans program?** → `veterans-form.html`
**Want to see all bundles?** → `bundles.html`
**Want to see reviews?** → `reviews.html`
**Want to read blog posts?** → `blog.html`
**Want to learn about veterans program?** → `veterans.html`
**Want company info?** → `about.html`

---

## 🔧 Testing Your Links

After uploading your website:

1. Click every link in the navigation
2. Click every "Get Quote" button
3. Click footer links
4. Make sure veterans page goes to veterans-form.html (NOT quote.html)
5. Test on mobile AND desktop

---

## 💡 Pro Tips

1. **All links are relative** - No "www.yoursite.com" needed
2. **Case sensitive on some servers** - Use lowercase filenames
3. **Veterans have their own form** - Don't send them to regular quote
4. **Test before launching** - Click every link!

---

That's it! Your navigation is all set up and ready to go! 🚀
