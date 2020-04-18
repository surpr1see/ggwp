const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    socialProfile: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: false
    },
    companyTitle: {
        type: String,
        required: false
    },
    region: {
        type: String,
        required: true
    },
    activityField: {
        type: String,
        required: false
    },
    isNotEmployed: {
        type: Boolean,
        required: true,
        default: false
    },
    isFullTime: {
        type: Boolean,
        required: true,
        default: false
    },
    isUnavailableToEmploy: {
        type: Boolean,
        required: true,
        default: false
    },
    isBusinessStarted: {
        type: Boolean,
        required: true,
        default: false
    },
    achievements: {
        type: String,
        required: false
    }
});

const studentModel = mongoose.model('Student', studentSchema);

module.exports = {
    studentModel
};