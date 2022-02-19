var express = require('express');
var router = express.Router();
var authService = require('../services/auth');
const { User } = require('../models');
const cors = require("cors");

router.use(cors());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Everything is ready to go!');
});

/* GET Load profile page  */
router.get('/profile', function (req, res, next) {
  let token = req.cookies.jwt; //req.header.jwt (check with Jan if Andrew or Rickey need something different.)
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          res.send(JSON.stringify(user));
        } else {
          res.status(401);
          res.send('Invalid authentication token');
        }
      });
  } else {
    res.status(401);
    res.send('Must be logged in');
  }
});

/* GET Logout of Profile page */

router.get('/logout', function (req, res, next) {
  res.cookie('jwt', "", { expires: new Date(0) });
  res.send('Logged out');
  });


/* POST Create new user if one doesn't exsist */

router.post('/signup', function (req, res, next) {
  res.setHeader("Acess-Control-Allow-Origin",  "http://localhost:4200");
  console.log(req.body)
  User
    .findOrCreate({
      where: {
        username: req.body.username
      },
      defaults: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: authService.hashPassword(req.body.password)
      
      }
    })
    .spread((result, created) => {
      if (created) {
        res.json(created);
      } else {
        res.send("something went wrong")
      }
    })
});

/* Login user and return JWT as a cookie */
router.post('/login', function (req, res, next) {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (!user) {
      console.log('User not found')
      res.send({
        message: "Login not successful."
      });
    } else {
      let passwordMatch = authService.comparePasswords(req.body.password, user.password);
      if (passwordMatch) {
        let token = authService.signUser(user);
        res.cookie('jwt', token);
        res.json({
          message: "Login Successful.",
          token: token
        });
      } else {
        console.log('Wrong password');
        res.send({
          message: "Login not successful."
        });
      }
    }
  });
});
module.exports = router;
