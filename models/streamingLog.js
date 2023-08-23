const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const strLogSchema = new mongoose.Schema({
  platform: {
    type: String
  },
  dateExecuted: {
    type: Date
  },
  virtualDeviceNum: {
    type: String
  },
  numOfStreams: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId, ref: 'users' 
  },
  status: { 
    type: Number, default: 1 
  },
  rating_options:[]
});

const StrLog = mongoose.model('strLog', strLogSchema);

module.exports = StrLog;