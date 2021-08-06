var mongoose = require('mongoose');

var vehicleSchema = mongoose.Schema({
  chassis : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chassis',
    require: true
  },
  type : {
    type: String,
    require: true
  },
  passengers : {
    type: mongoose.Schema.Types.Number,
    require: true
  },
  color : {
    type: String,
    require: true
  }
});

var vehicleModel = mongoose.model('Vehicle' , vehicleSchema);

module.exports = vehicleModel; 