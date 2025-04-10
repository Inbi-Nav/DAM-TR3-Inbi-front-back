const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  type: { type: String, required: true },
  message: { type: String, required: true }
});

module.exports = mongoose.model('Log', logSchema);
