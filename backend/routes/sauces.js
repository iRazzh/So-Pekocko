const express = require('express');
const router = express.Router();

// Importation du "controller" pour les sauces
const sauceCtrl = require('../controllers/sauces');

// Important de "auth" qui permet de sécuriser les routes
const auth = require('../middleware/auth');

// Important de "multer" pour gérer les images
const multer = require('../middleware/multer-config');

// Création d'une sauce
router.post('/', auth, multer, sauceCtrl.createSauce);
// Modification d'une sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
// Suppression d'une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);
// Accéder à une sauce
router.get('/:id', auth, sauceCtrl.getOneSauce);
// Accéder à plusieurs sauces
router.get('/', auth, sauceCtrl.getAllSauce);
// Notation d'une sauce
router.post('/:id/like', auth, sauceCtrl.ratingSauce);

module.exports = router;