const signupForm = document.getElementById("signupForm");

    signupForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value;
        

        let nameError = document.getElementById("nameError");
        let emailError = document.getElementById("emailError");
        let passwordError = document.getElementById("passwordError");
        let successMessage = document.getElementById("successMessage");

        // Clear old messages
        nameError.textContent = "";
        emailError.textContent = "";
        passwordError.textContent = "";
        successMessage.textContent = "";

        let valid = true;

        if (name === "") {
            nameError.textContent = "Please enter your name.";
            valid = false;
        }

        if (email === "") {
            emailError.textContent = "Please enter your email.";
            valid = false;
        }

        if (password === "") {
            passwordError.textContent = "Please enter a password.";
            valid = false;
        }

        if (valid) {

            // Get existing users from localStorage
            let users = JSON.parse(localStorage.getItem("users")) || [];

        // Check whether email already exists
            let existingUser = users.find(function(user) {
                return user.email === email;
            });

            if (existingUser) {
                emailError.textContent = "This email is already registered.";
                return;
            }

        // Create new user
            let newUser = {
                name: name,
                email: email,
                password: password
            };

        // Add new user to array
            users.push(newUser);

        // Store updated users array
            localStorage.setItem("users", JSON.stringify(users));
            successMessage.textContent = "Account created successfully!";
            
            setTimeout(function() {
                window.location.href = "login.html";
            }, 1000);

            signupForm.reset();
        }
    });
    
    

