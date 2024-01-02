const sequelize = require("../models/index.js");

const fs = require("fs");

/*****  CREATE NEW POST    
========================****/
exports.newPost = (req, res, next) => {
  // Vérification si il y a une image , sinon -> null
  let imgUrl = "";
  if (req.file) {
    imgUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  }
  // Création d'une nouvelle publication
  sequelize.Post.create({
    UserId: req.body.UserId,
    title: req.body.title,
    content: req.body.content,
    imgFile: imgUrl,
  })
    .then((response) =>
      res.status(201).json({
        message: "Le Post a correctement été crée",
      })
    )
    .catch((error) =>
      res.status(400).json({
        error: "Une erreur est survenue lors de la création du Post",
      })
    );
};

/*****  GET ALL POSTS    
===========================****/
exports.getAllPosts = (req, res, next) => {
  const limit = parseInt(req.query.limit) || 2; // Nombre de posts par lot, par défaut 10
  const offset = parseInt(req.query.offset) || 0; // Point de départ pour le lot de posts, par défaut 0

  sequelize.Post.findAll({
    include: [
      {
        model: sequelize.User,
        attributes: ["username", "admin"],
      },
      {
        model: sequelize.Comment,
      },
    ],
    order: [["createdAt", "DESC"]],
    limit: limit,
    offset: offset,
  })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

/*****  GET ONE POST    
============================****/
exports.getPost = (req, res, next) => {
  //Récupération de l'affichage d'un post
  //console.log(User)
  sequelize.Post.findOne({
    where: {
      //Cible l'id de l'objet à afficher
      id: req.params.id,
    },
    include: [
      {
        model: sequelize.User,
        attributes: ["username", "admin"],
      },
      {
        model: sequelize.Comment,
        include: [
          {
            model: sequelize.User,
            attributes: ["username", "id"],
          },
        ],
      },
    ],
  })
    .then((Post) => {
      console.log(Post);
      res.status(200).json(Post);
    })
    .catch((error) =>
      res.status(400).json({
        error,
      })
    );
};

/*****  SUPPRIMER UN POST    
============================****/
exports.deletePost = (req, res, next) => {
  sequelize.Post.findOne({
    where: { id: req.params.id },
  })
    .then((post) => {
      if (post.imgFile === null) {
        sequelize.Post.destroy({ where: { id: req.params.id } })
          .then((post) => {
            res.status(200).json({
              message: "Post correctement supprimé",
            });
          })
          .catch((error) =>
            res.status(400).json({
              error,
            })
          );
      } else {
        const filename = post.imgFile.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          sequelize.Post.destroy({ where: { id: req.params.id } })
            .then((post) => {
              res.status(200).json({
                message: "Post correctement supprimé",
              });
            })
            .catch((error) =>
              res.status(400).json({
                error,
              })
            );
        });
      }
    })
    .catch((error) =>
      res.status(500).json({
        error,
      })
    );
};

/*****  DISPLAY USER LAST POSTS   
==================================****/
exports.getUserPosts = (req, res, next) => {
  //récupération de tous les posts présents dans la bdd
  sequelize.Post.findAll({
    where: {
      UserId: req.params.id,
    },
    order: [["createdAt", "DESC"]],
    limit: 10,
  })
    .then((posts) => {
      console.log(posts);
      res.status(200).json(posts);
    })
    .catch((error) =>
      res.status(400).json({
        error,
      })
    );
};
