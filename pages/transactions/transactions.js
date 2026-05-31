if(!isNewTransaction()) {
    const uid = getTransactionUid();
    findTransactionByUid(uid);
}

function getTransactionUid() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("uid");
}


function isNewTransaction() {
    return !getTransactionUid();
}

function findTransactionByUid(uid) {
    showLoading();
    transactionService.findByUid(uid)
    .then((transaction) => {
        hideLoading();
        if (transaction) {
            console.log("id da transação: ", transaction);
            fillTransactionScreen(transaction);
            toggleSaveButtonDisabled();
        } else {
            alert("Transação não encontrada.");
            window.location.href = "/pages/home/home.html";
        }
    })
    .catch((error) => {
        hideLoading();
        alert("Erro ao buscar transação: " + error.message);
    });
}

function fillTransactionScreen(transaction) {
    if(transaction.type === "expense") {
        form.typeExpense().checked = true;
    }else {
        form.typeIncome().checked = true;
    }

    form.date().value = transaction.date;
    form.currency().value = transaction.money.currency;
    form.value().value = transaction.money.value;
    form.transactionType().value = transaction.transactionType;
    if(transaction.description) {
        form.description().value = transaction.description;
    }
}

function saveTransaction() {
    showLoading();
    const transaction = createTransaction();
    if(isNewTransaction()) {
        save(transaction);
    }else {
        update(transaction);
    }
}

function save(transaction) {
    transactionService.save(transaction)
    .then(() => {
        hideLoading();
        alert("Transação salva com sucesso!", );
        window.location.href = "/pages/home/home.html";
    }).catch((error) => {
        hideLoading();
        alert("Erro ao salvar transação: " + error.message);
    });
}

function update(transaction) {
    showLoading();
    transaction.uid = getTransactionUid();
    alert("transaction.uid: " + transaction.uid);
    transactionService.update(transaction)
    .then(() => {
        hideLoading();
        window.location.href = "/pages/home/home.html";
    }).catch((error) => {
        hideLoading();
        console.log("transaction: ", transaction);
        alert("Erro ao atualizar transação: " + error.messagem);
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
    typeIncome: () => document.getElementById("income"),

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