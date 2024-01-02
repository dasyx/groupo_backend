'use strict';
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
        content: {
            type: DataTypes.STRING,
        },
    })
    return Comment;
};