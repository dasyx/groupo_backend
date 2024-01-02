"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING,
    },
    imgFile: {
      type: DataTypes.STRING,
    },
  });
  return Post;
};
