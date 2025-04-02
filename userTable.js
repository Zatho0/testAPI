let table = document.querySelector('#userTable')

function addUser(username, id) {
    fetch("http://localhost:3000/users",{
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })

    .then(response => response.json())
    .then(res => {
        res.forEach(user => {
            AfficheUser(user.username, user.id) // Affiche chaque pseudo dans l'interface
        });
        
    })
}

function AfficheUser(username, id) {
    let tr = document.createElement('tr')
    table.appendChild(tr)
    let td = document.createElement('td')
    td.innerHTML = id
    tr.appendChild(td)
    let td2 = document.createElement('td')
    td2.innerHTML = username
    tr.appendChild(td2)
}

addUser() // Récupère la liste des utilisateurs au chargement de la page
