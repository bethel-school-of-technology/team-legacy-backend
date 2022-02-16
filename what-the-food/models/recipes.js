'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipes extends Model {

    static associate(models) {

      Recipes.belongsToMany(models.Ingredients, {
        through: "ingredients_recipes",
        as: "Ingredients",
        foreignKey: "recipeId",
      });
    }
  }
  Recipes.init({
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    recipeName: { type: DataTypes.STRING,
      allowNull: false
    },
    recipeLink: { type: DataTypes.STRING,
      allowNull: false
    },
    Deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'Recipes',
  });

  return Recipes;
};