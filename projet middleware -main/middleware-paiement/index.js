const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); 

const app = express();

app.use(cors());

const paiementController = require('./Controllers/paiementController');
const authenticationController = require('./Controllers/authenticationController');

const PORT = process.env.PORT || 5002;

const mongoURI = `mongodb://${process.env.MONGO_SERVICE}:27017/${process.env.MONGO_DB}`|| "mongodb://mcommerce-mongodb-service:27017/mcommerce";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

app.use(bodyParser.json());
app.use('/', paiementController);
app.use('/', authenticationController);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});