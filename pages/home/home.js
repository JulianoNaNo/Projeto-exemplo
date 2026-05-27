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
    setTimeout(() => {
        addTransactionToScreen(fakeTransaction);
        }, 1000
    );
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
    return new Date(date).toLocaleDateString("pt-BR")
}

function formatMoney(money) {
    return `${money.currency} ${money.value.toFixed(2)}`
}

const fakeTransaction = [{
    type: "expense",
    date: "2024-06-01",
    money:{
        currency: "R$",
        value: 100.00
    },
    transactionType: "Supermercado",
},
{
    type: "income",
    date: "2024-06-03",
    money:{
        currency: "R$",
        value: 5000.00
    },
    transactionType: "Salário",
    description: "Salário do mês de junho da empresa A",
},
{
    type: "income",
    date: "2026-05-01",
    money: {
        "currency": "R$",
        "value": 6500.00
    },
    transactionType: "Salário",
    description: "Salário mensal - Empresa Tech"
},
{
    type: "expense",
    date: "2026-05-05",
    money: {
        "currency": "USD",
        "value": 1200.00
    },
    transactionType: "Moradia",
    description: "Pagamento do aluguel do apartamento"
},
{
    type: "expense",
    date: "2026-05-10",
    money: {
        "currency": "R$",
        "value": 350.50
    },
    transactionType: "Alimentação",
    description: "Compras do mês no supermercado"
},
{
    type: "income",
    date: "2026-05-15",
    money: {
        "currency": "EUR",
        "value": 450.00
    },
    transactionType: "Freelance",
},
{
    type: "expense",
    date: "2026-05-20",
    money: {
        "currency": "BRL",
        "value": 120.00
    },
    transactionType: "Transporte",
}
]
