'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "ingredient" to table "ingredients_user"
 * addColumn "quantityByUser" to table "ingredients_user"
 * changeColumn "UserId" on table "ingredients_user"
 * changeColumn "UserId" on table "ingredients_user"
 * changeColumn "ingredientId" on table "ingredients_user"
 * changeColumn "ingredientId" on table "ingredients_user"
 * changeColumn "recipeId" on table "ingredients_recipes"
 * changeColumn "recipeId" on table "ingredients_recipes"
 * changeColumn "ingredientId" on table "ingredients_recipes"
 * changeColumn "ingredientId" on table "ingredients_recipes"
 *
 **/

var info = {
    "revision": 4,
    "name": "updatedTables",
    "created": "2022-02-15T18:03:53.262Z",
    "comment": ""
};

var migrationCommands = [
    // {
    //     fn: "addColumn",
    //     params: [
    //         "ingredients_user",
    //         "ingredient",
    //         {
    //             "type": Sequelize.STRING,
    //             "field": "ingredient",
    //             "allowNull": false
    //         }
    //     ]
    // },
    // {
    //     fn: "addColumn",
    //     params: [
    //         "ingredients_user",
    //         "quantityByUser",
    //         {
    //             "type": Sequelize.DECIMAL,
    //             "field": "quantityByUser",
    //             "allowNull": true
    //         }
    //     ]
    // },
    // {
    //     fn: "changeColumn",
    //     params: [
    //         "ingredients_user",
    //         "UserId",
    //         {
    //             "type": Sequelize.INTEGER,
    //             "onUpdate": "CASCADE",
    //             "onDelete": "CASCADE",
    //             "unique": "ingredients_user_UserId_ingredientId_unique",
    //             "field": "UserId",
    //             "references": {
    //                 "model": "Users",
    //                 "key": "UserId"
    //             },
    //             "primaryKey": true,
    //             "allowNull": false
    //         }
    //     ]
    // },
    // {
    //     fn: "changeColumn",
    //     params: [
    //         "ingredients_user",
    //         "UserId",
    //         {
    //             "type": Sequelize.INTEGER,
    //             "onUpdate": "CASCADE",
    //             "onDelete": "CASCADE",
    //             "unique": "ingredients_user_UserId_ingredientId_unique",
    //             "field": "UserId",
    //             "references": {
    //                 "model": "Users",
    //                 "key": "UserId"
    //             },
    //             "primaryKey": true,
    //             "allowNull": false
    //         }
    //     ]
    // },
    // {
    //     fn: "changeColumn",
    //     params: [
    //         "ingredients_user",
    //         "ingredientId",
    //         {
    //             "type": Sequelize.INTEGER,
    //             "onUpdate": "CASCADE",
    //             "onDelete": "CASCADE",
    //             "unique": "ingredients_user_UserId_ingredientId_unique",
    //             "field": "ingredientId",
    //             "references": {
    //                 "model": "Ingredients",
    //                 "key": "ingredientId"
    //             },
    //             "primaryKey": true,
    //             "allowNull": false
    //         }
    //     ]
    // },
    // {
    //     fn: "changeColumn",
    //     params: [
    //         "ingredients_user",
    //         "ingredientId",
    //         {
    //             "type": Sequelize.INTEGER,
    //             "onUpdate": "CASCADE",
    //             "onDelete": "CASCADE",
    //             "unique": "ingredients_user_UserId_ingredientId_unique",
    //             "field": "ingredientId",
    //             "references": {
    //                 "model": "Ingredients",
    //                 "key": "ingredientId"
    //             },
    //             "primaryKey": true,
    //             "allowNull": false
    //         }
    //     ]
    // },
    // {
    //     fn: "changeColumn",
    //     params: [
    //         "ingredients_recipes",
    //         "recipeId",
    //         {
    //             "type": Sequelize.INTEGER,
    //             "onUpdate": "CASCADE",
    //             "onDelete": "CASCADE",
    //             "unique": "ingredients_recipes_recipeId_ingredientId_unique",
    //             "field": "recipeId",
    //             "references": {
    //                 "model": "Recipes",
    //                 "key": "recipeId"
    //             },
    //             "primaryKey": true,
    //             "allowNull": false
    //         }
    //     ]
    // },
    // {
    //     fn: "changeColumn",
    //     params: [
    //         "ingredients_recipes",
    //         "recipeId",
    //         {
    //             "type": Sequelize.INTEGER,
    //             "onUpdate": "CASCADE",
    //             "onDelete": "CASCADE",
    //             "unique": "ingredients_recipes_recipeId_ingredientId_unique",
    //             "field": "recipeId",
    //             "references": {
    //                 "model": "Recipes",
    //                 "key": "recipeId"
    //             },
    //             "primaryKey": true,
    //             "allowNull": false
    //         }
    //     ]
    // },
    // {
    //     fn: "changeColumn",
    //     params: [
    //         "ingredients_recipes",
    //         "ingredientId",
    //         {
    //             "type": Sequelize.INTEGER,
    //             "onUpdate": "CASCADE",
    //             "onDelete": "CASCADE",
    //             "unique": "ingredients_recipes_recipeId_ingredientId_unique",
    //             "field": "ingredientId",
    //             "references": {
    //                 "model": "Ingredients",
    //                 "key": "ingredientId"
    //             },
    //             "primaryKey": true,
    //             "allowNull": false
    //         }
    //     ]
    // },
    // {
    //     fn: "changeColumn",
    //     params: [
    //         "ingredients_recipes",
    //         "ingredientId",
    //         {
    //             "type": Sequelize.INTEGER,
    //             "onUpdate": "CASCADE",
    //             "onDelete": "CASCADE",
    //             "unique": "ingredients_recipes_recipeId_ingredientId_unique",
    //             "field": "ingredientId",
    //             "references": {
    //                 "model": "Ingredients",
    //                 "key": "ingredientId"
    //             },
    //             "primaryKey": true,
    //             "allowNull": false
    //         }
    //     ]
    // }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
