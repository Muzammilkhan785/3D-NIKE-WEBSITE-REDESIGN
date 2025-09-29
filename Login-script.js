// Password visibility toggle
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}

// Form submission with Nike-style loading animation
document.querySelector('.login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.querySelector('.login-btn.primary');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Basic validation
    if (!email || !password) {
        showNikeMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNikeMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.innerHTML = 'LOGGING IN...';
    submitBtn.disabled = true;
    
    // Simulate login process (replace with actual login logic)
    setTimeout(() => {
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.innerHTML = 'LOG IN';
        submitBtn.disabled = false;
        
        // For demonstration - show success message
        showNikeMessage('Welcome back, Athlete! Redirecting to your Nike world...', 'success');
        
        // Redirect or handle successful login
        setTimeout(() => {
            // window.location.href = 'dashboard.html';
            console.log('Redirect to Nike dashboard');
        }, 2000);
    }, 2500);
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Nike-styled message function
function showNikeMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.nike-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `nike-message ${type}`;
    messageDiv.textContent = message;
    
    // Add styles for the message
    messageDiv.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        padding: 16px 24px;
        border-radius: 8px;
        color: rgba(255, 255, 255, 0.98);
        font-weight: 600;
        font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
        z-index: 1000;
        animation: slideInRight 0.4s ease-out;
        max-width: 350px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.15);
        font-size: 14px;
        letter-spacing: 0.5px;
    `;
    
    if (type === 'success') {
        messageDiv.style.background = 'linear-gradient(135deg, #b91c1c 0%, #dc2626 50%, #ef4444 100%)';
        messageDiv.style.border = '2px solid rgba(255, 255, 255, 0.2)';
        messageDiv.style.backdropFilter = 'blur(10px)';
    } else if (type === 'error') {
        messageDiv.style.background = 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)';
        messageDiv.style.border = '2px solid rgba(255, 255, 255, 0.3)';
        messageDiv.style.backdropFilter = 'blur(10px)';
    }
    
    document.body.appendChild(messageDiv);
    
    // Remove message after 4 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOutRight 0.4s ease-in forwards';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 400);
    }, 4000);
}

// Add CSS animations for Nike messages
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Input field focus effects
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});

// Remember me functionality
const rememberCheckbox = document.querySelector('input[name="remember"]');
const emailInput = document.getElementById('email');

// Load remembered email on page load
window.addEventListener('load', function() {
    const rememberedEmail = localStorage.getItem('nikeRememberedEmail');
    if (rememberedEmail) {
        emailInput.value = rememberedEmail;
        rememberCheckbox.checked = true;
    }
});

// Save/remove email based on remember me checkbox
rememberCheckbox.addEventListener('change', function() {
    if (this.checked && emailInput.value) {
        localStorage.setItem('nikeRememberedEmail', emailInput.value);
    } else {
        localStorage.removeItem('nikeRememberedEmail');
    }
});

// Update remembered email when email changes
emailInput.addEventListener('input', function() {
    if (rememberCheckbox.checked) {
        localStorage.setItem('nikeRememberedEmail', this.value);
    }
});

// Create Account button handler
document.querySelector('.login-btn.secondary').addEventListener('click', function(e) {
    e.preventDefault();
    showNikeMessage('Redirecting to Nike Member signup...', 'success');
    setTimeout(() => {
        // window.location.href = 'signup.html';
        console.log('Redirect to Nike signup page');
    }, 1500);
});

// Forgot password handler
document.querySelector('.forgot-link').addEventListener('click', function(e) {
    e.preventDefault();
    
    const email = prompt('Enter your email address to reset your Nike account password:');
    if (email && isValidEmail(email)) {
        showNikeMessage('Password reset link sent! Check your email to continue.', 'success');
        // Implement password reset logic here
    } else if (email) {
        showNikeMessage('Please enter a valid email address', 'error');
    }
});

// Shop Now button (right panel CTA) handler
document.querySelector('.shop-now-btn').addEventListener('click', function() {
    showNikeMessage('Exploring Nike\'s latest collection...', 'success');
    setTimeout(() => {
        // window.open('https://www.nike.com/w/new-3n82y', '_blank');
        console.log('Open Nike shop in new tab');
    }, 1000);
});

// Add smooth scroll indicator for right panel
function addScrollIndicator() {
    const rightPanel = document.querySelector('.right-panel');
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.innerHTML = '↓ SCROLL TO EXPLORE ↓';
    
    indicator.style.cssText = `
        position: absolute;
        bottom: 20px;
        right: 50%;
        transform: translateX(50%);
        color: white;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 1px;
        z-index: 20;
        animation: bounce 2s infinite;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
    `;
    
    rightPanel.appendChild(indicator);
    
    // Hide indicator after first scroll
    rightPanel.addEventListener('scroll', function() {
        if (this.scrollTop > 50) {
            indicator.style.opacity = '0';
        } else {
            indicator.style.opacity = '1';
        }
    }, { once: false });
}

// Add bounce animation for scroll indicator
const scrollStyle = document.createElement('style');
scrollStyle.textContent += `
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateX(50%) translateY(0);
        }
        40% {
            transform: translateX(50%) translateY(-10px);
        }
        60% {
            transform: translateX(50%) translateY(-5px);
        }
    }
`;
document.head.appendChild(scrollStyle);

// Add parallax scrolling effect for hero sections
function addParallaxEffect() {
    const rightPanel = document.querySelector('.right-panel');
    const heroSections = document.querySelectorAll('.hero-section');
    
    rightPanel.addEventListener('scroll', function() {
        const scrollTop = this.scrollTop;
        
        heroSections.forEach((section, index) => {
            const img = section.querySelector('img');
            if (img) {
                const rate = scrollTop * -0.5;
                img.style.transform = `translateY(${rate}px)`;
            }
        });
    });
}

// Initialize scroll effects when page loads
window.addEventListener('load', function() {
    const formContainer = document.querySelector('.form-container');
    formContainer.style.opacity = '0';
    formContainer.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        formContainer.style.transition = 'all 0.8s ease-out';
        formContainer.style.opacity = '1';
        formContainer.style.transform = 'translateY(0)';
    }, 200);
    
    // Add scroll effects only on desktop
    if (window.innerWidth > 768) {
        addScrollIndicator();
        addParallaxEffect();
    }
});