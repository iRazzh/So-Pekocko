const jwt = require('jsonwebtoken');

// Application de la sécurité à toutes les routes
module.exports = (req, res, next) => {
  try {
    // Récupération du token dans le header, et du deuxième élément du tableau
    const token = req.headers.authorization.split(' ')[1];
    // Vérification des token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    // Vérification de l'userId avec celui encodé du token
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'USER ID invalide !';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};