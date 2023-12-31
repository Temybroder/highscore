const ps = require('passport-local')
const LocalStrategy = ps.Strategy
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/User')

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
      }).then(user => {
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

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

    passport.deserializeUser( async function(id, done) {
      let err;
      try {
       let user = await User.findById(id)
       done(err, user)
      }
      catch(error){
        console.log(error)
      }
  
    }
    );

  // passport.deserializeUser(function(id, done) {
  //   User.findById(id)
  //   .then(user => {
  //     done(user)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // });


};
