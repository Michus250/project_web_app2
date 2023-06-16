const mongoose = require('mongoose');

const examinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    // get: v => parseFloat(v),
    // set: v => parseFloat(v)

  }
});

const Examination = mongoose.model('Examination', examinationSchema);

module.exports = Examination;
