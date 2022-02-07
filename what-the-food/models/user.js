// const Sequelize = require('sequelize');
// const { Ingredients } = require('./ingredients');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
        User.hasMany(models.Ingredients, {
          foreignKey: "UserId"
        })
    }
  }
  User.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  // User.hasMany(Ingredients, {
  //   foreignKey: 'userId'
  // });
  // Ingredients.belongsTo(User);

  // User.hasMany(Ingredients, {foreignKey : 'userId'});
  // Ingredients.belongsTo(User, {foreignKey : 'userId'});

  return User;
};