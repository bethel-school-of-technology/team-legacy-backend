var express = require('express');
var router = express.Router();
var authService = require('../services/auth');
const models = require('../models');

/* GET Recipes listing. */
router.get('/', function(req, res, next) {
    res.send('Everything is ready to go!');
  });
  
//GET Recipe by ID
  router.get('/:id', function(req, res, next) {
    let recipeId = parseInt(req.params.id);
    models.Recipes
    .findOne({
      where: {
        recipeId: recipeId,
      }
    })
    .then(recipe => {
      res.json(recipe);
    });
  });

  //POST Add Reicpe to DB
  router.post('/add', function (req, res, next) {
    models.Recipes
      .findOrCreate({
        where: {
          recipeName: req.body.recipeName
        },
        defaults: {
          recipeId: req.body.recipeId,
          recipeName: req.body.recipeName,
          recipeLink: req.body.recipeLink
        }
      })
      .spread(function (result, created) {
        if (created) {
          res.redirect('/recipes');
        } else {
          res.send('This recipe has already been added.');
        }
      });
  });


  module.exports = router;