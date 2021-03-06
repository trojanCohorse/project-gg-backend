const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// format data to post to the database
const episodeSchema = new Schema({
  seasonNumber: { type: Number, required: true },
  episodeNumber: { type: Number, required: true, },
  references: { type: Array, required: true }
}, { timestamps: true });


const Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;
// name: { type: String, required: true, },