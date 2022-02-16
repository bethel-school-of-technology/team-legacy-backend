var express = require('express');
var router = express.Router();
var authService = require('../services/auth');
const models = require('../models');


// const authorization = (req, res, next) => {
//   let token = req.cookies.jwt; //req.header.jwt (check with Jan if Andrew or Rickey need something different.)
//   if (token) {
//     authService.verifyUser(token)
//       .then(user => {
//         if (user) {
//           res.send(JSON.stringify(user));
//         } else {
//           res.status(401);
//           res.send('Invalid authentication token');
//         }
//       });
//   } else {
//     res.status(401);
//     res.send('Must be logged in');
//   }
// };


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

  //PUT to edit ingredients and redirect to ingredients list <- This does work the redirection works but want ingredient by ID)
  router.put("/edit/:id", function (req, res, next) {
    let ingredientId = parseInt(req.params.id);
    models.Ingredients
      .update(req.body, { where: { ingredientId: ingredientId } })
      .then(
        res.send("The ingredient has been updated."));
    })


//GET Ingredients by ID <- This does work!!
router.get('/:id', function(req, res, next) {
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
router.delete('/delete/:id', function(req, res) {
  let ingredientId = parseInt(req.params.id);
    models.Ingredients
    .update({Deleted: true},
        { where: { ingredientId: ingredientId } })
    .then(res.send('Ingredient has successfully been deleted.'));
});

//GET ALL ingredients:/ID
router.get('/every/:id', function(req, res, next) {
  let ingredientId = parseInt(req.params.id);
  models.Ingredients.findByPk(ingredientId, {
    include: [
      {
        model: models.Recipes,
        as: models.Ingredients,
        attributes: ["recipeName", "recipeLink"],
        through: {
          attributes: ["ingredientId", "recipeId"],
        },
      },
    ],
  })

  // models.Ingredients
  // .findAll({
  //   where: {
  //     ingredientId: ingredientId
  //   },
  //   include: 
  //   [
  //     {
  //       model: models.Recipes,
  //       as: Recipes,
  //       where: {Deleted: false},
  //       required: false
  //     }
  //   ]
  //})
  .then(recipesFound => {
    console.log(recipesFound)
    res.json(recipesFound);
  });
});

  module.exports = router;