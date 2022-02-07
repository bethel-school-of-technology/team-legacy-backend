'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Recipes", deps: []
 * createTable "Users", deps: []
 * createTable "Ingredients", deps: [Users]
 *
 **/

var info = {
    "revision": 1,
    "name": "associations",
    "created": "2022-02-04T17:28:15.775Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Recipes",
            {
                "recipeId": {
                    "type": Sequelize.INTEGER,
                    "field": "recipeId",
                    "primaryKey": true,
                    "autoIncrement": true,
                    "allowNull": false
                },
                "recipeName": {
                    "type": Sequelize.STRING,
                    "field": "recipeName",
                    "allowNull": false
                },
                "recipeLink": {
                    "type": Sequelize.STRING,
                    "field": "recipeLink",
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Users",
            {
                "userId": {
                    "type": Sequelize.INTEGER,
                    "field": "userId",
                    "primaryKey": true,
                    "autoIncrement": true,
                    "allowNull": false
                },
                "firstName": {
                    "type": Sequelize.STRING,
                    "field": "firstName",
                    "allowNull": false
                },
                "lastName": {
                    "type": Sequelize.STRING,
                    "field": "lastName",
                    "allowNull": false
                },
                "username": {
                    "type": Sequelize.STRING,
                    "field": "username",
                    "unique": true,
                    "allowNull": false
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password",
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Ingredients",
            {
                "ingredientId": {
                    "type": Sequelize.INTEGER,
                    "field": "ingredientId",
                    "primaryKey": true,
                    "allowNull": false,
                    "autoIncrement": true
                },
                "ingredient": {
                    "type": Sequelize.STRING,
                    "field": "ingredient",
                    "allowNull": false
                },
                "ingredientQuantity": {
                    "type": Sequelize.INTEGER,
                    "field": "ingredientQuantity",
                    "allowNull": false
                },
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
                "userId": {
                    "type": Sequelize.INTEGER,
                    "field": "userId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Users",
                        "key": "userId"
                    },
                    "allowNull": true
                }
            },
            {}
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
