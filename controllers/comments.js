const sequelize = require("../models/index.js");
let textRegex = /^[^=*<>{}]+$/;

/*****   CREATE NEW COMMENT   
===============================****/
exports.newComment = (req, res, next) => {
  //Vérification des données
  try {
    if (req.body.content === "") throw "Vous devez écrire quelque chose";
    /* if (req.body.content.length < 1) throw "Votre commentaire doit contenir au moins 1 caractère !"; */
    if (!textRegex.test(req.body.content))
      throw "Caractères spéciaux utilisés interdits  * < > { }";
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
  //Creation du commentaire
  sequelize.Comment.create({
    UserId: req.body.UserId,
    PostId: req.body.PostId,
    content: req.body.content,
  })
    .then((comment) => {
      return sequelize.Comment.findOne({
        where: { id: comment.id },
        include: [{ model: sequelize.User, attributes: ["username"] }], // Assurez-vous que le modèle User est correctement associé
      });
    })
    .then((commentWithUser) => {
      res.status(201).json(commentWithUser);
    })
    .catch((error) =>
      res.status(400).json({
        error: "Le commentaire n'a pas pu être crée",
      })
    );
};

/*****   FIND COMMENTS   
===============================****/
exports.getUserComments = (req, res, next) => {
  //récupération de tous les posts présents dans la bdd
  sequelize.Comment.findAll({
    where: {
      UserId: req.params.id,
    },
    order: [["createdAt", "DESC"]],
    limit: 5,
  })
    .then((comments) => {
      console.log(comments);
      res.status(200).json(comments);
    })
    .catch((error) =>
      res.status(400).json({
        error,
      })
    );
};

/*****  DELETE COMMENTS   
===============================****/
exports.deleteComment = (req, res, next) => {
  sequelize.Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((comment) => {
      console.log(comment);
      res.status(200).json({
        message: "Commentaire correctement supprimé",
      });
    })
    .catch((error) =>
      res.status(400).json({
        error,
      })
    );
};

/*****  UPDATE COMMENT   
===============================****/
exports.updateComment = (req, res, next) => {
  const commentId = req.params.id;
  const updatedContent = req.body.content;

  // Vérification des données
  try {
    if (updatedContent === "") throw "Vous devez écrire quelque chose";
    if (!textRegex.test(updatedContent))
      throw "Caractères spéciaux utilisés interdits * < > { }";
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }

  // Mise à jour du commentaire
  sequelize.Comment.update(
    { content: updatedContent },
    { where: { id: commentId } }
  )
    .then(() => {
      res.status(200).json({
        message: "Commentaire mis à jour avec succès",
      });
    })
    .catch((error) =>
      res.status(400).json({
        error: "Impossible de mettre à jour le commentaire",
      })
    );
};
