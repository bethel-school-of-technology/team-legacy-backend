'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "Deleted" to table "Ingredients"
 * addColumn "Deleted" to table "ingredients_user"
 * addColumn "Deleted" to table "Recipes"
 * addColumn "Deleted" to table "Users"
 *
 **/

var info = {
    "revision": 5,
    "name": "AddedDeletedColumns",
    "created": "2022-02-15T18:23:35.307Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "Ingredients",
            "Deleted",
            {
                "type": Sequelize.BOOLEAN,
                "field": "Deleted",
                "defaultValue": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "ingredients_user",
            "Deleted",
            {
                "type": Sequelize.BOOLEAN,
                "field": "Deleted",
                "defaultValue": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Recipes",
            "Deleted",
            {
                "type": Sequelize.BOOLEAN,
                "field": "Deleted",
                "defaultValue": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Users",
            "Deleted",
            {
                "type": Sequelize.BOOLEAN,
                "field": "Deleted",
                "defaultValue": false
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
