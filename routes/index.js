const express = require('express');

const router = express.Router();

const virtualBox = require("../sdk/index");

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passport = require('passport');


const path = require("path");
const fsx = require("fs-extra");

const { spinUp, startVD } = require("../controllers/vController");

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

let User =  require('../models/User');

let baseDir = path.join(__dirname,'/../');

//ROUTES
router.get('/abs', (req, res) => {
 res.send("Wlecome to HighScore root api")
});

router.post('/webhook', (req, res) => {
  let payload = req;
  return res.send(req);  
});


router.get('/', (req, res) => {
    res.render('welcome', {a : 7000});
});

router.get('/test', (req, res) => {
  res.send('welcome inside Index Route file');
  return
});

router.get('/cl', (req, res) => {
  return res.send('<script>window.close();</script>');
});


router.get('/sp', (req, res) => {
 
  res.render('stream-modal');
});


router.get('/rand', (req, res) => {
  
  function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function generateRandomNumber() {
    const randomNumber = getRandomInteger(1, 10);
    console.log("Generated random number:", randomNumber);
    return randomNumber;
  }
  
  // Generate a random number immediately and then every 5 minutes
  generateRandomNumber();
  setInterval(generateRandomNumber, 1 * 60 * 1000);

  res.send('welcome inside Index Route file');
  return
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/registerllk', (req, res) => {
    res.render('register');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {user: req.user});
});

router.post('/spinup', spinUp);

// Intermediate page after Spinning VDs
router.get('/mid/:combinedParams', async (req, res) => {
   let splitParams = req.params.combinedParams.split(".");
   let payload = {
      pl: splitParams[0],
      red: splitParams[1].substring(2),
      vdnum: splitParams[2]
    }
    let user = {
      name: "Sammie",
      email: "sammie@gmail.com"
  }
    res.render('stream-mid', {
      combinedParams: splitParams,
      payload: payload, 
      user: user
    });
});


router.get("/rs", (req, res) => {
  let medredirecturl = "v=ly36kn0ug4k".substring(2)
  let red = "https://www.youtube.com/embed/".concat(medredirecturl);
  console.log(red)
  res.render("stream", {red: red})
})

// Route to Actually start the Virtual Devices
router.get('/spinvds/:combinedParams', async (req, res) => {
  let combinedParams = req.params.combinedParams;
   let splitParams = combinedParams.split(",");
   let platform = splitParams[0];
   let medredirecturl = splitParams[1].slice(2);
   let vdnumber = splitParams[2];
    let mediaUrl = "https://www.youtube.com/embed/".concat(medredirecturl);
    const num_of_servers = vdnumber;
    try {
      console.log("ASYNC PLATFORM STRING VALUE IS " + platform)
     await virtualBox.serverWriter.spinEventManager(platform, mediaUrl, num_of_servers);
     res.redirect("/report/"+`${combinedParams}`);
     return;
    }
    catch (error){
      res.send("There was an ERROR ===  " + error);
      return;
    }
  });


//Route to display spin report
router.get('/report/:combinedParams', (req, res) => {
  let combinedParams = req.params.combinedParams;
  let splitParams = combinedParams.split(",");
  let platform = splitParams[0]
  let medredirecturl = splitParams[1].substring(2);
  let vdnumber = splitParams[2]
  let user = {
    name: "Sammie",
    email: "sammie@gmail.com"
}
let payload = {
  pl: platform,
  red: medredirecturl,
  vdnum: vdnumber
}
    res.render("spinreports", {user: user, payload: payload});
});

//Route to display Stream device (VD Page to show streaming activity)
router.get('/stream/:urlP', (req, res) => {
  let allParams = req.params.urlP.toString();
  let splitParams = allParams.split(",");
  let mediaurl = splitParams[0];
  let PORT = splitParams[1] || 7000;
  function formatUrl (ytUrl) {  
    let finalUrl = "https://www.youtube.com/embed/".concat(ytUrl);  
    return finalUrl;
  }  
const finalUrl = formatUrl(mediaurl); 
    let payload = {
        uParam: req.params.urlP,
        red: finalUrl,
        p: PORT
    }
    console.log("STREAMING PAYLOAD AT STREAMING ROUTE IS " + JSON.stringify(payload))
  res.render("stream", {payload: payload});
});



// Route to End the whole Virtualization Process
router.get('/rfrs', (req, res, next) => {

fsx.emptyDir(baseDir + "/createdVDServers")
.then(() => {
  console.log('SUCCESS EMPTYING LOGS!')
})
.catch(err => {
  console.error(err)
})
fsx.remove(baseDir + "/sdk/" + "newVDSIndex.js")
.then(() => {
  console.log('SUCCESS REMOVINF INDEX FILE!')
})
.catch(err => {
  console.error(err)
})
    res.render("login")
  }
);


////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////  AUTHENTICATION ROUTES   //////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next);
  });

  
  // Logout
  router.get('/logout', (req, res) => {
    req.logout(function(err){
      if (err) {return next(err)}
      req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
    } );
  });



// // Register
// router.post('/register', (req, res) => {

//     const { name, email, password, password2 } = req.body;
//     let errors = [];
  
//     if (!name || !email || !password || !password2) {
//       errors.push({ msg: 'Please enter all fields' });
//     }
  
//     if (password != password2) {
//       errors.push({ msg: 'Passwords do not match' });
//     }
  
//     if (password.length < 8) {
//       errors.push({ msg: 'Password must be at least 8 characters' });
//     }
  
//     if (errors.length > 0) {
//       res.render('register', {
//         errors,
//         name,
//         email,
//         password,
//         password2
//       });
//     } else {
//       User.findOne({ email: email }).then(user => {
//         if (!user) {
//           errors.push({ msg: 'Ouch! That Email already exists. Please use a different email or Login to your account' });
//           res.render('register', {
//             errors,
//             name,
//             email,
//             password,
//             password2
//           });
//         } else {
//           var newUser = {
//             _id: new mongoose.Types.ObjectId(),
//             name: req.body.name,
//             email : req.body.email,
//             password : req.body.password
//           };
  
//           bcrypt.genSalt(10, (err, salt) => {
//             bcrypt.hash(newUser.password, salt, (err, hash) => {
//               if (err) throw err;
//               newUser.password = hash;  
//               User.findByIdAndUpdate(id,
//                 { $set: {
//                   name: newUser.name,
//                   password: newUser.password
//                 }}, 
//                 { new: true }, function (err, user) {
                  
//                 if (err) {
//                 res.render("error");
//                 } 
//                 req.flash('success_msg', 'Your High Score Account is Created');
//                 res.redirect('/users/login');
//               })
//             });
//           });
//         }
//       });
//     }
//   });
  

router.post('/register', (req, res) => {
  const { _id, name, email, password, password2} = req.body;
  let errors = [];

  if (!name || !email || !password || !password2 ) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
    
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {

        const newUser = new User(
        {
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          email : req.body.email,
          password : req.body.password
        }
        );

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/login');
              })
              .catch(err => console.log("Register route error is " + err));
          });
        });
      }
    });
  }
});

module.exports = router;
