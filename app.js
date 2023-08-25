const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const path = require("path");
const open = ( ...args) => {
  import('open').then(({ default: open }) => open(...args)); 
}   

const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');




// Routes
app.use('/', require('./routes/index'));

const PORT = 3000;

app.listen(PORT, () => {
     console.log(`Express Server started on port ${PORT}. Databases Started and Connected`)
      }
  );
}

