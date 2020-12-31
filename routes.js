const router = require('express').Router();
const Season = require('./models/season.model');
const Episode = require('./models/episode.model');
// const Reference = require('./models/reference.model');

//******* GET Endpoints ********/

// get season at id (1-7)
router.route('/:id').get((req, res) => {
  Season.find({ season: req.params.id })
    .then(season => res.status(200).json(season))
    .catch(err => res.status(500).json('Error: ' + err));
})

// get episodes from a season
router.route('/:id/episodes').get((req, res) => {
  Season.find({ season: req.params.id })
    .then(season => {
      // might wanna return something else if it's empty, not too sure yet
      // if (season.episodes.length > 0) {
        res.status(200).json(season[0].episodes);
      // } else {
        // res.status(200).json(season.episodes);
      // }
    })
    .catch(err => res.status(500).json('Error: ' + err));
})

// get specific episode from a season
router.route('/:seasonId/episodes/:episodeId').get((req, res) => {
  const { seasonId, episodeId } = req.params;
  Season.find({ 
    season: seasonId
  }).then(season => {
    // season[0].episodes is an array
    const episode = season[0].episodes.filter(episode => episode.episodeNumber === episodeId);
    res.status(200).json(episode);
  })
  .catch(err => res.status(500).json('Error: ' + err));
})

// get specific references from an episode from a season
router.route('/:seasonId/episodes/:episodeId/references').get((req, res) => {
  const { seasonId, episodeId } = req.params;
  Season.find({
    season: seasonId
  }).then(season => {
    const episode = season[0].episodes.filter(episode => episode.episodeNumber === episodeId);
    res.status(200).json(episode[0].references);
  })
  .catch(err => res.status(500).json('Error: ' + err));
})

// get specific reference from the list of references from an episode from a season
router.route('/:seasonId/episodes/:episodeId/references/:referenceId').get((req, res) => {
  const { seasonId, episodeId, referenceId } = req.params;
  Season.find({
    season: seasonId
  }).then(season => {
    const episode = season[0].episodes.filter(episode => episode.episodeNumber === episodeId);
    const reference = episode[0].references.filter(ref => ref.id === Number(referenceId));
    res.status(200).json(reference);
  })
  .catch(err => res.status(500).json('Error: ' + err));
})


//******* UPDATE Endpoints ********/

// add season
router.route('/add').post((req, res) => {
  const { season, episodes } = req.body;
  const newSeasonEpisode = new Season({ season , episodes });

  newSeasonEpisode.save()
    .then(() => res.json('SeasonEpisode added!'))
    .catch(err => res.status(500).json('Error: ' + err))
})        

// add episode
router.route('/episodes/add').put(async (req, res) => {
  const episodeData = req.body;
  console.log(typeof episodeData);
  if (episodeData == {}) {
    console.log('wrongg');
    res.status(400).json('Please provide episode');
  } 
  // const season = await Season.findOne({ season: req.params.id });

  // const seasonNumber = episodeData
  // const newEpisode = new Episode({ 
    
  // })
  // season.episodes.push(newEpisode);
  // // const updated = await season.save();
  // res.json('updated');
})

// dummy data for post on episode:
// {
//   "seasonNumber": "1",
//   "episodeNumber": "2",
//   "name": "The Lorelais' First Day at Chilton",
//   "references": []
// }


module.exports = router;

// const router = require('express').Router();
// let Exercise = require('../models/exercise.model');

// router.route('/').get((req, res) => {
//   Exercise.find()
//     .then(exercises => res.json(exercises))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

