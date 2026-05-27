function logout() {
    // Implementation for logout functionality
    firebase.auth().signOut().then(() => {
        window.location.href = "/../../index.html";
    })
    .catch((error) => {
        console.error("Error signing out:", error);
    });
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

    firebase.firestore()
    .collection("Transactions")
    .where("user.uid", '==', user.uid)
    .orderBy("date", "desc")
    .get()
    .then(snapshot => {
        const transactions = snapshot.docs.map(doc => doc.data());
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
        const li = document.createElement(`li`);
        li.classList.add(transaction.type);
        orderedList.appendChild(li);

        const date = document.createElement(`p`);
        date.innerHTML = formatDate(transaction.date);
        li.appendChild(date);

        const money = document.createElement(`p`);
        money.innerHTML = formatMoney(transaction.money);
        console.log("dentro de transaction money: ", transaction.money);
        li.appendChild(money);

        const type = document.createElement(`p`);
        type.innerHTML = transaction.transactionType;
        li.appendChild(type);

        if(transaction.description) {
            const description = document.createElement(`p`);
            description.innerHTML = transaction.description;
            li.appendChild(description);
        }
    });
    hideLoading();
}

function formatDate(date) {
    return new Date(date).toLocaleDateString("pt-BR");
}

function formatMoney(money) {
    return `${money.currency} ${money.value.toFixed(2)}`;
}