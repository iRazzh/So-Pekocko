// Package permettant de valider le mdp 
const passwordValidator = require('password-validator');

const validatePassword = new passwordValidator();

// Schéma du passwordValidator
validatePassword
.is().min(4)                                    // Longueur minimale du mdp : 4
.has().uppercase()                              // Doit avoir au moins une majuscule
.has().lowercase()                              // Doit avoir au moins une minuscule 
.has().digits(1)                                // Doit avoir au moins 1 chiffres
.has().not().spaces()                           // Ne doit pas comporter d'espaces
.is().not().oneOf(['Passw00rd', 'Password123', 'Azerty1234', '1234Azerty']); // Mot de passe blacklisté

module.exports = validatePassword;