const { User  } = require('../models');
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ingredients.belongsTo(models.User,  {
        foreignKey: "UserId",
        targetKey: "UserId"
      })

      // make associations here

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

//   User.hasMany(Ingredients, {
//     foreignKey: 'userId'
// });
// Ingredients.belongsTo(User);


  return Ingredients;
};