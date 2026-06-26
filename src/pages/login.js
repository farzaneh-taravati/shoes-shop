import { loadPage } from "../main";

export function initLogin() {
    const form = document.getElementById('login-form');
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    const rememberMe = document.getElementById('remember');
    const loginBtn = document.getElementById('signin-btn');

    function validateForm() {
        const isEmailValid = emailInput.validity.valid && emailInput.value.trim() !== '';
        const isPasswordValid = passwordInput.value.trim() !== '';

        if (isEmailValid && isPasswordValid) {
            loginBtn.disabled = false;
            loginBtn.classList.remove('opacity-65');
        } else {
            loginBtn.disabled = true;
            // loginBtn.classList.add('opacity-65');
        }
    }


    emailInput.addEventListener('input', validateForm);
    passwordInput.addEventListener('input', validateForm);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (rememberMe.checked) {
            localStorage.setItem('userEmail', emailInput.value);
            localStorage.setItem('userPassword', passwordInput.value);
            localStorage.setItem('isLoggedIn', 'true');
        } else {
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userPassword');
        }


        loadPage("home");
    });
}
