const jwt = require('jsonwebtoken');
const models = require('../models/index');
const bcrypt = require("bcryptjs");
const { User } = require('../models');

var authService = {
    signUser: function (user) {
        const token = jwt.sign(
            {
                username: user.username,                        // payload information
                userId: user.userId
            },
            'secretkey',
            {
                expiresIn: '1h'                                 // token expires
            }
        );
        return token;
    },                                                          // NEED TO ADD THIS COMMA
    verifyUser: function (token) {                              // receive JWT token as parameter
        try {
            let decoded = jwt.verify(token, 'secretkey');       // Decrypt token using same key used to encrypt
            return User.findByPk(decoded.userId);       // Return result of database query as promise
        } catch (err) {
            console.log(err);
            return null;
        }
    },
    hashPassword: function (plainTextPassword) {
        let salt = bcrypt.genSaltSync(10);                      // "sprinkle in" random chars into password
        let hash = bcrypt.hashSync(plainTextPassword, salt);
        return hash;
    },
    comparePasswords: function (plainTextPassword, hashedPassword) {
        return bcrypt.compareSync(plainTextPassword, hashedPassword)
    }
}

module.exports = authService;