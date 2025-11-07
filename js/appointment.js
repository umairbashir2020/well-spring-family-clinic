 //  Form Validation & send email 
        document.addEventListener('DOMContentLoaded', function() {
            const appointmentForm = document.getElementById('appointmentForm');
            const successMessage = document.getElementById('successMessage');
            
            // Form fields
            const fullName = document.getElementById('fullName');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const preferredDate = document.getElementById('preferredDate');
            const preferredTime = document.getElementById('preferredTime');
            const serviceType = document.getElementById('serviceType');
            const message = document.getElementById('message');

            // Set minimum date to today
            const today = new Date().toISOString().split('T')[0];
            preferredDate.setAttribute('min', today);

            // Real-time validation as user types
            fullName.addEventListener('input', validateName);
            email.addEventListener('input', validateEmail);
            phone.addEventListener('input', validatePhone);
            preferredDate.addEventListener('change', validateDate);
            
            // Add input event for phone formatting
            phone.addEventListener('input', formatPhoneNumber);

            // Form submission
            appointmentForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validate all fields
                const isNameValid = validateName();
                const isEmailValid = validateEmail();
                const isPhoneValid = validatePhone();
                const isDateValid = validateDate();
                
                if (isNameValid && isEmailValid && isPhoneValid && isDateValid) {
                    submitAppointment();
                } else {
                    // Scroll to first error
                    scrollToFirstError();
                }
        });

        // Reset form for new request
        document.getElementById('newRequestBtn').addEventListener('click', function() {
            appointmentForm.reset();
            appointmentForm.style.display = 'block';
            successMessage.style.display = 'none';
            clearAllErrors();
            
            // Reset min date
            preferredDate.setAttribute('min', today);
        });

        // Validation Functions
        function validateName() {
            const value = fullName.value.trim();
            const nameError = document.getElementById('nameError');
            
            if (value === '') {
                showError(nameError, 'Full name is required');
                addErrorStyle(fullName);
                return false;
            } else if (value.length < 2) {
                showError(nameError, 'Name must be at least 2 characters long');
                addErrorStyle(fullName);
                return false;
            } else if (!/^[a-zA-Z\s.'-]+$/.test(value)) {
                showError(nameError, 'Name can only contain letters, spaces, hyphens, and apostrophes');
                addErrorStyle(fullName);
                return false;
            } else if (value.length > 50) {
                showError(nameError, 'Name must be less than 50 characters');
                addErrorStyle(fullName);
                return false;
            } else {
                hideError(nameError);
                removeErrorStyle(fullName);
                return true;
            }
        }

        function validateEmail() {
            const value = email.value.trim();
            const emailError = document.getElementById('emailError');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (value === '') {
                showError(emailError, 'Email address is required');
                addErrorStyle(email);
                return false;
            } else if (!emailRegex.test(value)) {
                showError(emailError, 'Please enter a valid email address (e.g., name@example.com)');
                addErrorStyle(email);
                return false;
            } else if (value.length > 100) {
                showError(emailError, 'Email must be less than 100 characters');
                addErrorStyle(email);
                return false;
            } else {
                hideError(emailError);
                removeErrorStyle(email);
                return true;
            }
        }

        function validatePhone() {
            const value = phone.value.trim();
            const phoneError = document.getElementById('phoneError');
            
            // Australian phone number regex (supports various formats)
            const phoneRegex = /^(\+?61|0)[2-478](?:[ -]?[0-9]){8}$|^(\+?61|0)[2-478](?:[ -]?\([0-9]\)|[ -]?[0-9]){8}$/;
            const cleanPhone = value.replace(/\s|\(|\)|-/g, '');
            
            if (value === '') {
                showError(phoneError, 'Phone number is required');
                addErrorStyle(phone);
                return false;
            } else if (!phoneRegex.test(cleanPhone)) {
                showError(phoneError, 'Please enter a valid Australian phone number (e.g., 0412 345 678 or 02 1234 5678)');
                addErrorStyle(phone);
                return false;
            } else {
                hideError(phoneError);
                removeErrorStyle(phone);
                return true;
            }
        }

        function validateDate() {
            const value = preferredDate.value;
            const dateError = document.getElementById('dateError');
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (value === '') {
                showError(dateError, 'Preferred date is required');
                addErrorStyle(preferredDate);
                return false;
            } else if (selectedDate < today) {
                showError(dateError, 'Please select a future date');
                addErrorStyle(preferredDate);
                return false;
            } else {
                // Check if selected date is within next 3 months
                const maxDate = new Date();
                maxDate.setMonth(maxDate.getMonth() + 3);
                
                if (selectedDate > maxDate) {
                    showError(dateError, 'Appointments can only be booked up to 3 months in advance');
                    addErrorStyle(preferredDate);
                    return false;
                }
                
                // Check if weekend (optional - remove if you accept weekend appointments)
                const day = selectedDate.getDay();
                if (day === 0 || day === 6) {
                    showError(dateError, 'Weekend appointments are not available. Please select a weekday.');
                    addErrorStyle(preferredDate);
                    return false;
                }
                
                hideError(dateError);
                removeErrorStyle(preferredDate);
                return true;
            }
        }

        // Phone number formatting function
        function formatPhoneNumber(e) {
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
        function showError(errorElement, message) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }

        function hideError(errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }

        function addErrorStyle(field) {
            field.style.borderColor = '#d9534f';
            field.style.backgroundColor = '#fdf7f7';
        }

        function removeErrorStyle(field) {
            field.style.borderColor = '';
            field.style.backgroundColor = '';
        }

        function clearAllErrors() {
            const errorElements = document.querySelectorAll('.error-message');
            errorElements.forEach(element => {
                element.textContent = '';
                element.style.display = 'none';
            });
            
            // Remove error styles from all fields
            const fields = [fullName, email, phone, preferredDate];
            fields.forEach(field => removeErrorStyle(field));
        }

        function scrollToFirstError() {
            const firstError = document.querySelector('.error-message[style="display: block;"]');
            if (firstError) {
                firstError.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
        }

        function submitAppointment() {
            // Show loading state
            const submitBtn = appointmentForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;

            // 
            setTimeout(() => {
                // Get form data
                const formData = {
                    fullName: fullName.value.trim(),
                    email: email.value.trim(),
                    phone: phone.value.trim(),
                    preferredDate: preferredDate.value,
                    preferredTime: preferredTime.value,
                    serviceType: serviceType.value,
                    message: message.value.trim(),
                    submittedAt: new Date().toISOString()
                };
                
                console.log('Appointment Data Submitted:', formData);
                
                // Show success message
                appointmentForm.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
            }, 1500);
        }

        if (message) {
            const charCounter = document.createElement('div');
            charCounter.style.fontSize = '0.8rem';
            charCounter.style.color = '#6c757d';
            charCounter.style.marginTop = '0.5rem';
            charCounter.textContent = '0/500 characters';
            message.parentNode.appendChild(charCounter);

            message.addEventListener('input', function() {
                const length = this.value.length;
                charCounter.textContent = `${length}/500 characters`;
                
                if (length > 500) {
                    charCounter.style.color = '#d9534f';
                } else if (length > 400) {
                    charCounter.style.color = '#f0ad4e';
                } else {
                    charCounter.style.color = '#6c757d';
                }
            });

            // Limit message to 500 characters
            message.addEventListener('input', function() {
                if (this.value.length > 500) {
                    this.value = this.value.substring(0, 500);
                }
            });
        }
        });