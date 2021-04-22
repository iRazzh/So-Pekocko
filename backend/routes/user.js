const express = require('express');
const router = express.Router();

// Importation du "controller" concernant les "users"
const userCtrl = require('../controllers/user');

// Importation du "middleware" concernant la vérification du mdp
const Validpassword = require('../middleware/Validpassword');

// Router de l'inscription
router.post('/signup', Validpassword, userCtrl.signup);

// Router de la connexion
router.post('/login', userCtrl.login);

module.exports = router;