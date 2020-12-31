const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const referenceSchema = new Schema({
  id: { type: Number, required: true },
  subject: { type: String, required: true },
  timestamp: { type: String, required: true },
  quote: { type: String, required: true },
  speaker: { type: String, required: true },
  context: { type: String, required: true },
  meaning: { type: String, required: true },
  screenshot: { type: String }
}, { timestamps: true });

const Reference = mongoose.model('Reference', referenceSchema);

module.exports = Reference;