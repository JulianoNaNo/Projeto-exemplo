function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
    console.log("entrou na função de validação de email");
}

function isPasswordValidForRegistration(password) {
    console.log("entrou na função de validação de senha");
    if (!password) {
        return false;
    }
    return true;
}
