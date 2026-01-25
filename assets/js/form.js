/* ================================================
   FORM HANDLING & FIRESTORE SUBMISSION
   
   Handles client-side validation and Firestore data submission.
   ================================================ */

// Dark Mode Toggle & Hamburger Menu & Form Handling
document.addEventListener('DOMContentLoaded', function() {
    // ===== HAMBURGER MENU =====
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenuWrapper = document.querySelector('.nav-menu-wrapper');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburgerMenu.addEventListener('click', function() {
        hamburgerMenu.classList.toggle('active');
        navMenuWrapper.classList.toggle('active');
    });

    // Close menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburgerMenu.classList.remove('active');
            navMenuWrapper.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            hamburgerMenu.classList.remove('active');
            navMenuWrapper.classList.remove('active');
        }
    });

    // ===== DARK MODE TOGGLE =====
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const toggleIcon = darkModeToggle.querySelector('.toggle-icon');
    const html = document.documentElement;
    
    // Check localStorage for saved preference, default to dark mode
    const savedMode = localStorage.getItem('darkMode');
    const isDarkMode = savedMode === null ? true : savedMode === 'true';
    
    // Set initial dark mode state
    if (isDarkMode) {
        html.setAttribute('data-theme', 'dark');
        toggleIcon.textContent = '🌙';
    } else {
        html.setAttribute('data-theme', 'light');
        toggleIcon.textContent = '☀️';
    }
    
    // Dark mode toggle handler
    darkModeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('darkMode', newTheme === 'dark');
        toggleIcon.textContent = newTheme === 'dark' ? '🌙' : '☀️';
    });

    // ===== FORM HANDLING =====
    const form = document.getElementById('inquiry-form');
    const formMessage = document.getElementById('form-message');

    // Form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Check if Firebase is initialized
        if (!window.db) {
            formMessage.textContent = 'Error: Firebase not initialized. Please refresh the page.';
            formMessage.className = 'form-message error';
            return;
        }

        // Disable submit button during submission
        const submitButton = form.querySelector('.submit-button');
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        // Clear previous message
        formMessage.textContent = '';
        formMessage.className = 'form-message';

        // Collect form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            platform: document.getElementById('platform').value,
            audience: document.getElementById('audience').value.trim(),
            frequency: document.getElementById('frequency').value.trim(),
            budget: document.getElementById('budget').value,
            message: document.getElementById('message').value.trim(),
            timestamp: new Date().toISOString(),
            submittedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        // Validate form data
        const validation = validateForm(formData);
        if (!validation.valid) {
            formMessage.textContent = validation.error;
            formMessage.className = 'form-message error';
            submitButton.disabled = false;
            submitButton.textContent = 'Submit Inquiry';
            return;
        }

        try {
            // Submit to Firestore
            await window.db.collection('inquiries').add(formData);

            // Success message
            formMessage.textContent = 'Thanks. If we\'re a fit, we\'ll reach out.';
            formMessage.className = 'form-message success';

            // Reset form
            form.reset();

            // Keep message visible for 5 seconds, then clear
            setTimeout(function() {
                formMessage.textContent = '';
            }, 5000);

        } catch (error) {
            console.error('Error submitting form:', error);
            formMessage.textContent = 'Something went wrong. Please try again.';
            formMessage.className = 'form-message error';
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Submit Inquiry';
        }
    });

    /**
     * Validates form data
     * @param {Object} data - Form data object
     * @returns {Object} Validation result with valid and error properties
     */
    function validateForm(data) {
        // Check required fields
        if (!data.name || data.name.length < 2) {
            return { valid: false, error: 'Please enter a valid name.' };
        }

        if (!data.email || !isValidEmail(data.email)) {
            return { valid: false, error: 'Please enter a valid email address.' };
        }

        if (!data.platform) {
            return { valid: false, error: 'Please select a platform.' };
        }

        if (!data.audience || data.audience.length < 2) {
            return { valid: false, error: 'Please enter your audience size.' };
        }

        if (!data.frequency || data.frequency.length < 2) {
            return { valid: false, error: 'Please enter your posting frequency.' };
        }

        if (!data.budget) {
            return { valid: false, error: 'Please select a budget range.' };
        }

        if (!data.message || data.message.length < 10) {
            return { valid: false, error: 'Please write a message (at least 10 characters).' };
        }

        return { valid: true };
    }

    /**
     * Simple email validation
     * @param {string} email - Email address to validate
     * @returns {boolean} True if email is valid format
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
