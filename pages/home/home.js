function logout() {
    // Implementation for logout functionality
    firebase.auth().signOut().then(() => {
        window.location.href = "/../../index.html";
    })
    .catch((error) => {
        console.error("Error signing out:", error);
    });
}

findTransactions()

function findTransactions() {
    firebase.firestore()
    .collection("Transactions")
    .get()
    .then(snapshot => {
        const transactions = snapshot.docs.map(doc => doc.data());
        addTransactionToScreen(transactions);
    })
    .catch(error => {
        // 🔴 Se der erro de permissão ou conexão, você verá o motivo real aqui:
        console.error("Erro ao buscar transações no Firebase:", error);
        console.log(transactions);
        
        // Opcional: Avisar o usuário na tela de forma amigável
        alert("Não foi possível carregar as transações. Tente novamente mais tarde.");
    });
}

function addTransactionToScreen(transactions) {
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
}

function formatDate(date) {
    return new Date(date).toLocaleDateString("pt-BR");
}

function formatMoney(money) {
    return `${money.currency} ${money.value.toFixed(2)}`;
}