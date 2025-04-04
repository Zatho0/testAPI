let input = document.querySelector('input')
let sub = document.querySelector('button')


function addUser(username) {
    fetch("http://192.168.60.119:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }) // Envoie le pseudo en JSON
    })
    .then(response => response.json())
    .then(data => { 
        console.log("Utilisateur ajouté :", data);}) // Affiche le pseudo dans la console et l'interface
    .catch(error => console.error("Erreur :", error));
}

function AfficheUser(username) {
    let div = document.createElement('div')
    div.textContent = username
    document.body.appendChild(div)
}

function getUsers() {
    fetch("http://192.168.60.119:3000/users",{
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })

        .then(response => response.json())
        .then(data => {
            data.forEach(user => {
                AfficheUser(user.username) // Affiche chaque pseudo dans l'interface
            });
        })
        .catch(error => console.error("Erreur :", error));
}
getUsers() // Récupère la liste des utilisateurs au chargement de la page
sub.addEventListener('click', (e) => {
    addUser(input.value)
    input.value = "" // Réinitialise le champ de saisie
})

