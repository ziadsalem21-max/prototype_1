// login.js — updated: same behavior you liked + fix duplication by toggling aria-hidden/visibility
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');

    // panel toggle buttons (visible in purple area)
    const registerPanelBtn = document.getElementById('register');
    const loginPanelBtn = document.getElementById('login');

    // form controls & messages
    const doSignUp = document.getElementById('doSignUp');
    const doSignIn = document.getElementById('doSignIn');
    const signupMessage = document.getElementById('signupMessage');
    const loginMessage = document.getElementById('loginMessage');

    const signInContainer = document.querySelector('.sign-in');
    const signUpContainer = document.querySelector('.sign-up');

    // helper to set aria-hidden on forms to prevent duplicate rendering
    function setFormVisibility(activeIsRegister) {
        if (activeIsRegister) {
            container.classList.add('active');
            if (signUpContainer) signUpContainer.setAttribute('aria-hidden', 'false');
            if (signInContainer) signInContainer.setAttribute('aria-hidden', 'true');
        } else {
            container.classList.remove('active');
            if (signUpContainer) signUpContainer.setAttribute('aria-hidden', 'true');
            if (signInContainer) signInContainer.setAttribute('aria-hidden', 'false');
        }
    }

    // Wire panel buttons
    if (registerPanelBtn) registerPanelBtn.addEventListener('click', () => setFormVisibility(true));
    if (loginPanelBtn) loginPanelBtn.addEventListener('click', () => setFormVisibility(false));

    // Support URL param ?mode=register
    try {
        const params = new URLSearchParams(location.search);
        if (params.get('mode') === 'register') {
            setFormVisibility(true);
        } else {
            setFormVisibility(false);
        }
    } catch (e) {
        // ignore in file:// contexts
        setFormVisibility(false);
    }

    // SIGN-UP
    if (doSignUp) {
        doSignUp.addEventListener('click', () => {
            const name = (document.getElementById('suName') || {}).value?.trim() || '';
            const email = ((document.getElementById('suEmail') || {}).value || '').trim().toLowerCase();
            const password = (document.getElementById('suPassword') || {}).value || '';

            signupMessage.textContent = '';
            signupMessage.style.color = '';

            if (!name || !email || !password) {
                signupMessage.textContent = 'Please fill all fields.';
                signupMessage.style.color = 'crimson';
                return;
            }

            try {
                const res = registerUser(name, email, password); // from userDB.js
                signupMessage.textContent = res.message;
                signupMessage.style.color = res.success ? 'green' : 'crimson';
                if (res.success) {
                    // flip to login view after a moment
                    setTimeout(() => setFormVisibility(false), 900);
                }
            } catch (err) {
                signupMessage.textContent = 'Registration failed.';
                signupMessage.style.color = 'crimson';
            }
        });
    }

    // SIGN-IN
    if (doSignIn) {
        doSignIn.addEventListener('click', () => {
            const email = ((document.getElementById('liEmail') || {}).value || '').trim().toLowerCase();
            const password = (document.getElementById('liPassword') || {}).value || '';

            loginMessage.textContent = '';
            loginMessage.style.color = '';

            if (!email || !password) {
                loginMessage.textContent = 'Please fill all fields.';
                loginMessage.style.color = 'crimson';
                return;
            }

            try {
                const res = loginUser(email, password); // from userDB.js
                loginMessage.textContent = res.message;
                loginMessage.style.color = res.success ? 'green' : 'crimson';
                if (res.success) {
                    setTimeout(() => (window.location.href = 'index.html'), 900);
                }
            } catch (err) {
                loginMessage.textContent = 'Login error.';
                loginMessage.style.color = 'crimson';
            }
        });
    }
});