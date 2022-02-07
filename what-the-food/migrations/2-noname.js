'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "userId" from table "Ingredients"
 * removeColumn "userId" from table "Users"
 * createTable "ingredients_recipes", deps: [Ingredients, Recipes]
 * addColumn "UserId" to table "Users"
 * addColumn "UserId" to table "Ingredients"
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2022-02-07T15:10:07.623Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Ingredients", "userId"]
    },
    {
        fn: "removeColumn",
        params: ["Users", "userId"]
    },
    {
        fn: "createTable",
        params: [
            "ingredients_recipes",
            {
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "ingredientId": {
                    "type": Sequelize.INTEGER,
                    "field": "ingredientId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Ingredients",
                        "key": "ingredientId"
                    },
                    "primaryKey": true
                },
                "recipeId": {
                    "type": Sequelize.INTEGER,
                    "field": "recipeId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Recipes",
                        "key": "recipeId"
                    },
                    "primaryKey": true
                }
            },
            {}
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Users",
            "UserId",
            {
                "type": Sequelize.INTEGER,
                "field": "UserId",
                "primaryKey": true,
                "autoIncrement": true,
                "allowNull": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Ingredients",
            "UserId",
            {
                "type": Sequelize.INTEGER,
                "field": "UserId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Users",
                    "key": "UserId"
                },
                "allowNull": true
            }
        ]
    }
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
