    var profileForm = document.getElementById('my-profile-form');
    var firstNameInput = document.getElementById('first-name');
    var lastNameInput = document.getElementById('last-name');
    var passwordForm = document.getElementById('change-password-form');
    var oldPasswordInput = document.getElementById('old-password');
    var newPasswordInput = document.getElementById('new-password');
    var confirmPasswordInput = document.getElementById('confirm-password');

    var user = JSON.parse(localStorage.getItem('user'));

    firstNameInput.value = user.firstName || '';
    lastNameInput.value = user.lastName || '';

    profileForm.addEventListener('submit', function (event) {
        event.preventDefault(); 

        var firstName = firstNameInput.value.trim();
        var lastName = lastNameInput.value.trim();

        user.firstName = firstName;
        user.lastName = lastName;

        localStorage.setItem('ser', JSON.stringify(user));

        alert('Profile information saved!');
    });

    passwordForm.addEventListener('submit', function (event) {
        event.preventDefault();

        var oldPassword = oldPasswordInput.value.trim();
        var newPassword = newPasswordInput.value.trim();
        var confirmPassword = confirmPasswordInput.value.trim();

        if (oldPassword === user.password) {
            if (newPassword === confirmPassword) {
                user.password = newPassword;

                localStorage.setItem('ser', JSON.stringify(user));

                alert('Password changed successfully!');
            } else {
                alert('New password and confirm password do not match.');
            }
        } else {
            alert('Old password is incorrect.');
        }

        oldPasswordInput.value = '';
        newPasswordInput.value = '';
        confirmPasswordInput.value = '';
    });

    var logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', function () {

        window.location.href = '/index.html';
    });
