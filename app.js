const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const fs = require("fs")
const session = require('express-session');
const sound = require("sound-play");
const os = require('os');
const path = require("path");
// const fetch = ( ...args) => {
//   import('node-fetch').then(({ default: fetch }) => fetch(...args));
// }
const sirenPath = path.join(__dirname, "/resources/siren.mp3");
//sound.play(sirenPath);
require("dotenv").config();
const open = ( ...args) => {
  import('open').then(({ default: open }) => open(...args)); 
} 
// open('http://localhost:7000/spin', {app: {name: 'firefox'}});  


function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAndRegenerateRandomNumber() {
  const randomNumber = getRandomInteger(1, 5);
  console.log("Generated random number:", randomNumber);
  
  const interval = randomNumber * 60 * 1000; // Convert to milliseconds
  setTimeout(generateAndRegenerateRandomNumber, interval);
  
  return randomNumber;
}

//generateAndRegenerateRandomNumber();



const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');

//const { forwardAuthenticated } = require('./config/auth');

let testRun = require("./test/index")


var starter = {}
starter.init = () => {
// testRun._app.runTests();

const virtualization = require('./sdk/Virtualization');
console.log(virtualization.initiatePlatform("youtube", "https://www.youtube.com/watch?v=KZ3tIGHU314"))


// const startAllCreatedVDServers = require('./sdk/newVDSIndex')

// startAllCreatedVDServers.spinVDServers("youtube", "https://www.youtube.com/watch?v=KZ3tIGHU314", 4)

//"youtube", "https://www.youtube.com/watch?v=KZ3tIGHU314", 5;

// TEST CODE
// Function to check if server files have been created
const testCheckServerFilesCreated = (num_of_servers) => {
  fs.access("./createdServers/app1.js", fs.constants.F_OK, function (err){
    if (err){
      console.log("Server files check failed ===> Created Server directory is empty")
      } else {
          for(let i=0; i < num_of_servers; i++){
              console.log("Server write function test passed")
          }
          // let serverEngine = require("")
      }
  })
}

testCheckServerFilesCreated(3);


// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.set('views', path.join(__dirname, './public/views'));

// To test route in app.js
// app.get("/check", (req, res, next) => {
// 	//res.send("Welcome to index")
//   res.render("spinreport")
// })

// MASTER DATABASE CONNECTION
const dbMain = require('./vars/db').mongoURI
  
// DB Config

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

// KEYS for OAUTH 2 integration 
GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
GOOGLE_CLIENT_SECRET =  process.env.GOOGLE_CLIENT_SECRET;


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


app.get('/testw', (req, res) => { 

  res.send("Index route on this VD Server"); 

}); 

// Routes
app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log('\x1b[34m%s\x1b[1m','STARTING UP MOTHER SERVER');
     console.log('\x1b[35m%s\x1b[1m',`Express Server on process ${process.pid}, started on port ${PORT}. Databases Started and Connected`)
      }
  );
}

module.exports = {
  starter : starter
};