// Ajout "d'express" => Infrastructure d'applications web Node.js minimaliste et flexible
const express = require('express');

// Ajout de "bodyParser" => Parse les corps de requête entrants dans un middleware 
const bodyParser = require('body-parser');

// Ajout de "mongoose" => BDD
const mongoose = require('mongoose');

// Ajout de "path" => Permet de travailler avec le système de fichier
const path = require('path');

// Création d'une application express
const app = express();

// Masquage des infos importantes dans le fichier .env
require('dotenv').config()
mongoose.connect(process.env.DB_CONNECTION,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Transformation des données en un objet JSON
app.use(bodyParser.json());

// Permet de charger les fichiers qui sont dans 'images'
app.use('/images', express.static(path.join(__dirname, 'images')));

// Importation de la route dédiée aux sauces
const sauceRoutes = require('./routes/sauces');
// Importation de la route dédiée aux utilisateurs
const userRoutes = require('./routes/user');

// Routes API => sauces
app.use('/api/sauces', sauceRoutes);
// Routes API => user
app.use('/api/auth', userRoutes);

module.exports = app;