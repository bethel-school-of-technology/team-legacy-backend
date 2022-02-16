/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ingredients_user', {
    // createdAt: {
    //   type: DataTypes.DATE,
    //   allowNull: false
    // },
    // updatedAt: {
    //   type: DataTypes.DATE,
    //   allowNull: false
    // },
    // ingredientId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   primaryKey: true,
    //   references: {
    //     model: 'Ingredients',
    //     key: 'ingredientId'
    //   }
    // },
    // UserId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   primaryKey: true,
    //   references: {
    //     model: 'Users',
    //     key: 'UserId'
    //   }
    // },
    // quantityByUser: {
    //   type: DataTypes.DECIMAL,
    //   allowNull: true
    // },
    // ingredient: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    //   },
    //   Deleted: {
    //     type: DataTypes.BOOLEAN,
    //     defaultValue: false
    //   },
  }, {
    tableName: 'ingredients_user'
  });
};
