// Récupération de mongoose
const mongoose = require('mongoose');

// Permet de valider l'email comme étant unique
const uniqueValidator = require('mongoose-unique-validator');

// Création du schema pour l'utilisateur
const userSchema = mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
}); 

// Application du validateur au schéma 
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);