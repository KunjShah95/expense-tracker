const loginForm = document.querySelector("form");
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email && password) {
        alert("Login successful!");
    } else {
        alert("Please fill in all fields.");
    }

});
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const phone = document.getElementById("number");

const registerForm = document.querySelector("form");
registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (username.value && email.value && password.value && phone.value) {
        alert("Registration successful!");
    } else {
        alert("Please fill in all fields.");
    }

});
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById('register-form');

    // --- VALIDATION HELPER FUNCTIONS ---

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePassword(password) {
        return password.length >= 8;
    }

    // --- LOGIN FORM LOGIC ---

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            // Check for empty fields first
            if (!email || !password) {
                alert("Please fill in all fields.");
                return;
            }

            if (!validateEmail(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            if (!validatePassword(password)) {
                alert("Password must be at least 8 characters long.");
                return;
            }

            alert("Login successful! Redirecting to the main page.");
            // Redirect to the main  page of the website
            window.location.href = 'dashboard.html';
        });
    }


    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const phone = document.getElementById("phone").value; 

            // it is used for checking the empty fields are there or not while filling the form
            if (!username || !email || !password || !phone) {
                alert("Please fill in all fields.");
                return;
            }

            if (!validateEmail(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            if (!validatePassword(password)) {
                alert("Password must be at least 8 characters long.");
                return;
            }

            alert("Registration successful! Redirecting to the main page.");
            // Redirect to the main page of the website
            window.location.href = 'dashboard.html';
        });
    }
});
