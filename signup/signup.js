

    // adding eventlistner to form
    let form = document.getElementById("signup-form");
    form.addEventListener('submit', formSignup);


    // Function to handle form submission
    function formSignup(event) {
        event.preventDefault();

        // Get user details from the form
        const firstNameInput = document.getElementById('first-name').value.trim();
        const lastNameInput = document.getElementById('last-name').value.trim();
        const emailInput = document.getElementById('email').value.trim();
        const passwordInput = document.getElementById('password').value.trim();
        const confirmPasswordInput = document.getElementById('confirm-password').value.trim();

        // Validating form input
        if (firstNameInput === "" || lastNameInput === "" || emailInput === "" || passwordInput === "" || confirmPasswordInput === "") {
            message.innerText = "Error : All the fields are mandatory";
            message.classList.add('error');
        }
        else if (passwordInput != confirmPasswordInput) {
            message.innerText = "Please make sure your password match";
            message.classList.add('error');
        } else {
            const accessToken = generateAccessToken();

            const user = {
                accessToken: accessToken,
                firstName: firstNameInput,
                lastName: lastNameInput,
                email: emailInput,
                password: passwordInput,
                confirmPassword: confirmPasswordInput
            };

            localStorage.setItem('user', JSON.stringify(user));

            // Redirecting to login-Page
                window.location.href = '/login/login.html';
                console.log(user);
        }
    }

    // Generate a random 16-byte access token
    function generateAccessToken() {
        const accessTokenBytes = new Uint8Array(16);
        window.crypto.getRandomValues(accessTokenBytes);
        return Array.from(accessTokenBytes, byte => byte.toString(16).padStart(2, '0')).join('');
    }
