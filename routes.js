const router = require("express").Router();
const Season = require("./models/season.model");
const Episode = require("./models/episode.model");
const Reference = require("./models/reference.model");
// const Reference = require('./models/reference.model');

//******* GET Endpoints ********/

// get ALL seasons
router.route("/").get(async (req, res) => {
  const seasons = await Season.find();
  res.status(200).json(seasons);
});

// approve new references
router.route("/approve").get(async (req, res) => {
  const episodes = await Episode.find();
  console.log(episodes);
  res.status(200).json(episodes);
});

// get season at id (1-7)
router.route("/:id").get((req, res) => {
  Season.find({ season: req.params.id })
    .then((season) => res.status(200).json(season))
    .catch((err) => res.status(500).json("Error: " + err));
});

// get episodes from a season
router.route("/:id/episodes").get((req, res) => {
  Season.find({ season: req.params.id })
    .then((season) => {
      // might wanna return something else if it's empty, not too sure yet
      // if (season.episodes.length > 0) {
      res.status(200).json(season[0].episodes);
      // } else {
      // res.status(200).json(season.episodes);
      // }
    })
    .catch((err) => res.status(500).json("Error: " + err));
});

// get specific episode from a season
router.route("/:seasonId/episodes/:episodeId").get((req, res) => {
  const { seasonId, episodeId } = req.params;
  Season.find({
    season: seasonId,
  })
    .then((season) => {
      // season[0].episodes is an array
      const episode = season[0].episodes.filter(
        (episode) => episode.episodeNumber === episodeId
      );
      res.status(200).json(episode);
    })
    .catch((err) => res.status(500).json("Error: " + err));
});

// get specific references from an episode from a season
router.route("/:seasonId/episodes/:episodeId/references").get((req, res) => {
  const { seasonId, episodeId } = req.params;
  Season.find({
    season: seasonId,
  })
    .then((season) => {
      const episode = season[0].episodes.filter(
        (episode) => episode.episodeNumber === episodeId
      );
      res.status(200).json(episode[0].references);
    })
    .catch((err) => res.status(500).json("Error: " + err));
});

// get specific reference from the list of references from an episode from a season
router
  .route("/:seasonId/episodes/:episodeId/references/:referenceId")
  .get((req, res) => {
    const { seasonId, episodeId, referenceId } = req.params;
    Season.find({
      season: seasonId,
    })
      .then((season) => {
        const episode = season[0].episodes.filter(
          (episode) => episode.episodeNumber === episodeId
        );
        const reference = episode[0].references.filter(
          (ref) => ref.id === Number(referenceId)
        );
        res.status(200).json(reference);
      })
      .catch((err) => res.status(500).json("Error: " + err));
  });

//******* UPDATE Endpoints ********/

// add episode
router.route("/episodes/add").post(async (req, res) => {
  const { seasonNumber, episodeNumber, name } = req.body;

  if (!seasonNumber || !episodeNumber) {
    res.status(400).json("Please provide episode data");
  } else {
    const season = await Season.findOne({ season: seasonNumber });
    const references = req.body.references || [];

    if (
      season.episodes.filter(
        (item) => Number(item.episodeNumber) == Number(episodeNumber)
      ).length > 0
    ) {
      res.status(400).json("Episode already exists!");
    } else {
      const newEpisode = new Episode({
        seasonNumber,
        episodeNumber,
        name,
        references,
      });
      season.episodes.push(newEpisode);

      season.save().then(() => res.status(200).json(newEpisode));
    }
  }
});

// add post data to middle database so that admin can authenticate data
router.route('/add').post(async (req, res) => {
  const { seasonNumber, episodeNumber, name, references } = req.body;
  const { subject, timestamp, quote, speaker, context, meaning } = references;

  res.status(500).json('TESTING BRO WHY  WHGY');

  // res.status(200).json('working.');

  if (!subject || !timestamp || !quote || !speaker || !context || !meaning) {
    res.status(400).json('Please provide reference info');
  } else if (!seasonNumber || !episodeNumber) {
    res.status(400).json('Please provide season number and episode number');
  } 
  
  const episode = await Episode.find({ episodeNumber: episodeNumber });
  if (episode.length === 0) {
    const newEpisode = new Episode({
      seasonNumber, episodeNumber, name, references 
    });

    newEpisode.save().then(() => res.json(newEpisode));      
  } else {
    // not using the Reference schema, YET. We won't know what the ID is until it is added to the actual database
    const newReference = {
      subject: subject,
      timestamp: timestamp,
      quote: quote,
      speaker: speaker,
      context: context,
      meaning: meaning
    }
    episode[0].references.push(newReference);

    episode[0].save().then(() => res.json(newReference));
  }
})

// add references to episode 
router.route('/references/add').post(async (req, res) => {
  const { seasonNumber, episodeNumber } = req.body;
  const episodeData = await Episode.findOneAndDelete({ 
    seasonNumber: seasonNumber, 
    episodeNumber: episodeNumber
  });

  if (!episodeData) res.status(404).json('Episode data does not exist...');

  const season = await Season.findOne({ season: seasonNumber });

  const oldReferencesArr = season.episodes.filter(item => Number(item.episodeNumber) == Number(episodeNumber))[0].references;
  const id = oldReferencesArr.length + 1;
  
  const { subject, timestamp, quote, speaker, context, meaning } = episodeData.references[0];
  const newReference = new Reference({
    id, subject, timestamp, quote, speaker, context, meaning
  });
  season.episodes[episodeNumber-1].references.push(newReference);

  episodeData.delete();
  season.markModified('episodes');
  season.save().then(() => res.status(201).json(newReference));
})

// add references to episode
router.route("/references/add").post(async (req, res) => {
  const { seasonNumber, episodeNumber, references } = req.body;
  const { subject, timestamp, quote, speaker, context, meaning } = references;

  if (!seasonNumber || !episodeNumber) {
    res.status(400).json("Please provide season number and episode number");
  } else {
    const season = await Season.findOne({ season: seasonNumber });
    const referencesArr = season.episodes.filter(
      (item) => Number(item.episodeNumber) == Number(episodeNumber)
    )[0].references;
    const id = referencesArr.length + 1;

    const newReference = new Reference({
      id,
      subject,
      timestamp,
      quote,
      speaker,
      context,
      meaning,
    });
    season.episodes[episodeNumber - 1].references.push(newReference);

    season.markModified("episodes");
    season.save().then(() => res.status(201).json(newReference));
  }
});

// dummy data for post on episode:
// {
//   "seasonNumber": "1",
//   "episodeNumber": "2",
//   "name": "The Lorelais' First Day at Chilton",
//   "references": []
// }

module.exports = router;

// add season (no longer needed)
// router.route('/add').post((req, res) => {
//   const { season, episodes } = req.body;
//   const newSeason = new Season({ season , episodes });

//   newSeason.save()
//     .then(() => res.status(200).json('Season added!'))
//     .catch(err => res.status(500).json('Error: ' + err))
// })
