const validatePassword = require('../models/Validpassword');

module.exports = (req, res, next) => {
    if(!validatePassword.validate(req.body.password)) {
        return res.status(401).json({ error: 'Mot de passe incorrect !' });
    }
    next();
}

