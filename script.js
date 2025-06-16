document.addEventListener('DOMContentLoaded', function() {

    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            // Give a small delay to ensure all content is visually ready
            setTimeout(() => {
                 preloader.classList.add('loaded');
            }, 500); 
            // After transition, remove from layout
            setTimeout(() => {
                preloader.style.display = 'none'; 
            }, 1000); // Matches CSS transition duration + delay
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"], .hero-cta-buttons a[href^="#"], .primary-cta[href^="#"], .footer-column a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const header = document.querySelector('.main-header');
                const headerOffset = header ? header.offsetHeight : 0;
                // Calculate position considering fixed header
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Dynamic copyright year
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Define RGB values for CSS variables (for RGBA usage)
    // This is useful if you want to use rgba() with your defined hex colors
    function hexToRgb(hex) {
        let r = 0, g = 0, b = 0;
        // Handle 3-digit hex (e.g., #0F0)
        if (hex.length === 4) { 
            r = "0x" + hex[1] + hex[1];
            g = "0x" + hex[2] + hex[2];
            b = "0x" + hex[3] + hex[3];
        } 
        // Handle 6-digit hex (e.g., #00FF00)
        else if (hex.length === 7) { 
            r = "0x" + hex[1] + hex[2];
            g = "0x" + hex[3] + hex[4];
            b = "0x" + hex[5] + hex[6];
        }
        return `${+r},${+g},${+b}`;
    }

    const rootStyle = document.documentElement.style;
    // Set RGB variables based on computed hex values
    rootStyle.setProperty('--color-neon-blue-rgb', hexToRgb(getComputedStyle(document.documentElement).getPropertyValue('--color-neon-blue').trim()));
    rootStyle.setProperty('--color-neon-violet-rgb', hexToRgb(getComputedStyle(document.documentElement).getPropertyValue('--color-neon-violet').trim()));


    // Animation on Scroll using IntersectionObserver
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animateOnScrollElements.forEach(element => {
        observer.observe(element);
    });

    // Optional: Parallax effect for hero background
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            heroBackground.style.transform = `translateY(${scrollY * 0.3}px)`; // Adjust 0.3 for speed
        });
    }

    // Add interactivity to rarity cards on hover (no JS, purely CSS now)
    // Removed old JS hover as CSS handles it better and avoids conflicts

    // Dynamic coloring for rarity card percentages based on rarity-color attribute
    // This part ensures the percentage text matches the rarity color
    const rarityCards = document.querySelectorAll('.rarity-card');
    rarityCards.forEach(card => {
        const rarityColor = card.dataset.rarityColor;
        const percentageSpan = card.querySelector('.percentage');
        
        // Define specific gradients for each rarity, using the RGB variables
        let gradient;
        switch (rarityColor) {
            case 'common':
                gradient = `linear-gradient(45deg, #8C8C8C, #B0B0B0)`;
                break;
            case 'rare':
                gradient = `linear-gradient(45deg, rgba(var(--color-neon-blue-rgb), 1), rgba(var(--color-neon-violet-rgb), 0.5))`;
                break;
            case 'epic':
                gradient = `linear-gradient(45deg, rgba(var(--color-neon-violet-rgb), 1), rgba(var(--color-neon-blue-rgb), 0.5))`;
                break;
            case 'legendary':
                gradient = `linear-gradient(45deg, var(--color-accent-gold), rgba(var(--color-accent-gold-rgb, 255,215,0), 0.7))`; // Assuming gold RGB might be needed
                break;
            default:
                gradient = `linear-gradient(45deg, var(--color-neon-blue), var(--color-neon-violet))`;
        }
        
        if (percentageSpan) {
            percentageSpan.style.backgroundImage = gradient;
        }
    });

    // Optional: Smooth scroll for hero background to align with scrolling
    // This is complementary to the CSS parallax effect
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrollOffset = window.pageYOffset;
            // Adjust the multiplier for the desired parallax speed
            heroBackground.style.transform = `translateY(${scrollOffset * 0.3}px)`; 
        });
    }
});