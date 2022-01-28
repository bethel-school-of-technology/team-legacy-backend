var express = require('express');
var router = express.Router();
var authService = require('../services/auth');
const { User } = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Everything is ready to go!');
});

/* GET /:id get individual user */


/* POST Create new user */

// router.post('/', function(req, res, next) {
//   User.findOrCreate({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         username: req.body.username,
//         password: req.body.password
//     })
//     .then(function(result, created) {
//       if (created) {
//         res.send('User successfully created');
//       } else {
//         res.send('This user already exists');
//       }
//     });
// });

router.post('/signup', function (req, res, next) {
  User
    .findOrCreate({
      where: {
        username: req.body.username
      },
      defaults: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: authService.hashPassword(req.body.password) //<--- Change to this code here
      }
    })
    .spread(function (result, created) {
      if (created) {
        res.send('User successfully created');
      } else {
        res.send('This user already exists');
      }
    });
});


/* PUT Update user */

/* DELETE delete user */


module.exports = router;
