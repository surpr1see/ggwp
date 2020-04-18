/* Basic server app initialization */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

/* Loading server launch config */
const config = require('./config/config.js');

/* Initializing Database */
const mongoose = require('mongoose');
mongoose.connect(config.databaseConnectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

const db = mongoose.connection;

/* Adding routes */
const studentRouter = require('./routes/students.js');
app.use(studentRouter);

db.on('error', () => {
    console.error.bind(console, 'MongoDB connection error: ');
})

app.listen(process.env.PORT || config.port, () => {
    console.log(`Server started on port ${config.port}`);
});

