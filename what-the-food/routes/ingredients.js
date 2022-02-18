var express = require('express');
var router = express.Router();
var authService = require('../services/auth');
const models = require('../models');


const authorize = (req, res, next) => {
  let token = req.cookies.jwt; //req.header.jwt (check with Jan if Andrew or Rickey need something different.)
  console.log(token)
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          res.locals.user = user;
          console.log(user)
          next();
        } else {
          res.status(401);
          res.send('Invalid authentication token');
        }
      });
  } else {
    res.status(401);
    res.send('Must be logged in');
  }
};


// GET list of ingredients in pantry. I want it to be connected to individual user & must be authorized
router.get('/', function(req, res) {
  models.Ingredients.findAll()
.then(listIngredients => {
  res.json(listIngredients)

  }).catch(() => {
    res.status(400).send();
  });
});

  //POST Add Ingredient to DB <- This route works!
  router.post('/add', function (req, res, next) {
  //  models.ingredients_user
   
    models.Ingredients
      .findOrCreate({
        where: {
          ingredient: req.body.ingredient
        },
        defaults: {
          ingredientId: req.body.ingredientId,
          ingredient: req.body.ingredient,
          ingredientQuantity: req.body.ingredientQuantity
        }
      })
      .spread(function (result, created) {
        if (created) {
          res.redirect('/ingredients');
        } else {
          res.send('This ingredient already added.');
        }
      });
  });

  //POST User is selecting ingredient for later use in a recipe
  router.post("/userselectingingredient/:id", authorize, function (req, res, next){
    let ingredientId = parseInt(req.params.id);
    models.ingredients_user
    .findOrCreate({
      where: { ingredientId: ingredientId, UserId: res.locals.user.UserId },
      defaults: {
        ingredientId,
        UserId: res.locals.user.UserId,
        ingredient: req.body.ingredient,
        quantityByUser: req.body.quantityByUser
      }
    }).then(
      res.json({ok: 1})
    ).catch(error => {
      res.json({ok: 0, error: error})
    })
  });

  //PUT to edit ingredients and redirect to ingredients list <- This does work the redirection works but want ingredient by ID)
  router.put("/edit/:id", authorize, function (req, res, next) {
    let ingredientId = parseInt(req.params.id);
    models.Ingredients
      .update(req.body, { where: { ingredientId: ingredientId } })
      .then(
        res.send("The ingredient has been updated."));
    });


//GET Ingredients by ID <- This does work!!
router.get('/find/:id', authorize, function(req, res, next) {
  let ingredientId = parseInt(req.params.id);
  models.Ingredients
  .findOne({
    where: {
      ingredientId: ingredientId
    }
  })
  .then(ingredient => {
    res.json(ingredient);
  });
});

//DELETE Delete ingredient by ID <- gives 404 error
router.put('/delete/:id', authorize, function(req, res) {
  let ingredientId = parseInt(req.params.id);
    models.Ingredients
    .update({Deleted: true},
        { where: { ingredientId: ingredientId } })
    .then(res.send('Ingredient has successfully been deleted.'));
});

//GET ALL Recipes:/ingredientId
router.get('/recipesbyingredient/:id', authorize, function(req, res, next) {
  console.log('Hi from recipesbyingredient');
  let ingredientId = parseInt(req.params.id);

models.ingredients_recipes.findAll({
  where: {ingredientId: ingredientId},
  attributes: ['recipeId'],
  raw : true
}).map(result => result.recipeId)
.then(recipeIds => {
  
  models.Recipes.findAll({
    where: {
      recipeId: recipeIds
    }
  }).then(recipes =>{
    res.json(recipes);
  })
})
});

console.log('defining Gets /recipesbyuseringredients');
//GET UserId by ingredients_user will get recipes
router.get('/recipesbyuseringredients', authorize, function(req, res, next) {
console.log(res.locals.user)
  models.ingredients_user.findAll({
    where: {UserId: res.locals.user.UserId},
    attributes: ['ingredientId'],
    raw : true
  })  
  .map(result => {
    console.log(result);
    return result.ingredientId;
  })
  .then(ingredientIds => {
    console.log(ingredientIds)
    models.ingredients_recipes.findAll({
      where: {ingredientId: ingredientIds},
      attributes: ['recipeId'],
      raw : true
    })
    .map(result => result.recipeId)
    .then(recipeIds => { 
      models.Recipes.findAll({
        where: {
          recipeId: recipeIds
        }
      }).then(recipes =>{
        res.json(recipes);
      })
    })
  });
});

  module.exports = router;