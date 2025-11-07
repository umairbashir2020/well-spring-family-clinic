// // Contact Form Handling
// document.addEventListener('DOMContentLoaded', function() {
//     const contactForm = document.getElementById('contactForm');
//     const successMessage = document.getElementById('contactSuccessMessage');
//     const newMessageBtn = document.getElementById('newMessageBtn');
    
//     if (contactForm) {
//         contactForm.addEventListener('submit', function(e) {
//             e.preventDefault();
            
//             if (validateContactForm()) {
//                 // In a real application, you would send the form data to a server
//                 // For this demo, we'll simulate a successful submission
//                 simulateFormSubmission();
//             }
//         });
//     }
    
//     if (newMessageBtn) {
//         newMessageBtn.addEventListener('click', function() {
//             contactForm.reset();
//             contactForm.style.display = 'block';
//             successMessage.style.display = 'none';
//         });
//     }
// });

// function validateContactForm() {
//     let isValid = true;
    
//     // Reset errors
//     clearAllErrors();
    
//     // Name validation
//     const name = document.getElementById('contactName').value.trim();
//     if (name.length < 2) {
//         showError('contactName', 'Please enter your full name');
//         isValid = false;
//     }
    
//     // Email validation
//     const email = document.getElementById('contactEmail').value.trim();
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//         showError('contactEmail', 'Please enter a valid email address');
//         isValid = false;
//     }
    
//     // Subject validation
//     const subject = document.getElementById('subject').value.trim();
//     if (subject.length < 5) {
//         showError('subject', 'Please enter a descriptive subject');
//         isValid = false;
//     }
    
//     // Message validation
//     const message = document.getElementById('contactMessage').value.trim();
//     if (message.length < 10) {
//         showError('contactMessage', 'Please provide a more detailed message (at least 10 characters)');
//         isValid = false;
//     }
    
//     return isValid;
// }

// function showError(fieldId, message) {
//     const field = document.getElementById(fieldId);
//     const errorElement = document.createElement('span');
//     errorElement.className = 'error-message';
//     errorElement.id = fieldId + 'Error';
//     errorElement.textContent = message;
    
//     field.classList.add('error');
//     field.parentNode.appendChild(errorElement);
// }

// function clearAllErrors() {
//     const errorMessages = document.querySelectorAll('.error-message');
//     errorMessages.forEach(error => error.remove());
    
//     const errorFields = document.querySelectorAll('.error');
//     errorFields.forEach(field => field.classList.remove('error'));
// }

// function simulateFormSubmission() {
//     const contactForm = document.getElementById('contactForm');
//     const successMessage = document.getElementById('contactSuccessMessage');
    
//     // Show loading state
//     const submitBtn = contactForm.querySelector('.submit-btn');
//     const originalText = submitBtn.textContent;
//     submitBtn.textContent = 'Sending...';
//     submitBtn.disabled = true;
    
//     // Simulate API call delay
//     setTimeout(() => {
//         // Hide form and show success message
//         contactForm.style.display = 'none';
//         successMessage.style.display = 'block';
        
//         // Reset button
//         submitBtn.textContent = originalText;
//         submitBtn.disabled = false;
        
//         // Scroll to success message
//         successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
//     }, 1500);
// }

// // Email functionality (would require backend integration in a real application)
// function sendEmail(formData) {
//     // This is a placeholder function
//     // In a real application, you would:
//     // 1. Send the form data to your server
//     // 2. Use a service like EmailJS, Formspree, or a backend API
//     // 3. Handle the response and show appropriate messages
    
//     console.log('Form data to be sent:', formData);
    
//     // Example using EmailJS (would require setup):
//     /*
//     emailjs.send('service_id', 'template_id', formData)
//         .then(function(response) {
//             console.log('SUCCESS!', response.status, response.text);
//             showSuccessMessage();
//         }, function(error) {
//             console.log('FAILED...', error);
//             showErrorMessage();
//         });
//     */
    
//     return true; // Simulate success
// }













// Enhanced Contact Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('contactSuccessMessage');
    const newMessageBtn = document.getElementById('newMessageBtn');
    
    // Form fields
    const contactName = document.getElementById('contactName');
    const contactEmail = document.getElementById('contactEmail');
    const contactPhone = document.getElementById('contactPhone');
    const subject = document.getElementById('subject');
    const contactMessage = document.getElementById('contactMessage');

    // Real-time validation as user types
    if (contactName) contactName.addEventListener('input', validateContactName);
    if (contactEmail) contactEmail.addEventListener('input', validateContactEmail);
    if (contactPhone) contactPhone.addEventListener('input', validateContactPhone);
    if (subject) subject.addEventListener('input', validateSubject);
    if (contactMessage) contactMessage.addEventListener('input', validateContactMessage);
    
    // Phone number formatting
    if (contactPhone) {
        contactPhone.addEventListener('input', formatContactPhone);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            const isNameValid = validateContactName();
            const isEmailValid = validateContactEmail();
            const isPhoneValid = validateContactPhone();
            const isSubjectValid = validateSubject();
            const isMessageValid = validateContactMessage();
            
            if (isNameValid && isEmailValid && isPhoneValid && isSubjectValid && isMessageValid) {
                simulateFormSubmission();
            } else {
                // Scroll to first error
                scrollToFirstContactError();
            }
        });
    }
    
    if (newMessageBtn) {
        newMessageBtn.addEventListener('click', function() {
            contactForm.reset();
            contactForm.style.display = 'block';
            successMessage.style.display = 'none';
            clearAllContactErrors();
        });
    }

    // Validation Functions
    function validateContactName() {
        const value = contactName.value.trim();
        const nameError = document.getElementById('contactNameError');
        
        if (value === '') {
            showContactError(nameError, 'Full name is required');
            addErrorStyle(contactName);
            return false;
        } else if (value.length < 2) {
            showContactError(nameError, 'Name must be at least 2 characters long');
            addErrorStyle(contactName);
            return false;
        } else if (!/^[a-zA-Z\s.'-]+$/.test(value)) {
            showContactError(nameError, 'Name can only contain letters, spaces, hyphens, and apostrophes');
            addErrorStyle(contactName);
            return false;
        } else if (value.length > 50) {
            showContactError(nameError, 'Name must be less than 50 characters');
            addErrorStyle(contactName);
            return false;
        } else {
            hideContactError(nameError);
            removeErrorStyle(contactName);
            return true;
        }
    }

    function validateContactEmail() {
        const value = contactEmail.value.trim();
        const emailError = document.getElementById('contactEmailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (value === '') {
            showContactError(emailError, 'Email address is required');
            addErrorStyle(contactEmail);
            return false;
        } else if (!emailRegex.test(value)) {
            showContactError(emailError, 'Please enter a valid email address (e.g., name@example.com)');
            addErrorStyle(contactEmail);
            return false;
        } else if (value.length > 100) {
            showContactError(emailError, 'Email must be less than 100 characters');
            addErrorStyle(contactEmail);
            return false;
        } else {
            hideContactError(emailError);
            removeErrorStyle(contactEmail);
            return true;
        }
    }

    function validateContactPhone() {
        const value = contactPhone.value.trim();
        
        // Phone is optional, but if provided, validate it
        if (value === '') {
            removeErrorStyle(contactPhone);
            return true;
        }
        
        // Australian phone number regex (supports various formats)
        const phoneRegex = /^(\+?61|0)[2-478](?:[ -]?[0-9]){8}$|^(\+?61|0)[2-478](?:[ -]?\([0-9]\)|[ -]?[0-9]){8}$/;
        const cleanPhone = value.replace(/\s|\(|\)|-/g, '');
        
        if (!phoneRegex.test(cleanPhone)) {
            // Don't show error for optional field, but mark it as invalid
            addErrorStyle(contactPhone);
            return false;
        } else {
            removeErrorStyle(contactPhone);
            return true;
        }
    }

    function validateSubject() {
        const value = subject.value.trim();
        const subjectError = document.getElementById('subjectError');
        
        if (value === '') {
            showContactError(subjectError, 'Subject is required');
            addErrorStyle(subject);
            return false;
        } else if (value.length < 5) {
            showContactError(subjectError, 'Subject must be at least 5 characters long');
            addErrorStyle(subject);
            return false;
        } else if (value.length > 100) {
            showContactError(subjectError, 'Subject must be less than 100 characters');
            addErrorStyle(subject);
            return false;
        } else {
            hideContactError(subjectError);
            removeErrorStyle(subject);
            return true;
        }
    }

    function validateContactMessage() {
        const value = contactMessage.value.trim();
        const messageError = document.getElementById('contactMessageError');
        
        if (value === '') {
            showContactError(messageError, 'Message is required');
            addErrorStyle(contactMessage);
            return false;
        } else if (value.length < 10) {
            showContactError(messageError, 'Message must be at least 10 characters long');
            addErrorStyle(contactMessage);
            return false;
        } else if (value.length > 1000) {
            showContactError(messageError, 'Message must be less than 1000 characters');
            addErrorStyle(contactMessage);
            return false;
        } else {
            hideContactError(messageError);
            removeErrorStyle(contactMessage);
            return true;
        }
    }

    // Phone number formatting function
    function formatContactPhone(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.startsWith('0')) {
            // Australian landline or mobile format
            if (value.length <= 2) {
                value = value;
            } else if (value.length <= 6) {
                value = value.replace(/(\d{2})(\d{0,4})/, '$1 $2');
            } else if (value.length <= 10) {
                value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '$1 $2 $3');
            } else {
                value = value.replace(/(\d{2})(\d{4})(\d{4})/, '$1 $2 $3');
            }
        } else if (value.startsWith('61')) {
            // International format for Australia
            if (value.length <= 3) {
                value = '+' + value;
            } else if (value.length <= 5) {
                value = value.replace(/(\d{2})(\d{0,3})/, '+$1 $2');
            } else if (value.length <= 9) {
                value = value.replace(/(\d{2})(\d{1})(\d{0,6})/, '+$1 $2 $3');
            } else {
                value = value.replace(/(\d{2})(\d{1})(\d{4})(\d{0,4})/, '+$1 $2 $3 $4');
            }
        }
        
        e.target.value = value;
    }

    // Utility Functions
    function showContactError(errorElement, message) {
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function hideContactError(errorElement) {
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }

    function addErrorStyle(field) {
        if (field) {
            field.style.borderColor = '#d9534f';
            field.style.backgroundColor = '#fdf7f7';
        }
    }

    function removeErrorStyle(field) {
        if (field) {
            field.style.borderColor = '';
            field.style.backgroundColor = '';
        }
    }

    function clearAllContactErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });
        
        // Remove error styles from all fields
        const fields = [contactName, contactEmail, contactPhone, subject, contactMessage];
        fields.forEach(field => {
            if (field) removeErrorStyle(field);
        });
    }

    function scrollToFirstContactError() {
        const firstError = document.querySelector('.error-message[style="display: block;"]');
        if (firstError) {
            firstError.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    }

    function simulateFormSubmission() {
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            // Get form data
            const formData = {
                contactName: contactName.value.trim(),
                contactEmail: contactEmail.value.trim(),
                contactPhone: contactPhone.value.trim(),
                subject: subject.value.trim(),
                contactMessage: contactMessage.value.trim(),
                submittedAt: new Date().toISOString()
            };
            
            console.log('Contact Form Data Submitted:', formData);
            
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

    // Character counter for message
    if (contactMessage) {
        const charCounter = document.createElement('div');
        charCounter.style.fontSize = '0.8rem';
        charCounter.style.color = '#6c757d';
        charCounter.style.marginTop = '0.5rem';
        charCounter.textContent = '0/1000 characters';
        contactMessage.parentNode.appendChild(charCounter);

        contactMessage.addEventListener('input', function() {
            const length = this.value.length;
            charCounter.textContent = `${length}/1000 characters`;
            
            if (length > 1000) {
                charCounter.style.color = '#d9534f';
            } else if (length > 800) {
                charCounter.style.color = '#f0ad4e';
            } else {
                charCounter.style.color = '#6c757d';
            }
        });

        // Limit message to 1000 characters
        contactMessage.addEventListener('input', function() {
            if (this.value.length > 1000) {
                this.value = this.value.substring(0, 1000);
            }
        });
    }
});

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