// Custom Alert System
function showAlert(message, type = 'info', duration = 5000) {
    const alertContainer = document.getElementById('alertContainer');
    
    if (!alertContainer) {
        console.error('Alert container not found!');
        return;
    }
    
    const alertId = 'alert-' + Date.now();
    
    const alertHtml = `
        <div id="${alertId}" class="alert alert-${type} alert-dismissible fade show custom-alert" role="alert">
            <i class="fas fa-${getAlertIcon(type)} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" onclick="document.getElementById('${alertId}').remove()"></button>
        </div>
    `;
    
    alertContainer.insertAdjacentHTML('beforeend', alertHtml);
    
    // Auto remove after duration
    setTimeout(() => {
        const alertElement = document.getElementById(alertId);
        if (alertElement) {
            alertElement.remove();
        }
    }, duration);
}

function getAlertIcon(type) {
    const icons = {
        'success': 'check-circle',
        'danger': 'exclamation-triangle',
        'warning': 'exclamation-circle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Password Strength Checker
function checkPasswordStrength(password) {
    let strength = 0;
    const checks = {
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        numbers: /\d/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    strength = Object.values(checks).filter(Boolean).length;
    
    const strengthBar = document.getElementById('passwordStrength');
    const strengthText = document.getElementById('strengthText');
    
    strengthBar.className = 'password-strength';
    
    if (strength <= 1) {
        strengthBar.classList.add('strength-weak');
        strengthText.textContent = 'Weak';
        strengthText.className = 'text-danger';
    } else if (strength <= 2) {
        strengthBar.classList.add('strength-fair');
        strengthText.textContent = 'Fair';
        strengthText.className = 'text-warning';
    } else if (strength <= 3) {
        strengthBar.classList.add('strength-good');
        strengthText.textContent = 'Good';
        strengthText.className = 'text-info';
    } else {
        strengthBar.classList.add('strength-strong');
        strengthText.textContent = 'Strong';
        strengthText.className = 'text-success';
    }
    
    return strength;
}

// Toggle Password Visibility
function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const icon = field.nextElementSibling;
    
    if (field.type === 'password') {
        field.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        field.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Form Validation
function validateField(field, validationRules) {
    const value = field.value.trim();
    const feedback = field.parentElement.querySelector('.invalid-feedback');
    let isValid = true;
    let errorMessage = '';

    for (const rule of validationRules) {
        if (!rule.test(value)) {
            isValid = false;
            errorMessage = rule.message;
            break;
        }
    }

    if (isValid) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
    } else {
        field.classList.remove('is-valid');
        field.classList.add('is-invalid');
        feedback.textContent = errorMessage;
    }

    return isValid;
}

// Validation Rules
const validationRules = {
    firstName: [
        { test: (val) => val.length >= 2, message: 'First name must be at least 2 characters' },
        { test: (val) => /^[a-zA-Z\s]+$/.test(val), message: 'First name can only contain letters and spaces' }
    ],
    lastName: [
        { test: (val) => val.length >= 2, message: 'Last name must be at least 2 characters' },
        { test: (val) => /^[a-zA-Z\s]+$/.test(val), message: 'Last name can only contain letters and spaces' }
    ],
    email: [
        { test: (val) => val.length > 0, message: 'Email is required' },
        { test: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), message: 'Please enter a valid email address' }
    ],
    mobile: [
        { test: (val) => val.length > 0, message: 'Mobile number is required' },
        { test: (val) => /^[0-9]{10}$/.test(val), message: 'Mobile number must be exactly 10 digits' }
    ],
    password: [
        { test: (val) => val.length >= 8, message: 'Password must be at least 8 characters' },
        { test: (val) => /[A-Z]/.test(val), message: 'Password must contain at least one uppercase letter' },
        { test: (val) => /[a-z]/.test(val), message: 'Password must contain at least one lowercase letter' },
        { test: (val) => /\d/.test(val), message: 'Password must contain at least one number' }
    ],
    confirmPassword: [
        { test: (val) => val === document.getElementById('password').value, message: 'Passwords do not match' }
    ],
    dateOfBirth: [
        { test: (val) => val.length > 0, message: 'Date of birth is required' },
        { test: (val) => {
            const birthDate = new Date(val);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            return age >= 13 && age <= 120;
        }, message: 'You must be between 13 and 120 years old' }
    ],
    gender: [
        { test: (val) => val.length > 0, message: 'Please select your gender' }
    ],
    education: [
        { test: (val) => val.length >= 10, message: 'Education details must be at least 10 characters' }
    ],
    hobbies: [
        { test: (val) => val.length >= 5, message: 'Please enter at least one hobby' }
    ],
    interests: [
        { test: (val) => val.length >= 5, message: 'Please enter at least one interest' }
    ],
    agreeTerms: [
        { test: (val) => val, message: 'You must agree to the terms and conditions' }
    ]
};

// Social Login Functions
function socialLogin(provider) {
    showAlert(`Redirecting to ${provider} login...`, 'info', 2000);
    // Simulate social login
    setTimeout(() => {
        showAlert(`Successfully logged in with ${provider}!`, 'success');
        // Here you would typically redirect or handle the OAuth response
    }, 2000);
}

// Additional Functions
function switchToLogin() {
    showAlert('Login form would be displayed here', 'info');
}

function showForgotPassword() {
    showAlert('Password reset functionality would be displayed here', 'info');
}

function showTerms() {
    showAlert('Terms and Conditions would be displayed here', 'info');
}

function showPrivacy() {
    showAlert('Privacy Policy would be displayed here', 'info');
}

// Initialize Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    showAlert('Welcome to our registration system!', 'info', 3000);
    

    // Real-time validation
    Object.keys(validationRules).forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', () => validateField(field, validationRules[fieldId]));
            field.addEventListener('input', () => {
                if (field.classList.contains('is-invalid')) {
                    validateField(field, validationRules[fieldId]);
                }
            });
        }
    });

    // Password strength monitoring
    const passwordField = document.getElementById('password');
    if (passwordField) {
        passwordField.addEventListener('input', function() {
            checkPasswordStrength(this.value);
            // Re-validate confirm password if it has a value
            const confirmPassword = document.getElementById('confirmPassword');
            if (confirmPassword.value) {
                validateField(confirmPassword, validationRules.confirmPassword);
            }
        });
    }

    // Form Submission
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            let isFormValid = true;
            
            // Validate all fields
            Object.keys(validationRules).forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (field && !validateField(field, validationRules[fieldId])) {
                    isFormValid = false;
                }
            });

            if (!isFormValid) {
                showAlert('Please fix all validation errors before submitting', 'danger');
                return;
            }

            // Get form values
            const formData = {
                firstName: document.getElementById('firstName').value.trim(),
                lastName: document.getElementById('lastName').value.trim(),
                email: document.getElementById('email').value.trim(),
                mobile: document.getElementById('mobile').value.trim(),
                password: document.getElementById('password').value,
                dateOfBirth: document.getElementById('dateOfBirth').value,
                gender: document.getElementById('gender').value,
                education: document.getElementById('education').value.trim(),
                hobbies: document.getElementById('hobbies').value.trim(),
                interests: document.getElementById('interests').value.trim(),
                registrationDate: new Date().toLocaleString()
            };

            // Show success message first
            showAlert('<i class="fas fa-check-circle me-2"></i><strong>It has been created!</strong>', 'success', 4000);
            
            // Show detailed account information after a short delay
            setTimeout(() => {
                const accountDetails = `
                    <div class="alert alert-info">
                        <h5><i class="fas fa-user me-2"></i>Account Details</h5>
                        <hr>
                        <div class="row">
                            <div class="col-md-6">
                                <strong>Name:</strong> ${formData.firstName} ${formData.lastName}<br>
                                <strong>Email:</strong> ${formData.email}<br>
                                <strong>Mobile:</strong> ${formData.mobile}<br>
                                <strong>Gender:</strong> ${formData.gender}<br>
                                <strong>Date of Birth:</strong> ${formData.dateOfBirth}
                            </div>
                            <div class="col-md-6">
                                <strong>Education:</strong> ${formData.education}<br>
                                <strong>Hobbies:</strong> ${formData.hobbies}<br>
                                <strong>Interests:</strong> ${formData.interests}<br>
                                <strong>Registration Date:</strong> ${formData.registrationDate}
                            </div>
                        </div>
                        <hr>
                        <small class="text-muted"><i class="fas fa-info-circle me-1"></i>Welcome to our platform! You can now sign in with your credentials.</small>
                    </div>
                `;
                
                showAlert(accountDetails, 'info', 8000);
            }, 1500);
            
            // Clear form
            this.reset();
            
            // Remove validation classes
            document.querySelectorAll('.form-control').forEach(field => {
                field.classList.remove('is-valid', 'is-invalid');
            });
            
            // Reset password strength
            const strengthBar = document.getElementById('passwordStrength');
            const strengthText = document.getElementById('strengthText');
            if (strengthBar) strengthBar.className = 'password-strength';
            if (strengthText) {
                strengthText.textContent = 'None';
                strengthText.className = '';
            }
        });
    }
});
