const mongoose = require('mongoose');

const gradeSchema = mongoose.Schema({
    grade: {
        type: String,
        required: true
    }
});

const gradeModel = mongoose.model('Grade', gradeSchema);

module.exports = {
    gradeModel
};