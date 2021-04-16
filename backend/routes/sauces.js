const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauces');

const auth = require('../middleware/auth');
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

module.exports = router;