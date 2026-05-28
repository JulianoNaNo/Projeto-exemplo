


function onChangeDate() {
    const date = form.date().value;
    console.log("date: ", date);
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
    console.log("transactionType: ", transactionType);
    form.TransactionTypeRequiredError().style.display = transactionType ? "none" : "block";
    toggleSaveButtonDisabled();
}

function toggleSaveButtonDisabled() {
    const button = form.saveButton().disabled = !isFormValid();
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
    date: () => document.getElementById("date"),
    dateRequiredError: () => document.getElementById("date-required-error"),
    dateInvalidError: () => document.getElementById("date-invalid-error"),

    transactionType: () => document.getElementById("transaction-type"),
    TransactionTypeRequiredError: () => document.getElementById("transaction-type-required-error"),
    
    value: () => document.getElementById("value"),
    valueRequiredError: () => document.getElementById("value-required-error"),
    valueLessOrEqualToZeroError: () => document.getElementById("value-less-or-equal-to-zero-error"),

    saveButton: () => document.getElementById("save-button")
}