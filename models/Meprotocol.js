const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MeprotocolSchema = new mongoose.Schema({
 data: {
    type: String
  }
 
});

const Meprotocol = mongoose.model('Meprotocol', MeprotocolSchema);

module.exports = Meprotocol;
