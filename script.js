// Interactive login/signup form toggle
document.addEventListener('DOMContentLoaded', function() {
    const loginContainer = document.getElementById('loginContainer');
    const leftPanel = document.getElementById('leftPanel');
    const rightPanel = document.getElementById('rightPanel');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const signupToggle = document.getElementById('signupToggle');
    const loginToggle = document.getElementById('loginToggle');
    const welcomeSection = document.getElementById('welcomeSection');
    const signupPasswordInput = document.getElementById('signupPassword');
    const passwordStrengthDiv = document.getElementById('passwordStrength');

    // Password strength checker
    if (signupPasswordInput && passwordStrengthDiv) {
        signupPasswordInput.addEventListener('input', checkPasswordStrength);
        signupPasswordInput.addEventListener('focus', function() {
            passwordStrengthDiv.classList.add('active');
        });
        signupPasswordInput.addEventListener('blur', function() {
            if (this.value === '') {
                passwordStrengthDiv.classList.remove('active');
            }
        });
    }

    function checkPasswordStrength() {
        const password = signupPasswordInput.value;
        const strengthFill = document.getElementById('strengthFill');
        const strengthText = document.getElementById('strengthText');

        // Check requirements
        const hasLength = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        // Calculate strength
        const metRequirements = [hasLength, hasUppercase, hasLowercase, hasNumber, hasSpecial].filter(Boolean).length;
        
        // Remove all strength classes
        strengthFill.className = 'strength-fill';
        strengthText.className = 'strength-text';

        if (password.length === 0) {
            strengthText.textContent = 'Password strength';
            return;
        }

        if (metRequirements <= 2) {
            strengthFill.classList.add('weak');
            strengthText.classList.add('weak');
            strengthText.textContent = 'Weak password';
        } else if (metRequirements === 3) {
            strengthFill.classList.add('fair');
            strengthText.classList.add('fair');
            strengthText.textContent = 'Fair password';
        } else if (metRequirements === 4) {
            strengthFill.classList.add('good');
            strengthText.classList.add('good');
            strengthText.textContent = 'Good password';
        } else if (metRequirements === 5) {
            strengthFill.classList.add('strong');
            strengthText.classList.add('strong');
            strengthText.textContent = 'Strong password';
        }
    }

    // Toggle to signup mode
    signupToggle.addEventListener('click', function(e) {
        e.preventDefault();
        switchToSignup();
    });

    // Toggle back to login mode
    loginToggle.addEventListener('click', function(e) {
        e.preventDefault();
        switchToLogin();
    });

    function switchToSignup() {
        // Add signup mode class for panel sliding
        loginContainer.classList.add('signup-mode');

        // Switch form visibility
        loginForm.classList.remove('active');
        signupForm.classList.add('active');

        // Update welcome text
        welcomeSection.innerHTML = `
            <h1>Join the Nike Family</h1>
            <p>Create your account to unlock exclusive access.</p>
        `;

        // Smooth scroll to top of right panel
        rightPanel.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function switchToLogin() {
        // Remove signup mode class
        loginContainer.classList.remove('signup-mode');

        // Switch form visibility
        signupForm.classList.remove('active');
        loginForm.classList.add('active');

        // Update welcome text
        welcomeSection.innerHTML = `
            <h1>Welcome Back, Athlete!</h1>
            <p>Log in to step into your Nike world.</p>
        `;

        // Smooth scroll to top of right panel
        rightPanel.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Password visibility toggle function
    window.togglePassword = function(fieldId = 'password') {
        const input = document.getElementById(fieldId);
        const eyeIcon = input.nextElementSibling.querySelector('i');

        if (input.type === 'password') {
            input.type = 'text';
            eyeIcon.className = 'fas fa-eye-slash';
        } else {
            input.type = 'password';
            eyeIcon.className = 'fas fa-eye';
        }
    };

    // Form submission handlers
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleSignup();
    });

    function handleLogin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Simulate login process
        const submitBtn = loginForm.querySelector('.login-btn.primary');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Signing In...';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Simulate success
            submitBtn.textContent = 'Welcome Back! ✓';
            submitBtn.style.background = '#22c55e';

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                // Here you would redirect to dashboard
                alert('Login successful! Redirecting to dashboard...');
            }, 2000);
        }, 1500);
    }

    function handleSignup() {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Basic validation
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Simulate signup process
        const submitBtn = signupForm.querySelector('.login-btn.primary');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Creating Account...';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Simulate success
            submitBtn.textContent = 'Account Created! ✓';
            submitBtn.style.background = '#22c55e';

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                // Switch back to login
                switchToLogin();
                alert('Account created successfully! Please log in.');
            }, 2000);
        }, 2000);
    }

    // Add smooth transitions for panel changes
    loginContainer.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    leftPanel.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    rightPanel.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
});