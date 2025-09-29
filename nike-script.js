// Nike Product Showcase JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Product carousel functionality
    let currentSlide = 0;
    const productItems = document.querySelectorAll('.product-item');
    const totalSlides = productItems.length;
    
    // Auto-scroll timer
    let autoScrollTimer;
    const autoScrollInterval = 4000; // 4 seconds
    
    // Initialize carousel
    function initCarousel() {
        updateCarousel();
        startAutoScroll();
    }
    
    // Update carousel display
    function updateCarousel() {
        productItems.forEach((item, index) => {
            item.classList.remove('active', 'prev', 'next');
            
            if (index === currentSlide) {
                item.classList.add('active');
                // Ensure active item has full opacity
                item.style.opacity = '1';
            } else {
                // Hide non-active items completely to avoid transparency issues
                item.style.opacity = '0';
            }
        });
        
        // Update background gradient based on product
        updateBackgroundGradient();
    }
    
    // Update background gradient for each product
    function updateBackgroundGradient() {
        const gradients = [
            'linear-gradient(135deg, #b91c1c 0%, #dc2626 50%, #ef4444 100%)', // Red
            'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)', // Blue  
            'linear-gradient(135deg, #16a34a 0%, #22c55e 50%, #4ade80 100%)'  // Green
        ];
        
        document.body.style.background = gradients[currentSlide];
        document.querySelector('.container').style.background = gradients[currentSlide];
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateCarousel();
    }
    
    // Auto-scroll functionality
    function startAutoScroll() {
        autoScrollTimer = setInterval(() => {
            nextSlide();
        }, autoScrollInterval);
    }
    
    function stopAutoScroll() {
        clearInterval(autoScrollTimer);
    }
    
    function resetAutoScroll() {
        stopAutoScroll();
        startAutoScroll();
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoScroll();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoScroll();
        }
    });
    
    // Pause auto-scroll on hover
    const productContainer = document.querySelector('.product-container');
    if (productContainer) {
        productContainer.addEventListener('mouseenter', stopAutoScroll);
        productContainer.addEventListener('mouseleave', startAutoScroll);
    }
    
    // Size selector functionality
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            sizeButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Product counter functionality
    let productCount = 1;
    const counterDisplay = document.querySelector('.counter-display');
    const minusBtn = document.querySelector('.counter-btn.minus');
    const plusBtn = document.querySelector('.counter-btn.plus');
    
    function updateCounter() {
        counterDisplay.textContent = productCount.toString().padStart(2, '0');
    }
    
    minusBtn.addEventListener('click', function() {
        if (productCount > 1) {
            productCount--;
            updateCounter();
            
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }
    });
    
    plusBtn.addEventListener('click', function() {
        if (productCount < 99) {
            productCount++;
            updateCounter();
            
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }
    });
    
    // Buy now button functionality
    const buyNowBtn = document.querySelector('.buy-now-btn');
    buyNowBtn.addEventListener('click', function() {
        // Add purchase animation
        this.style.transform = 'scale(0.95)';
        this.textContent = 'Adding to cart...';
        
        setTimeout(() => {
            this.style.transform = '';
            this.textContent = 'Added! ✓';
            this.style.background = '#22c55e';
            this.style.color = 'white';
            
            setTimeout(() => {
                this.textContent = 'Buy now';
                this.style.background = '';
                this.style.color = '';
            }, 2000);
        }, 500);
    });
    
    // Smooth hover effects for navigation elements
    const hoverElements = document.querySelectorAll('.nav-link, .size-btn, .nav-btn, .counter-btn');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Add parallax effect to product shoes and real images
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
        
        const activeShoe = document.querySelector('.product-item.active .nike-shoe');
        const activeRealImage = document.querySelector('.product-item.active .nike-real-image');
        
        if (activeShoe) {
            activeShoe.style.transform = `rotate(-15deg) translate(${mouseX}px, ${mouseY}px)`;
        }
        
        if (activeRealImage) {
            activeRealImage.style.transform = `rotate(-10deg) translate(${mouseX}px, ${mouseY}px)`;
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    productContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    productContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // Swipe left - next slide
            } else {
                prevSlide(); // Swipe right - previous slide
            }
        }
    }
    
    // Add loading animation
    function addLoadingEffect() {
        const container = document.querySelector('.container');
        container.style.opacity = '0';
        container.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            container.style.transition = 'all 0.8s ease';
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Performance optimization - Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe product images for animation
    productItems.forEach(item => {
        observer.observe(item);
    });
    
    // Initialize everything
    initCarousel();
    addLoadingEffect();
    
    // Add resize handler for responsive behavior
    window.addEventListener('resize', function() {
        // Recalculate positions if needed
        updateCarousel();
    });
    
    // Add focus management for accessibility
    const focusableElements = document.querySelectorAll('button, [tabindex]');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid rgba(255, 255, 255, 0.5)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
    
    // Ellipse center navigation button
    const ellipseCenterBtn = document.querySelector('.ellipse-center-btn');

    // Center button alternates between next and previous
    let centerBtnDirection = 1; // 1 for next, -1 for prev
    if (ellipseCenterBtn) {
        ellipseCenterBtn.addEventListener('click', function() {
            if (centerBtnDirection === 1) {
                nextSlide();
            } else {
                prevSlide();
            }
            // Alternate direction for next click
            centerBtnDirection *= -1;
            resetAutoScroll();
        });
    }
    
    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.contact-submit-btn');
            const formData = new FormData(this);
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.background = 'rgba(255,255,255,0.3)';
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Success state
                submitBtn.textContent = 'Message Sent! ✓';
                submitBtn.style.background = '#22c55e';
                submitBtn.style.color = 'white';
                
                // Log form data (replace with actual submission)
                console.log('Form submitted with data:', Object.fromEntries(formData));
                
                // Reset form after delay
                setTimeout(() => {
                    this.reset();
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                }, 3000);
                
            }, 2000); // Simulate network delay
        });
    }
    
});

// Proceed to checkout with selected product data
function proceedToCheckout() {
    // Get current product selection
    const activeProduct = document.querySelector('.product-item.active');
    const selectedSize = document.querySelector('.size-btn.active');
    const quantityDisplay = document.querySelector('.counter-display');
    
    // Get product details
    const productImg = activeProduct.querySelector('.product-image');
    const productSrc = productImg.src;
    const productAlt = productImg.alt;
    
    // Determine product color and name from image alt text
    let productName = 'Nike Airmax 270';
    let productColor = 'Red';
    let productImage = 'Adobe Express - file (1).png';
    
    if (productAlt.includes('Red')) {
        productColor = 'Fire Red';
        productImage = 'Adobe Express - file (1).png';
    } else if (productAlt.includes('Blue')) {
        productColor = 'Ocean Blue';
        productImage = 'Adobe Express - file (3).png';
    } else if (productAlt.includes('Green')) {
        productColor = 'Forest Green';
        productImage = 'Adobe Express - file.png';
    }
    
    // Create product data object
    const productData = {
        id: activeProduct.dataset.product,
        name: productName,
        color: productColor,
        image: productImage,
        size: selectedSize ? selectedSize.dataset.size : '14',
        quantity: quantityDisplay ? parseInt(quantityDisplay.textContent) : 1,
        price: 159.99
    };
    
    // Store in sessionStorage for checkout page
    sessionStorage.setItem('checkoutProduct', JSON.stringify(productData));
    
    // Navigate to checkout
    window.location.href = 'checkout.html';
}