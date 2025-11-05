// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('contactSuccessMessage');
    const newMessageBtn = document.getElementById('newMessageBtn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateContactForm()) {
                // In a real application, you would send the form data to a server
                // For this demo, we'll simulate a successful submission
                simulateFormSubmission();
            }
        });
    }
    
    if (newMessageBtn) {
        newMessageBtn.addEventListener('click', function() {
            contactForm.reset();
            contactForm.style.display = 'block';
            successMessage.style.display = 'none';
        });
    }
});

function validateContactForm() {
    let isValid = true;
    
    // Reset errors
    clearAllErrors();
    
    // Name validation
    const name = document.getElementById('contactName').value.trim();
    if (name.length < 2) {
        showError('contactName', 'Please enter your full name');
        isValid = false;
    }
    
    // Email validation
    const email = document.getElementById('contactEmail').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('contactEmail', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Subject validation
    const subject = document.getElementById('subject').value.trim();
    if (subject.length < 5) {
        showError('subject', 'Please enter a descriptive subject');
        isValid = false;
    }
    
    // Message validation
    const message = document.getElementById('contactMessage').value.trim();
    if (message.length < 10) {
        showError('contactMessage', 'Please provide a more detailed message (at least 10 characters)');
        isValid = false;
    }
    
    return isValid;
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.id = fieldId + 'Error';
    errorElement.textContent = message;
    
    field.classList.add('error');
    field.parentNode.appendChild(errorElement);
}

function clearAllErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    
    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach(field => field.classList.remove('error'));
}

function simulateFormSubmission() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('contactSuccessMessage');
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Hide form and show success message
        contactForm.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 1500);
}

// Email functionality (would require backend integration in a real application)
function sendEmail(formData) {
    // This is a placeholder function
    // In a real application, you would:
    // 1. Send the form data to your server
    // 2. Use a service like EmailJS, Formspree, or a backend API
    // 3. Handle the response and show appropriate messages
    
    console.log('Form data to be sent:', formData);
    
    // Example using EmailJS (would require setup):
    /*
    emailjs.send('service_id', 'template_id', formData)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showSuccessMessage();
        }, function(error) {
            console.log('FAILED...', error);
            showErrorMessage();
        });
    */
    
    return true; // Simulate success
}