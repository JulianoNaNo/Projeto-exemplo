

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

    firebase.firestore()
    .collection("Transactions")
    .where("user.uid", '==', user.uid)
    .orderBy("date", "desc")
    .get()
    .then(snapshot => {
        const transactions = snapshot.docs.map(doc => ({
            ...doc.data(),
            uid: doc.id
        }));
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
        //console.log("transaction.type: ", transaction.type);
        orderedList.appendChild(li);
        li.addEventListener("click", () => {
            window.location.href = `../transactions/transactions.html?uid=`
             + transaction.uid;
        });
    
        const date = document.createElement(`p`);
        date.innerHTML = formatDate(transaction.date.replace(/-/g, '\/'));
        //console.log("dentro de transaction date: ", transaction.date);
        li.appendChild(date);

        const money = document.createElement(`p`);
        money.innerHTML = formatMoney(transaction.money);
        //console.log("dentro de transaction money: ", transaction.money, transaction.value);
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