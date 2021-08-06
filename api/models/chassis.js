var mongoose = require('mongoose');

var chassisSchema = new mongoose.Schema({
  series : {
    type: String,
    require: true
  },
  number : {
    type: Number,
    require: true
  }
});

var chassisModel = mongoose.model('Chassis' , chassisSchema);

module.exports = chassisModel; 