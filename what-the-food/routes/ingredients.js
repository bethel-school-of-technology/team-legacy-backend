var express = require('express');
var router = express.Router();
var authService = require('../services/auth');
const models = require('../models');


// const authorization = (req, res, next) => {
//   let token = req.cookies.jwt; //req.header.jwt (check with Jan if Andrew or Rickey need something different.)
//   if (token) {
//     authService.verifyUser(token)
//       .next
//       (ingredient => {
//         if (ingredient) {
//           res.send(JSON.stringify(ingredient));
//         }
//          else {
//           res.status(401);
//           res.send('Invalid authentication token');
//         }
//       });
//   }
// }

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
      .then(res.redirect('/ingredients')) //A message saying updated complete
      .catch(err => {
        res.status(400);
        res.send("There was a problem updating the ingredient.  Please check the ingredient information.");
      });
  });

//GET Ingredients by ID <- This does not work!! It almost works but is missing something
router.get('/:id', function(req, res, next) {
  models.Ingredients
    .findByPk(parseInt(req.params.id), { 
      include: [{ model: models.Ingredients }]
    })
    .then(ingredientFound => {
      res.setHeader('Content-Type', 'application/json');
      res.redirect(JSON.stringify(ingredientFound));
    })
});

//DELETE Delete ingredient by ID <- gives 404 error
router.delete('/delete/:id', function(req, res) {
  let ingredientId = parseInt(req.params.id);
    models.Ingredients
    .delete(
        { ingredientId: req.body.ingredientId, 
          ingredient: req.body.ingredient, 
          ingredientQuantity: req.body.ingredientQuantity},
        { where: { ingredientId: ingredientId } })
    .then(res.redirect('/ingredients'));
});

  module.exports = router;

//   router.post('/', function(req, res) {
//   res.send('You successfully created a POST route!');
// });

// router.get('/', function(req, res) {
//   res.send('You successfully created a GET route!');
// });

// router.put('/', function(req, res) {
//   res.send('You successfully created a PUT route!');
// });

// router.delete('/', function(req, res) {
//   res.send('You successfully created a DELETE route!');
// });
