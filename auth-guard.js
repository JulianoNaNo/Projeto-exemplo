firebase.auth().onAuthStateChanged(user => {  
    if (!user) {
        window.location.href = "/../../../index.html";
    }
});

function logout() {
    // Implementation for logout functionality
    firebase.auth().signOut().then(() => {
        window.location.href = "/../../index.html";
    })
    .catch((error) => {
        console.error("Error signing out:", error);
    });
}