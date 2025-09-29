// Checkout functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize checkout
    initializeCheckout();
    
    // Card number formatting
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryDateInput = document.getElementById('expiryDate');
    const cvvInput = document.getElementById('cvv');
    
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', formatCardNumber);
    }
    
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', formatExpiryDate);
    }
    
    if (cvvInput) {
        cvvInput.addEventListener('input', formatCVV);
    }
    
    // Payment method switching
    const paymentMethods = document.querySelectorAll('input[name="payment"]');
    paymentMethods.forEach(method => {
        method.addEventListener('change', handlePaymentMethodChange);
    });
    
    // Shipping method change
    const shippingMethods = document.querySelectorAll('input[name="shipping"]');
    shippingMethods.forEach(method => {
        method.addEventListener('change', updateShippingCost);
    });
    
    // Billing address toggle
    const sameAsShippingCheckbox = document.getElementById('sameAsShipping');
    if (sameAsShippingCheckbox) {
        sameAsShippingCheckbox.addEventListener('change', toggleBillingAddress);
    }
});

function initializeCheckout() {
    loadProductData();
    updateOrderSummary();
    validateForm();
}

// Load product data from session storage
function loadProductData() {
    const productData = sessionStorage.getItem('checkoutProduct');
    const orderItemsContainer = document.getElementById('orderItems');
    
    if (productData) {
        const product = JSON.parse(productData);
        
        // Create order item HTML
        const orderItemHTML = `
            <div class="order-item">
                <div class="item-image">
                    <img src="${product.image}" alt="${product.name} ${product.color}">
                </div>
                <div class="item-details">
                    <h3>${product.name}</h3>
                    <p class="item-variant">${product.color} • Size ${product.size}</p>
                    <div class="item-quantity">
                        <button class="qty-btn minus" onclick="updateQuantity('${product.id}', -1)">-</button>
                        <span class="qty-display" id="qty-${product.id}">${product.quantity}</span>
                        <button class="qty-btn plus" onclick="updateQuantity('${product.id}', 1)">+</button>
                    </div>
                </div>
                <div class="item-price" data-unit-price="${product.price}">$${(product.price * product.quantity).toFixed(2)}</div>
            </div>
        `;
        
        orderItemsContainer.innerHTML = orderItemHTML;
    } else {
        // Default product if no selection data
        const defaultHTML = `
            <div class="order-item">
                <div class="item-image">
                    <img src="Adobe Express - file (1).png" alt="Nike Airmax 270 Red">
                </div>
                <div class="item-details">
                    <h3>Nike Airmax 270</h3>
                    <p class="item-variant">Fire Red • Size 14</p>
                    <div class="item-quantity">
                        <button class="qty-btn minus" onclick="updateQuantity('1', -1)">-</button>
                        <span class="qty-display" id="qty-1">1</span>
                        <button class="qty-btn plus" onclick="updateQuantity('1', 1)">+</button>
                    </div>
                </div>
                <div class="item-price" data-unit-price="159.99">$159.99</div>
            </div>
        `;
        
        orderItemsContainer.innerHTML = defaultHTML;
    }
}

// Card number formatting
function formatCardNumber(e) {
    let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    
    if (formattedValue.length > 19) {
        formattedValue = formattedValue.substring(0, 19);
    }
    
    e.target.value = formattedValue;
    
    // Update card icons based on card type
    updateCardIcons(value);
}

function updateCardIcons(cardNumber) {
    const cardIcons = document.querySelectorAll('.card-icons i');
    cardIcons.forEach(icon => icon.style.opacity = '0.3');
    
    if (cardNumber.startsWith('4')) {
        // Visa
        document.querySelector('.fa-cc-visa').style.opacity = '1';
    } else if (cardNumber.startsWith('5') || cardNumber.startsWith('2')) {
        // Mastercard
        document.querySelector('.fa-cc-mastercard').style.opacity = '1';
    } else if (cardNumber.startsWith('34') || cardNumber.startsWith('37')) {
        // American Express
        document.querySelector('.fa-cc-amex').style.opacity = '1';
    }
}

// Expiry date formatting
function formatExpiryDate(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    
    e.target.value = value;
}

// CVV formatting
function formatCVV(e) {
    let value = e.target.value.replace(/\D/g, '');
    e.target.value = value.substring(0, 3);
}

// Payment method change handler
function handlePaymentMethodChange(e) {
    const cardDetails = document.getElementById('card-details');
    
    if (e.target.value === 'credit-card') {
        cardDetails.style.display = 'block';
        // Enable card validation
        setCardFieldsRequired(true);
    } else {
        cardDetails.style.display = 'none';
        // Disable card validation
        setCardFieldsRequired(false);
    }
}

function setCardFieldsRequired(required) {
    const cardFields = ['cardNumber', 'expiryDate', 'cvv', 'cardName'];
    cardFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.required = required;
        }
    });
}

// Update shipping cost
function updateShippingCost() {
    const selectedShipping = document.querySelector('input[name="shipping"]:checked');
    const shippingCostElement = document.getElementById('shipping-cost');
    
    if (selectedShipping && shippingCostElement) {
        let cost = 'Free';
        
        switch (selectedShipping.value) {
            case 'express':
                cost = '$9.99';
                break;
            case 'overnight':
                cost = '$24.99';
                break;
            default:
                cost = 'Free';
        }
        
        shippingCostElement.textContent = cost;
        updateOrderSummary();
    }
}

// Toggle billing address
function toggleBillingAddress() {
    const sameAsShipping = document.getElementById('sameAsShipping').checked;
    // Here you would show/hide billing address fields
    // For now, we'll just log the state
    console.log('Same as shipping:', sameAsShipping);
}

// Update order summary
function updateOrderSummary() {
    const orderItems = document.querySelectorAll('.order-item');
    let subtotal = 0;
    
    orderItems.forEach(item => {
        const qtyElement = item.querySelector('.qty-display');
        const priceElement = item.querySelector('.item-price');
        const unitPrice = parseFloat(priceElement.dataset.unitPrice);
        const quantity = parseInt(qtyElement.textContent);
        
        const itemTotal = unitPrice * quantity;
        priceElement.textContent = `$${itemTotal.toFixed(2)}`;
        subtotal += itemTotal;
    });
    
    // Get shipping cost
    const shippingCostText = document.getElementById('shipping-cost').textContent;
    let shippingCost = 0;
    if (shippingCostText !== 'Free') {
        shippingCost = parseFloat(shippingCostText.replace('$', ''));
    }
    
    // Calculate tax (8% for example)
    const tax = (subtotal + shippingCost) * 0.08;
    
    // Get discount
    const discountElement = document.getElementById('discount');
    let discount = 0;
    if (discountElement) {
        const discountText = discountElement.textContent;
        if (discountText && discountText !== '-$0.00') {
            discount = Math.abs(parseFloat(discountText.replace('-$', '')));
        }
    }
    
    // Calculate total
    const total = subtotal + shippingCost + tax - discount;
    
    // Update display
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Update quantity
function updateQuantity(itemId, change) {
    const qtyElement = document.getElementById(`qty-${itemId}`);
    const currentQty = parseInt(qtyElement.textContent);
    const newQty = Math.max(1, currentQty + change);
    
    qtyElement.textContent = newQty;
    updateOrderSummary();
    
    // Add visual feedback
    qtyElement.style.transform = 'scale(1.2)';
    setTimeout(() => {
        qtyElement.style.transform = 'scale(1)';
    }, 200);
}

// Apply promo code
function applyPromo() {
    const promoInput = document.getElementById('promoCode');
    const promoCode = promoInput.value.trim().toUpperCase();
    const discountRow = document.getElementById('discount-row');
    const discountElement = document.getElementById('discount');
    
    // Simulate promo code validation
    const validCodes = {
        'NIKE10': 10, // 10% off
        'WELCOME5': 5, // $5 off
        'FREESHIP': 'free-shipping'
    };
    
    if (validCodes[promoCode]) {
        let discountAmount = 0;
        const subtotal = parseFloat(document.getElementById('subtotal').textContent.replace('$', ''));
        
        if (promoCode === 'NIKE10') {
            discountAmount = subtotal * 0.10;
        } else if (promoCode === 'WELCOME5') {
            discountAmount = 5;
        } else if (promoCode === 'FREESHIP') {
            // Handle free shipping
            document.getElementById('shipping-cost').textContent = 'Free';
        }
        
        if (discountAmount > 0) {
            discountRow.style.display = 'flex';
            discountElement.textContent = `-$${discountAmount.toFixed(2)}`;
            updateOrderSummary();
        }
        
        // Success feedback
        promoInput.classList.add('success');
        promoInput.value = '';
        promoInput.placeholder = `${promoCode} applied!`;
        
        setTimeout(() => {
            promoInput.classList.remove('success');
            promoInput.placeholder = 'Promo code';
        }, 3000);
    } else {
        // Error feedback
        promoInput.classList.add('error');
        setTimeout(() => {
            promoInput.classList.remove('error');
        }, 2000);
    }
}

// Place order
function placeOrder() {
    const placeOrderBtn = document.querySelector('.place-order-btn');
    
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    // Add loading state
    placeOrderBtn.classList.add('loading');
    placeOrderBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    // Simulate order processing
    setTimeout(() => {
        // Success state
        placeOrderBtn.classList.remove('loading');
        placeOrderBtn.innerHTML = '<i class="fas fa-check"></i> Order Placed!';
        placeOrderBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        // Show success message
        showOrderSuccess();
        
        // Reset after 3 seconds
        setTimeout(() => {
            placeOrderBtn.innerHTML = '<i class="fas fa-lock"></i> Place Order';
            placeOrderBtn.style.background = '';
        }, 3000);
    }, 2000);
}

// Validate form
function validateForm() {
    const requiredFields = document.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
            
            setTimeout(() => {
                field.classList.remove('error');
            }, 2000);
        }
    });
    
    // Validate email format
    const emailField = document.getElementById('email');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            emailField.classList.add('error');
            isValid = false;
        }
    }
    
    // Validate card number if credit card is selected
    const selectedPayment = document.querySelector('input[name="payment"]:checked');
    if (selectedPayment && selectedPayment.value === 'credit-card') {
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
        if (cardNumber.length < 13 || cardNumber.length > 19) {
            document.getElementById('cardNumber').classList.add('error');
            isValid = false;
        }
        
        const expiryDate = document.getElementById('expiryDate').value;
        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            document.getElementById('expiryDate').classList.add('error');
            isValid = false;
        }
        
        const cvv = document.getElementById('cvv').value;
        if (cvv.length < 3) {
            document.getElementById('cvv').classList.add('error');
            isValid = false;
        }
    }
    
    return isValid;
}

// Show order success
function showOrderSuccess() {
    // Create success overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const successCard = document.createElement('div');
    successCard.style.cssText = `
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border-radius: 20px;
        padding: 40px;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.2);
        max-width: 400px;
        width: 90%;
    `;
    
    successCard.innerHTML = `
        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
            <i class="fas fa-check" style="font-size: 36px; color: white;"></i>
        </div>
        <h2 style="color: white; margin-bottom: 16px; font-size: 24px;">Order Confirmed!</h2>
        <p style="color: rgba(255, 255, 255, 0.8); margin-bottom: 24px;">Thank you for your purchase. You'll receive a confirmation email shortly.</p>
        <button onclick="this.closest('.overlay').remove()" style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); border: none; color: white; padding: 12px 24px; border-radius: 12px; cursor: pointer; font-weight: 600;">Continue Shopping</button>
    `;
    
    overlay.appendChild(successCard);
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (overlay.parentNode) {
            overlay.remove();
        }
    }, 5000);
}

// Auto-save form data (optional enhancement)
function autoSaveFormData() {
    const formInputs = document.querySelectorAll('input, select');
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            localStorage.setItem(`checkout_${input.name}`, input.value);
        });
    });
}

// Load saved form data
function loadSavedFormData() {
    const formInputs = document.querySelectorAll('input, select');
    formInputs.forEach(input => {
        const savedValue = localStorage.getItem(`checkout_${input.name}`);
        if (savedValue && input.type !== 'password') {
            input.value = savedValue;
        }
    });
}