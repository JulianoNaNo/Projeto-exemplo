firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = "pages/home/home.html";
    }
});

function onChangeEmail() {
    toggleButtonDisabled();
    toggleEmailErrors();
}

function onChangePassword(){
    console.log("entrou na função de onChangePassword");
    toggleButtonDisabled();
    togglePasswordError();
}

function login(){
    console.log("iniciou login");
    showLoading()
    firebase.auth().signInWithEmailAndPassword(form.email().value,form.password().value).then(Response => {
        console.log("success", Response)
        window.location = "pages/home/home.html";
        hideLoading()
    }).catch(error => {
        alert(getErrorMessage(error))
        console.log("erro", error)
        hideLoading()
        });
}
function getErrorMessage(error){
    if(error.code == "auth/invalid-credential"){
        return "Usuário não encontrado";
    }
    if(error.code ==  "auth/wrong-password"){ 
        return "Senha invalida.";
    }
    return error.message;
}

function register(){
    showLoading();
    window.location = "/pages/register/register.html";
    hideLoading();
}

function toggleButtonDisabled() {
    const emailValid = isEmailValide();
    const passwordValid = isPasswordValide();
    console.log("emailValid: ", emailValid);
    console.log("passwordValid: ", passwordValid);

    form.recoverPassword().disabled = !emailValid;
    form.loginButton().disabled = !emailValid || !passwordValid;
}

function recoverPasswordt(){
    showLoading();
    firebase.auth().sendPasswordResetEmail(form.email().value).then (() => {
        hideLoading();
        alert("Email enviado com sucesso.");
        console.log("email: ",form.email().value)
    }).catch(error => {
        hideLoading();
        alert("Erro ao enviar e-mail: ",getErrorMessage(error));
    });
}

function toggleEmailErrors() {
const email = form.email().value;

if (!email) {
    // 1. Quando o email está VAZIO:
    form.emailRequiredError().style.display = "block"; // Mostra o de campo obrigatório
    form.emailInvalidError().style.display = "none";   // Esconde o de formato inválido
} else {
    // 2. Quando o usuário DIGITOU algo:
    form.emailRequiredError().style.display = "none";  // Esconde o de campo obrigatório
    // Se o e-mail for válido, esconde o erro. Se for inválido, mostra o erro.
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
}
}

function togglePasswordError(){
    const password = form.password().value;

    form.passwordRequiredError().style.display = password ? "none" : "block";
}

function isEmailValide() {
    const email = form.email().value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValide() {
    console.log("entrou na função de validação de senha");
    const password = form.password().value;
    if (!password) {
        console.log("entrou aqui na funcao isPasswordValide");
        return false;
    }
    return true;
}


const form = {
    email: () => document.getElementById("email"),

    emailInvalidError: () => document.getElementById("email-invalid-error"),

    emailRequiredError: () => document.getElementById("email-required-error"),

    loginButton: () => document.getElementById("login-button"),

    password: () => document.getElementById("password"),

    passwordRequiredError: () => document.getElementById("password-required-error"),

    recoverPassword: () => document.getElementById("password-button-recover")
}

