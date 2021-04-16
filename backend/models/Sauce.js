// Récupération de mongoose
const mongoose = require('mongoose');

// Schéma pour les données des Sauces
const sauceSchema = mongoose.Schema({
   userId: { type: String, required: true }, 
   name: { type: String, required: true },
   manufacturer: { type: String, required: true },
   description: { type: String, required: true },
   mainPepper: { type: String, required: true },
   imageUrl: { type: String, required: true },
   heat: { type: Number, required: true },
   likes: { type: Number, default: 0 },
   dislikes: { type: Number, default: 0 },
   usersLiked: [{ type:String, default: [] }],
   usersDisliked: [{ type:String, default: [] }],
});

// On export le nom du model et le schéma
module.exports = mongoose.model('Sauce', sauceSchema);