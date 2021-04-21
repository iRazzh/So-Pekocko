// Récupération du model "Sauce"
const Sauce = require("../models/Sauce");

// Permet de gérer les modifications d'images et les dl
const fs = require("fs");

/* Création d'une sauce */
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  // Sauvegarde de la sauce dans la BDD
  sauce.save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
    .catch((error) => res.status(400).json({ error }));
};

/* Modification d'une sauce */
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
    .catch((error) => res.status(400).json({ error }));
};

/* Suppression d'une sauce */
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        // Suppression de l'article dans la BDD
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

/* Accéder à une sauce */
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

/* Accéder à toutes les sauces */
exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};


/* Notation d'une sauce */
exports.ratingSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    // Si l'utilisateur like la sauce
    if (req.body.like === 1) {
      console.log(req.body.userId + " aime cette sauce");
      Sauce.updateOne(
        { _id: req.params.id },
        { $push: { usersLiked: req.body.userId }, $inc: { likes: +1 } }
      )
        .then(() => res.status(200).json({ message: "Like ajouté !" }))
        .catch((error) => res.status(400).json({ error }));
    }

    // Si l'utilisateur dislike la sauce
    if (req.body.like === -1) {
      console.log(req.body.userId + " n'aime pas cette sauce");
      Sauce.updateOne(
        { _id: req.params.id },
        { $push: { usersDisliked: req.body.userId }, $inc: { likes: +1 } }
      )
        .then(() => res.status(200).json({ message: "Dislike ajouté !" }))
        .catch((error) => res.status(400).json({ error }));
    }

    // Si l'utilisateur décide de retirer son like/dislike
    if (req.body.like === 0) {
      console.log("Vous avez annulé votre like/dislike");
      if (sauce.usersLiked.find((user) => user === req.body.userId)) {
        Sauce.updateOne(
          { _id: req.params.id },
          { $inc: { likes: -1 }, $push: { usersLiked: req.body.userId } }
        )
          .then(() => res.status(201).json({ message: "Like retiré !" }))
          .catch((error) => res.status(400).json({ error }));
      }
      if (sauce.usersDisliked.find((user) => user === req.body.userId)) {
        Sauce.updateOne(
          { _id: req.params.id },
          { $inc: { dislikes: -1 }, $push: { usersDisliked: req.body.userId } }
        )
          .then(() => res.status(201).json({ message: "Dislike retiré !" }))
          .catch((error) => res.status(400).json({ error }));
      }
    }
  });
};

// switch (req.body.like) {
//   case 1 :
//       Sauce.updateOne({_id: req.params.id}, {$push: {usersLiked: req.body.userId}, $inc: {likes: +1}})
//       .then(() => res.status(201).json({ message: 'Like ajouté !' }))
//       .catch(error => res.status(400).json({error}));
//     break;

//   case 0 :
//     if (sauce.usersLiked.find( user => user === req.body.userId)) {
//       Sauce.updateOne({_id: req.params.id}, {$inc: {likes: -1}, $push: {usersLiked: req.body.userId}})
//       .then(() => res.status(201).json({ message: 'Like retiré !' }))
//       .catch(error => res.status(400).json({error}));
//     }
//     if (sauce.usersDisliked.find( user => user === req.body.userId)) {
//       Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: -1}, $push: {usersDisliked: req.body.userId}})
//       .then(() => res.status(201).json({ message: 'Dislike retiré !' }))
//       .catch(error => res.status(400).json({error}));
//     }
//     break;

//   case -1 :
//       Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: +1}, $push: {usersDisliked: req.body.userId}})
//         .then(() => res.status(201).json({ message: 'Dislike ajouté !' }))
//         .catch(error => res.status(400).json({error}));
//     break;
// }
// })
// .catch(error => res.status(400).json({ error }));
