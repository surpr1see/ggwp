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
const educationRouter = require('./routes/educations.js');
const yearRouter = require('./routes/years.js');
const gradeRouter = require('./routes/grades.js');
const docxRouter = require('./routes/docx.js');

app.use('/api', studentRouter);
app.use('/api', educationRouter);
app.use('/api', yearRouter);
app.use('/api', gradeRouter);
app.use('/api', docxRouter);

if(true) {
    app.use(express.static(__dirname + '/public'));
    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname + '/public/index.html');
    })
}

db.on('error', () => {
    console.error.bind(console, 'MongoDB connection error: ');
})

app.listen(process.env.PORT || config.port, () => {
    console.log(`Server started on port ${config.port}`);
});

