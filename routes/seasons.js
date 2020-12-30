const router = require('express').Router();
let Season = require('../models/season.model');

// ....../seasons/id

// get season at id (1-7)
router.route('/:id').get((req, res) => {
  Season.find({ season: req.params.id })
    .then(seasons => res.json(seasons))
    .catch(err => res.status(400).json('Error: ' + err));
})

// add season
router.route('/add').post((req, res) => {
  const { season, episodes } = req.body
  const newSeasonEpisode = new Season({ season , episodes })

  newSeasonEpisode.save()
    .then(() => res.json('SeasonEpisode added!'))
    .catch(err => res.status(400).json('Error: ' + err))
})        


// seasons/:id/episodes/:id
router.route('/:seasonId/episodes/:episodeId').get((req, res) => {
  const seasonId = req.params.seasonId;
  const episodeId = req.params.episodeId;

  Season.find({ 
    seasonNumber: seasonId,
    episodeNumber: episodeId 
  })
});



// const router = require('express').Router();
// let Exercise = require('../models/exercise.model');

// router.route('/').get((req, res) => {
//   Exercise.find()
//     .then(exercises => res.json(exercises))
//     .catch(err => res.status(400).json('Error: ' + err));
// });


module.exports = router;