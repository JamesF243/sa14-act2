const form = document.getElementById('registration-form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    if (validateForm()) {
        alert('Registration successful!');
        form.reset();
    }
});

function validateForm() {
    let isValid = true;

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Validate username
    if (username.length < 6) {
        displayError('username', 'Username must be at least 6 characters long');
        isValid = false;
    } else {
        clearError('username');
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        displayError('email', 'Invalid email format');
        isValid = false;
    } else {
        clearError('email');
    }

    // Validate password
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordPattern.test(password)) {
        displayError('password', 'Password must be at least 8 characters long and contain at least one capital letter and one number');
        isValid = false;
    } else {
        clearError('password');
    }

    return isValid;
}

function displayError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}
