// filepath: c:\Users\CEFIM\Desktop\testAPI\server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const corsOptions = {
  origin: '*', // Autorise toutes les origines
  methods: ['GET', 'POST'], // Autorise uniquement les méthodes GET et POST
  allowedHeaders: ['Content-Type']
};

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());

const usersFilePath = path.join(__dirname, 'users.json');

// Fonction pour lire les utilisateurs depuis le fichier
function readUsersFromFile() {
    if (!fs.existsSync(usersFilePath)) {
        fs.writeFileSync(usersFilePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data);
}

// Fonction pour écrire les utilisateurs dans le fichier
function writeUsersToFile(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

app.get('/users', (req, res) => {
    const users = readUsersFromFile();
    res.json(users);
});

app.post('/users', (req, res) => {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: "Nom requis" });

    const users = readUsersFromFile();
    const newUser = { id: users.length + 1, username };
    users.push(newUser);
    writeUsersToFile(users);

    res.json({ message: "Utilisateur ajouté", username });
});

const PORT = 3000;

app.listen(PORT, () => console.log(`🚀 Serveur API en ligne sur http://192.168.60.119:${PORT}/users`));