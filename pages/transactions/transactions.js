
function saveTransaction() {
    showLoading();
    const transaction = createTransaction();
    firebase.firestore()
        .collection("Transactions")
        .add(transaction)
        .then(() => {
            hideLoading();
            alert("Transação salva com sucesso!");
            window.location.href = "/pages/home/home.html";
        }).catch((error) => {
            hideLoading();
            alert("Erro ao salvar transação: " + error.message);
        });
}

function createTransaction() {
    return {
        type: form.typeExpense().checked ? "expense" : "income", 
        date: form.date().value,
        money: {
            currency: form.currency().value,
            value: parseFloat(form.value().value)
        },
        transactionType: form.transactionType().value,
        description: form.description().value,
        user: {
            uid: firebase.auth().currentUser.uid
        }
    };
}


function onChangeDate() {
    const date = form.date().value;
    //console.log("date: ", date);
    form.dateRequiredError().style.display = date ? "none" : "block";
    toggleSaveButtonDisabled();
}

function onChangeValue() {
    const value = form.value().value;
    form.valueRequiredError().style.display = value ? "none" : "block";
    form.valueLessOrEqualToZeroError().style.display = value <= 0 ? "block" : "none";
    toggleSaveButtonDisabled();
}

function onChangeTransactionType() {
    const transactionType = form.transactionType().value;
    //console.log("transactionType: ", transactionType);
    form.TransactionTypeRequiredError().style.display = transactionType ? "none" : "block";
    toggleSaveButtonDisabled();
}

function toggleSaveButtonDisabled() {
    const button = form.saveButton().disabled = !isFormValid();
    //console.log("funcao toggleSaveButtonDisabled foi ativada");
}

function isFormValid() {
    const date = form.date().value;
    if(!date) {
        return false;
    }
    const value = form.value().value;
    if(!value || value <= 0) {
        return false;
    }
    const transactionType = form.transactionType().value;
    if(!transactionType) {
        return false;
    }
    return true;
}


const form = {
    typeExpense: () => document.getElementById("expense"),

    currency: () => document.getElementById("currency"),
    value: () => document.getElementById("value"),
    valueRequiredError: () => document.getElementById("value-required-error"),
    valueLessOrEqualToZeroError: () => document.getElementById("value-less-or-equal-to-zero-error"),

    date: () => document.getElementById("date"),
    dateRequiredError: () => document.getElementById("date-required-error"),
    dateInvalidError: () => document.getElementById("date-invalid-error"),

    transactionType: () => document.getElementById("transaction-type"),
    TransactionTypeRequiredError: () => document.getElementById("transaction-type-required-error"),

    description: () => document.getElementById("description"),

    saveButton: () => document.getElementById("save-button")
}