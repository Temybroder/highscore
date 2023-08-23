const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ActivitySchema = new mongoose.Schema({
  location: {
    type: String
  },
  time: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId, ref: 'users' 
  },
  funder: { 
    type: Schema.Types.ObjectId, ref: 'funders'
  },
  fundingOrder: { 
    type: Schema.Types.ObjectId, ref: 'fundingOrders'
  }
});

const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = Activity;