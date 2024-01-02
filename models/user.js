module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Ce nom est déjà utilisé",
      },
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgProfile: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "http://127.0.0.1:3000/images/avatars/user_default.jpg",
    },
    admin: {
      type: DataTypes.INTEGER,
      defaultValue: false,
    },
  });
  return User;
};
