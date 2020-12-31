const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// format data to post to the database
const seasonSchema = new Schema({
  season: { type: Number, required: true },
  episodes: { type: Array, required: true }
}, { timestamps: true });

const Season = mongoose.model('Season', seasonSchema);

module.exports = Season;







// example :
// episodes: [
//   season: 1,
//   episode: 1,
//   name: "Pilot",
//   references: [
//     "id": 1,
//     "subject": "Jack Kerouac",
//     "timestamp": "1:27",
//     "quote": "You're a regular Jack Kerouac.",
//     "speaker": "Lorelai",
//     "context": "Lorelai is approached by a stranger who flirts with her at Luke's diner. He tells her  that he is just passing by Stars Hollow to Hartford, and this is Lorelai's response",
//     "meaning": "Jack Kerouac was famous for his travels, which lead to his novel 'On The Road'.",
//     "screenshot": "https://some-picture-hosting-website.com/image"
//   ]
// ]


// const mongoose = require("mongoose")
// const Schema = mongoose.Schema

// const userSchema = new Schema({
//   userName: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     minlength: 3
//   },
// }, {
//   timestamps: true,
// })

// const User = mongoose.model('User', userSchema)

// module.exports = User