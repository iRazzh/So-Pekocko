// Récupération du "model" validPassword
const validatePassword = require('../models/Validpassword');


module.exports = (req, res, next) => {
    // Si le mdp est différent du model, alors il retourne un status 400
    if(!validatePassword.validate(req.body.password)) {
        return res.status(400).json({ error: 'Mot de passe incorrect !' });
    }
    next();
}

