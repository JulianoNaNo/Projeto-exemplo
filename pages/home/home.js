
function newTransaction(){
    window.location.href = "/pages/transactions/transactions.html";
}

firebase.auth().onAuthStateChanged(user => {
    showLoading();
    if(user) {
        hideLoading();
        findTransactions(user);
    }
    hideLoading();
});



function findTransactions(user) {
    showLoading();

    transactionService.findByUser(user)
    .then(transactions => {
        addTransactionToScreen(transactions);
        hideLoading();
    })
    .catch(error => {
        console.error("Erro ao buscar transações no Firebase:", error);
        alert("Não foi possível carregar as transações.");
        hideLoading(); // Fecha direto em caso de erro
    });
}

function addTransactionToScreen(transactions) {
    showLoading();
    const orderedList = document.getElementById("transactions");
    transactions.forEach(transaction => {

        const li = createTrasactionListItem(transaction);

        li.appendChild(createDeleteButton(transaction));

        li.appendChild(createParagraph(formatDate(transaction.date.replace(/-/g, '\/'))));

        li.appendChild(createParagraph(formatMoney(transaction.money)));

        li.appendChild(createParagraph(transaction.transactionType));

        if(transaction.description) {
            li.appendChild(createParagraph(transaction.description));
        }
        orderedList.appendChild(li);
    });
    hideLoading();
}

function createTrasactionListItem(transaction) {
    const li = document.createElement(`li`);
    li.classList.add(transaction.type);
    li.id = transaction.uid;
    li.addEventListener("click", () => {
        window.location.href = `../transactions/transactions.html?uid=`+ transaction.uid;
    });
    return li;
}

function createDeleteButton(transaction) {
    const deleteButton = document.createElement("button");
        deleteButton.innerText = "Remover";
        deleteButton.classList.add("outline", "danger");
        deleteButton.addEventListener("click", event => {
            event.stopPropagation(); // Impede que o clique no botão dispare o evento do li
            askRemoveTransaction(transaction);
        });
    return deleteButton;
}

function createParagraph(value) {
    const element = document.createElement(`p`);
    element.innerHTML = value;
    return element;
}

function askRemoveTransaction(transaction) {
    const shoudRemove = confirm("Tem certeza que deseja remover esta transação?");
    if(shoudRemove) {
        
        removeTransaction(transaction);
    }
}

function removeTransaction(transaction) {
    showLoading();
    transactionService.remove(transaction)
    .then(
        () => {
        alert("Transação removida com sucesso!");
        hideLoading(); // Remove a transação da tela
        document.getElementById(transaction.uid).remove();
    })
    .catch(error => {
        hideLoading();
        console.log("Erro ao remover transação");
        alert("Erro ao remover transação");
    })
}




function formatDate(date) {
    return new Date(date).toLocaleDateString("pt-BR");
}

function formatMoney(money) {
    return `${money.currency} ${money.value.toFixed(2)}`;
}