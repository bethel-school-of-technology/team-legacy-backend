'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredients extends Model {

    static associate(models) {
      Ingredients.belongsTo(models.User,  {
        foreignKey: "UserId",
        targetKey: "UserId"
      });

      Ingredients.belongsToMany(models.Recipes, {
        through: "ingredients_recipes",
        as: "Recipes",
        foreignKey: "ingredientId",
      });
    }
  }
  Ingredients.init({
    ingredientId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    ingredient: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ingredientQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Ingredients',
  });

  return Ingredients;
};