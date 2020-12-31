const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// Creating express application
const app = express();
// Heroku will generate a env variable called process.env.port for our server to be hosted on
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established");
});

const router = require('./routes');

app.use('/seasons', router);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});























