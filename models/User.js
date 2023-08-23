const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema({
 name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    default: "user",
    enum: ['user', 'admin', 'superadmin']
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
