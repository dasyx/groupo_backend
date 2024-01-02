// Création d'un middleware qui va sécuriser les routes sélectionnées, contrôler que l'utilisateur est authentifié et va vérifier l'envoi de ses requêtes.

// Récupération du package jsonwebtoken
const jwt = require('jsonwebtoken');

// Vérification du token utilisateur, si correspondance avec l'id de l'utilisateur dans la requête, il sera autorisé à changer les données qui lui sont liées.

// Middleware d'authentification appliqué à toutes les routes de manière à les sécuriser
module.exports = (req, res, next) => {
  try {
    // On récupère le token dans le header de la requête
    // Grâce à split, le deuxième élément sera utilisé
    const token = req.headers.authorization.split(' ')[1];
    // En utilisant la méthode verify on va donc vérifier le token décodé 
    // Et on le compare avec la clé secrète initiée par le token crée au départ, voir dans Controllers user
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
    // On n'authentifiera pas la requête si l'userId dans le corps de la requête
    // Est différent de l'userId du token décodé
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Utilisateur non authentifié !';
    } else {
      next();
    // Si la requête est valide on passe au prochain middleware
    }
  } catch (error) {
    // Sinon on va renvoyer une erreur
    res.status(401).json({
      error: new Error('Requête invalide !')
    });
  }
};