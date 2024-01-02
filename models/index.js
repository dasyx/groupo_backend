"use strict";
const dbConfig = require("../config/database.js");
const Sequelize = require("sequelize");

const db = {};

const sequelize = new Sequelize(
  process.env.HST_NAME,
  process.env.HST_USER,
  process.env.HST_PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    logging: false,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

// Vérification de la connexion à la db mysql
try {
  sequelize.authenticate();
  console.log("Connexion à la base de données établie avec succès !");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modèles et tables
db.User = require("./user.js")(sequelize, Sequelize);
db.Post = require("./post.js")(sequelize, Sequelize);
db.Comment = require("./comment.js")(sequelize, Sequelize);

// Relations entre les différentes tables
db.Post.belongsTo(db.User, {
  onDelete: "CASCADE",
  hooks: true,
});
db.Post.hasMany(db.Comment, {
  onDelete: "CASCADE",
  hooks: true,
});
db.User.hasMany(db.Post, {
  onDelete: "CASCADE",
});
db.User.hasMany(db.Comment, {
  onDelete: "CASCADE",
});
db.Comment.belongsTo(db.Post, {
  onDelete: "CASCADE",
  hooks: true,
});
db.Comment.belongsTo(db.User, {
  onDelete: "CASCADE",
  hooks: true,
});

module.exports = db;
