const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const os = require('os');
const path = require("path");
require("dotenv").config();
const open = ( ...args) => {
  import('open').then(({ default: open }) => open(...args)); 
}   

const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');

//const { forwardAuthenticated } = require('./config/auth');

let testRun = require("./test/index")


var starter = {}
starter.init = () => {

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.set('views', path.join(__dirname, './public/views'));

// MASTER DATABASE CONNECTION
const dbMain = require('./vars/db').mongoURI

// Connect to MongoDB
mongoose
  .connect(
    dbMain,
    { useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log('MongoDB :::=> Database Connected Successfully'))
  .catch(err => console.log(err));

// Express session
app.use(
    session({
      secret: 'ht*rwek343[pw39u4231',
      resave: true,
      saveUninitialized: true,
      // store: 
     })
   );
  

// Passport Config
require('./config/passport')(passport);

// Express body parser
app.use(express.urlencoded({ extended: true }));
 
// // Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index'));

const PORT = 3000;

app.listen(PORT, () => {
  console.log('\x1b[34m%s\x1b[1m','STARTING UP MOTHER SERVER');
     console.log('\x1b[35m%s\x1b[1m',`Express Server on process ${process.pid}, started on port ${PORT}. Databases Started and Connected`)
      }
  );
}

module.exports = {
  starter : starter
};
