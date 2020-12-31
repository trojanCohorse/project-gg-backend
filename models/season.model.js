const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// format data to post to the database
const seasonSchema = new Schema({
  season: { type: Number, required: true },
  episodes: { type: Array, required: true }
});

const Season = mongoose.model('Season', seasonSchema);

module.exports = Season;
