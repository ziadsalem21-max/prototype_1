// ===== Handle Register =====

const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("regName").value;
        const email = document.getElementById("regEmail").value;
        const password = document.getElementById("regPassword").value;

        const result = registerUser(name, email, password);

        const msg = document.getElementById("registerMessage");
        msg.textContent = result.message;
        msg.style.color = result.success ? "green" : "red";

        if (result.success) {
            setTimeout(() => (window.location.href = "login.html"), 1200);
        }
    });
}



// ===== Handle Login =====

const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const result = loginUser(email, password);

        const msg = document.getElementById("loginMessage");
        msg.textContent = result.message;
        msg.style.color = result.success ? "green" : "red";

        if (result.success) {
            setTimeout(() => (window.location.href = "dashboard.html"), 1200);
        }
    });
}
