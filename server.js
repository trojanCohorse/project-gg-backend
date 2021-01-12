const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
require('dotenv').config();

// Creating express application
const app = express();

// Heroku will generate a env variable called process.env.port for our server to be hosted on
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://ggadmin:thisIsOurConnectionStringPass30@gilmorecluster.49pdi.mongodb.net/GGData?retryWrites=true&w=majority';
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




// PSEUDO

/* 
1. We want to hit the references array within a certain season and episode. () (UPDATE)
2. We want to remove specific references in the array. (UPDATE)
3. We want to delete an entire episode from the approve endpoint. (DONE) (DELETE)


UPDATE LOGIC

1. Upon creating a new reference in the new reference form, a update request will be made to create/update the db
2. When an admin is on approveRef then, the admin can press a delete button which updates one or more of the values inside the references array to null.





*/























