

let login = document.getElementById('login');
let signup = document.getElementById('signup');

if (localStorage.getItem('user') === null) {  
    
    login.setAttribute('href', 'signup/signup.html');

} else {
    location.href = "./shop.html";
}