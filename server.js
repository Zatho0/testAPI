const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let users = [];

app.get('/users', (req, res) => {//récupérer la liste des utilisateurs
  res.json(users);
});


app.post("/users", (req, res) => {//poster un utilisateur
    const { username } = req.body; // Récupère le pseudo envoyé par le client
    if (!username) return res.status(400).json({ error: "Nom requis" });

    users.push({ id: users.length + 1, username }); // Ajoute le joueur à la liste
    res.json({ message: "Utilisateur ajouté", username }); // Répond avec un message de confirmation
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Serveur API en ligne sur http://localhost:${PORT}`));