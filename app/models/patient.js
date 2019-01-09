var mongoose = require('mongoose');

var Patient = mongoose.model('Patient', {
  name : {
    type: String,
    required: true
  },
  age : {
    type: Number,
    required: true
  },
  outstanding : {
    type: Number,
    default: 0
  },
});

module.exports = {Patient};
