// const { Ingredients } = require('./ingredients');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
  }, {
    sequelize,
    modelName: 'Recipes',
  });

  // const Recipes = sequelize.define('Recipes', { name: DataTypes.STRING });
  // const Ingredients = sequelize.define('Ingredients', { name: DataTypes.STRING });
  // Recipes.belongsToMany(Ingredients, { through: 'IngredientsRecipes' });
  // Ingredients.belongsToMany(Recipes, { through: 'IngredientsRecipes' });

  return Recipes;
};