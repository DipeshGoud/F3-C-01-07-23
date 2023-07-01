
// Adding event listener to form for login
let form = document.getElementById("login-form");
form.addEventListener('submit', formLogin);

let user = JSON.parse(localStorage.getItem('user'));
console.log(user);

function formLogin(event) {
    event.preventDefault();

    const emailInput = document.getElementById('email').value.trim();
    const passwordInput = document.getElementById('password').value.trim();

    // Validating form input
    if (emailInput === "" || passwordInput === "") {
        alert("Error: All fields are mandatory");
    } else if (emailInput !== user.email) {
        alert("Please make sure your Email is correct");
    } else if (passwordInput !== user.password) {
        alert("Please make sure your Password is correct");
    } else {
        window.location.href = "/shop/shop.html";
    }
}
