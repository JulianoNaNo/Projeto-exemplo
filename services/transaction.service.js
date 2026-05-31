const transactionService = {
    findByUser: user => {

    return firebase.firestore()
        .collection("Transactions")
        .where("user.uid", '==', user.uid)
        .orderBy("date", "desc")
        .get()
        .then(snapshot => {
            return snapshot.docs.map(doc => ({
                ...doc.data(),
                uid: doc.id
            }));
        })
    },

    findByUid: uid => {
        return firebase.firestore()
            .collection("Transactions")
            .doc(uid)
            .get()
            .then((doc) => {
                return doc.data();
            })
    },

    save: transaction => {    
        return firebase.firestore()
            .collection("Transactions")
            .add(transaction);
            console.log("Transactions: ", transaction);
    },

    update: transaction => {   
        console.log("transaction.uid: ", transaction.uid);
        return firebase.firestore()
            .collection("Transactions")
            .doc(transaction.uid)
            .update(transaction)
    },

    remove: transaction => {
        return firebase.firestore()
            .collection("Transactions")
            .doc(transaction.uid)
            .delete();
    }
}