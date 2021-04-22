// Utilisation de "bcrypt" pour hasher le mdp
const bcrypt = require("bcrypt");

// Attribution d'un token lors de la connexion
const jwt = require("jsonwebtoken");

// Récupération du model 'User'.
const User = require("../models/User");

/* Création d'un utilisateur */
exports.signup = (req, res, next) => {
  const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const email = req.body.email;
  const password = req.body.password;
   
  // Si l'email "match" avec le regex juste au-dessus, et qu'aucun caractères spéciaux sont présents, alors :
  if (email.match(regexMail)) {
    // On va 'hash' le mdp de l'utilisateur, et lui faire faire 10 tours d'algo
    bcrypt
      .hash(password, 10)
      // Enregistrement du mdp hashé dans la BDD
      .then((hash) => {
        // Création de l'utilisateur
        const user = new User({
          email: req.body.email,
          password: hash,
        });
        // Sauvegarde de l'utilisateur dans la BDD
        user
          .save()
          .then(() => res.status(201).json({ message: "Utilisateur créé!" }))
          .catch((error) => res.status(400).json({ error }));
      })
      // S'il y a déjà un utilisateur avec les mêmes identifiants
      .catch((error) => res.status(500).json({ error }));
  } else {
    throw new Error("L'email est incorrect");
  }
};

/* Connexion d'un utilisateur */
exports.login = (req, res, next) => {
  // Recherche de l'utilisateur dans la BDD via son adresse mail
  User.findOne({ email: req.body.email })
    .then((user) => {
      // Si on le trouve pas, renvoie d'un status 401
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé!" });
      }
      // Compare les hash
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          // Si c'est pas validé, c'est le mdp qui est invalide
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          // Si c'est valide, renvoie d'un status 200
          res.status(200).json({
            userId: user._id,
            // Utilisation de 'jwt' pour obtenir un token encodé
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
