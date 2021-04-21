// Importation de multer qui gère les fichiers dl dans une requête HTTP
const multer = require('multer');

// Définition du format des images
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };

// Permet de dire où enregistrer les images
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        // Dossier 'images' dans le back
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        // Remplace les espaces par des "_"
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage }).single('image');