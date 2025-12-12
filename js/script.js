// ===== MAIN APPLICATION =====
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initMobileMenu();
    initSmoothScroll();
    initNewsletterForm();
    initCourseCards();
    initTestimonialCards();
    initAnimations();
    initScrollEffects();
    initThemeToggle();
    initCopyrightYear();

    console.log('Loop Learning website initialized successfully! 🚀');
});

// ===== MOBILE MENU TOGGLE =====
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);

            // Update icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.className = isExpanded ? 'fas fa-times' : 'fas fa-bars';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!navLinks.contains(event.target) && !mobileToggle.contains(event.target)) {
                navLinks.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });

        // Handle Escape key
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        });
    }
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    // Select all links that start with #
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL hash
                history.pushState(null, null, targetId);
            }
        });
    });
}

// ===== NEWSLETTER FORM =====
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button[type="submit"]');
            const email = emailInput.value.trim();

            if (!isValidEmail(email)) {
                showFormMessage(this, 'Please enter a valid email address.', 'error');
                return;
            }

            // Show loading state
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            submitButton.disabled = true;

            // Simulate API call
            setTimeout(() => {
                // Reset form
                this.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;

                // Show success message
                showFormMessage(this, 'Thank you for subscribing! You\'ll receive updates soon.', 'success');

                // Track subscription
                console.log('New subscriber:', email);
            }, 1500);
        });
    }
}

// ===== COURSE CARDS INTERACTIONS =====
function initCourseCards() {
    const courseCards = document.querySelectorAll('.course-card');

    courseCards.forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(-10px) scale(1)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });

        // Add click event for enrollment
        const enrollButton = card.querySelector('.btn-primary');
        if (enrollButton) {
            enrollButton.addEventListener('click', function (event) {
                event.preventDefault();
                event.stopPropagation();

                const courseTitle = card.querySelector('h3').textContent;
                const coursePrice = card.querySelector('.price-current').textContent;

                showModal({
                    title: 'Enroll in Course',
                    content: `You're about to enroll in <strong>${courseTitle}</strong> for ${coursePrice}.`,
                    type: 'enrollment',
                    courseTitle: courseTitle
                });
            });
        }
    });
}

// ===== TESTIMONIAL CARDS INTERACTIONS =====
function initTestimonialCards() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    testimonialCards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.animationDelay = `${index * 0.2}s`;

        // Add hover effect
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(-5px)';
        });
    });
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Add animation classes on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');

                // Add specific animations based on element type
                if (entry.target.classList.contains('benefit-card')) {
                    entry.target.style.animationDelay = `${entry.target.dataset.index * 0.1}s`;
                }

                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements to animate
    const elementsToAnimate = document.querySelectorAll(
        '.benefit-card, .course-card, .testimonial-card, .stat-card'
    );

    elementsToAnimate.forEach((element, index) => {
        element.dataset.index = index;
        observer.observe(element);
    });

    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('fade-in');
        }, 300);
    }
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Header background on scroll
        if (scrollTop > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(var(--bg-white-rgb), 0.98)';
        } else {
            header.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
            header.style.background = 'rgba(var(--bg-white-rgb), 0.95)';
        }

        // Header hide/show on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;

        // Update active nav link
        updateActiveNavLink();
    });

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        let currentSection = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';

    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Apply saved theme
    applyTheme(savedTheme);

    // Update button icon based on current theme
    updateThemeIcon(themeToggle, savedTheme);

    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
            updateThemeIcon(themeToggle, e.matches ? 'dark' : 'light');
        }
    });

    // Add click event
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
        updateThemeIcon(themeToggle, newTheme);
    });

    // Add to header
    const navButtons = document.querySelector('.nav-buttons');
    if (navButtons) {
        // Insert before mobile toggle
        navButtons.insertBefore(themeToggle, navButtons.querySelector('.mobile-toggle'));
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Dispatch event for other components if needed
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
    }

    function updateThemeIcon(button, theme) {
        const icon = button.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            button.setAttribute('aria-label', 'Switch to light theme');
        } else {
            icon.className = 'fas fa-moon';
            button.setAttribute('aria-label', 'Switch to dark theme');
        }
    }
}

// ===== COPYRIGHT YEAR =====
function initCopyrightYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
}

// ===== MODAL SYSTEM =====
function showModal(options) {
    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <button class="modal-close" aria-label="Close modal">
                <i class="fas fa-times"></i>
            </button>
            <h3>${options.title}</h3>
            <div class="modal-body">
                ${options.content}
            </div>
            <div class="modal-footer">
                ${options.type === 'enrollment' ? `
                    <button class="btn btn-outline modal-cancel">Cancel</button>
                    <button class="btn btn-primary modal-confirm">Confirm Enrollment</button>
                ` : `
                    <button class="btn btn-primary modal-close-btn">Close</button>
                `}
            </div>
        </div>
    `;

    // Add modal styles
    addModalStyles();

    // Add to document
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Add event listeners
    const closeButtons = modal.querySelectorAll('.modal-close, .modal-cancel, .modal-close-btn');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => closeModal(modal));
    });

    modal.querySelector('.modal-backdrop').addEventListener('click', () => closeModal(modal));

    // Handle enrollment confirmation
    const confirmButton = modal.querySelector('.modal-confirm');
    if (confirmButton) {
        confirmButton.addEventListener('click', () => {
            handleEnrollment(options.courseTitle);
            closeModal(modal);
        });
    }

    // Handle Escape key
    document.addEventListener('keydown', function handleEscape(event) {
        if (event.key === 'Escape') {
            closeModal(modal);
            document.removeEventListener('keydown', handleEscape);
        }
    });

    // Animate in
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);

    function closeModal(modalElement) {
        modalElement.classList.remove('active');
        setTimeout(() => {
            if (modalElement.parentNode) {
                modalElement.parentNode.removeChild(modalElement);
            }
            document.body.style.overflow = '';
        }, 300);
    }

    function handleEnrollment(courseTitle) {
        // Show success message
        console.log(`Successfully enrolled in ${courseTitle}!`);
        alert(`Successfully enrolled in ${courseTitle}! Check your email for confirmation.`);
    }
}

function addModalStyles() {
    if (!document.querySelector('#modal-styles')) {
        const styles = document.createElement('style');
        styles.id = 'modal-styles';
        styles.textContent = `
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 2000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s ease, visibility 0.3s ease;
            }
            
            .modal.active {
                opacity: 1;
                visibility: visible;
            }
            
            .modal-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(4px);
            }
            
            .modal-content {
                position: relative;
                background: var(--bg-white);
                border-radius: 1rem;
                padding: 2rem;
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                transform: translateY(20px);
                transition: transform 0.3s ease;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }
            
            .modal.active .modal-content {
                transform: translateY(0);
            }
            
            .modal-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--text-light);
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 0.5rem;
                transition: all 0.2s ease;
            }
            
            .modal-close:hover {
                color: var(--danger);
                background: var(--bg-gray);
            }
            
            .modal h3 {
                margin-bottom: 1rem;
                color: var(--text-dark);
            }
            
            .modal-body {
                margin-bottom: 2rem;
                color: var(--text-medium);
                line-height: 1.6;
            }
            
            .modal-footer {
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
            }
        `;
        document.head.appendChild(styles);
    }
}

// ===== FORM MESSAGES =====
function showFormMessage(form, message, type = 'info') {
    // Remove existing messages
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message-${type}`;
    messageElement.textContent = message;

    // Add styles if not already added
    if (!document.querySelector('#form-message-styles')) {
        const styles = document.createElement('style');
        styles.id = 'form-message-styles';
        styles.textContent = `
            .form-message {
                margin-top: 1rem;
                padding: 0.75rem 1rem;
                border-radius: 0.5rem;
                font-size: 0.875rem;
                font-weight: 500;
            }
            
            .form-message-success {
                background: var(--bg-purple);
                color: var(--primary-dark);
                border: 1px solid var(--primary-light);
            }
            
            .form-message-error {
                background: rgba(239, 68, 68, 0.1);
                color: var(--danger);
                border: 1px solid rgba(239, 68, 68, 0.2);
            }
            
            .form-message-info {
                background: rgba(59, 130, 246, 0.1);
                color: var(--info);
                border: 1px solid rgba(59, 130, 246, 0.2);
            }
        `;
        document.head.appendChild(styles);
    }

    // Insert after form
    form.parentNode.insertBefore(messageElement, form.nextSibling);

    // Auto remove after 5 seconds
    if (type !== 'error') {
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 5000);
    }
}

// ===== UTILITY FUNCTIONS =====
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function (event) {
    console.error('JavaScript Error:', event.error);
});

// ===== PROGRESSIVE ENHANCEMENT =====
// Check for JavaScript support and add no-js class removal
document.documentElement.className =
    document.documentElement.className.replace(/\bno-js\b/, 'js');
// Add this function to js/script.js
function checkLoginStatus() {
    const currentUser = getCurrentUser ? getCurrentUser() : null;
    const loginBtn = document.querySelector('.btn-login');
    const signupBtn = document.querySelector('.nav-buttons .btn-primary');

    if (currentUser && loginBtn && signupBtn) {
        loginBtn.textContent = `Welcome, ${currentUser.name.split(' ')[0]}`;
        loginBtn.href = '#';
        signupBtn.textContent = 'Logout';
        signupBtn.href = '#';
        signupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (logoutUser && typeof logoutUser === 'function') {
                logoutUser();
                window.location.reload();
            }
        });
    }
}

// Call it when DOM loads
document.addEventListener('DOMContentLoaded', function () {
    // ... existing initialization code ...
    checkLoginStatus();
});