firebase.auth().onAuthStateChanged(user => { 
    if (user) {
        console.log("Usuário já autenticado: ", user.email);
        window.location.href = "/../../../pages/home/home.html";
    }
});


function onChangeEmail() {
    const email = formRegister.email().value;

    // 1. O erro de "Obrigatório" só aparece se o e-mail estiver VAZIO
    formRegister.emailRequiredError().style.display = email ? "none" : "block";

    // 2. O erro de "Inválido" só aparece se tiver algo digitado E o formato for incorreto
    formRegister.emailInvalidError().style.display = (email && !validateEmail(email)) ? "block" : "none";
    toggleRegisterButton()
}

function onChangePassword() {
    const password = formRegister.password().value;

    formRegister.passwordRequiredError().style.display = password ? "none" : "block";
    formRegister.passwordMinLengthError().style.display = (password && password.length < 6) ? "block" : "none";
    toggleRegisterButton()
}

function onChangeConfirmPassword() {
    const password = formRegister.password().value;
    const confirmPassword = formRegister.confirmPassword().value;
    formRegister.passwordDoesntMatchError().style.display = (password && confirmPassword && password !== confirmPassword) ? "block" : "none";
    toggleRegisterButton()
}

function toggleRegisterButton() {
    formRegister.registerButton().disabled = !(validateEmail(formRegister.email().value) && isPasswordValidForRegistration(formRegister.password().value) && formRegister.password().value === formRegister.confirmPassword().value);
}

function handleRegister() {
    showLoading();
    const email = formRegister.email().value;
    const password = formRegister.password().value;

    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        hideLoading();
        window.location.href = "/../../../pages/home/home.html";
        console.log("Usuário registrado com sucesso: ", email);
    }).catch((error) => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}

function getErrorMessage(error) {
    if(error.code === "auth/email-already-in-use"){
        return "Este email já está em uso.";
    }
    return error.message;
}

const formRegister = {
    email: () => document.getElementById("email"),
    emailRequiredError: () => document.getElementById("email-required-error"),
    emailInvalidError: () => document.getElementById("email-invalid-error"),
    password: () => document.getElementById("password"),
    confirmPassword: () => document.getElementById("confirm-password"),
    passwordRequiredError: () => document.getElementById("password-required-error"),
    passwordMinLengthError: () => document.getElementById("password-min-length-error"),
    passwordDoesntMatchError: () => document.getElementById("password-doesnt-match-error"),
    registerButton: () => document.getElementById("register-button"),
}