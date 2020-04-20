const mongoose = require('mongoose');

const yearSchema = mongoose.Schema({
    year: {
        type: String,
        required: true
    }
});

const yearModel = mongoose.model('Year', yearSchema);

module.exports = {
    yearModel
};