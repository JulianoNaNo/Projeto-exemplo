function logout() {
    // Implementation for logout functionality
    firebase.auth().signOut().then(() => {
        window.location.href = "/../../index.html";
    })
    .catch((error) => {
        console.error("Error signing out:", error);
    });
}
