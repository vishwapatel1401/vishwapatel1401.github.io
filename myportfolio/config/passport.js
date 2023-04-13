//Name: Vishwa Patel, Hifza Hameed
//File: passport.js
//Date: 13th april, 2023
//Student id:100851337, 100833037
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// Load User model
const {User} = require('../models/userModel');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
      // Match user
      User.findOne({
        username: username,
      }).then((user) => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }
        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  

  passport.serializeUser(function (user, done) {
    // console.log('User in pass: ', user);
    done(null, {id: user.id, username: user.username});
  });

  passport.deserializeUser(function (u, done) {
    // console.log('User in pass-Desri: ', id);
    User.findById(u.id)
    .then(function (user) {
      done(null, user);
    })
    .catch(function (err) {
      done(err, null);
    });


  });
};
