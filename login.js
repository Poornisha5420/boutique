const loginform = document.getElementById("loginform");

loginform.addEventListener("submit", function(event) {

    event.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;

    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");
    let successMessage = document.getElementById("successMessage");

    // Clear old messages
    emailError.textContent = "";
    passwordError.textContent = "";
    successMessage.textContent = "";

    let valid = true;

    if (email === "") {
        emailError.textContent = "Please enter your email.";
        valid = false;
    }

    if (password === "") {
        passwordError.textContent = "Please enter a password.";
        valid = false;
    }

    if (!valid) {
        return;
    }

    // Get users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Find matching user
    let user = users.find(function(user) {
        return user.email === email && user.password === password;
    });

    if (user) {

        successMessage.textContent = "Logged in successfully!";

        // Store currently logged-in user
        localStorage.setItem("currentUser", JSON.stringify(user));

        setTimeout(function() {
            window.location.href = "home.html";
        }, 1000);

        loginform.reset();

    } else {

        emailError.textContent = "Invalid email or password.";
    }
});