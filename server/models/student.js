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
    secondSocialProfile: {
        type: String,
        required: false
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
        required: true
    },
    isFullTime: {
        type: Boolean,
        required: true
    },
    isUnavailableToEmploy: {
        type: Boolean,
        required: true
    },
    isBusinessStarted: {
        type: Boolean,
        required: true
    },
    achievements: {
        type: String,
        required: false
    },
    informationSource: {
        type: String,
        required: false
    },

    education: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const studentModel = mongoose.model('Student', studentSchema);

module.exports = {
    studentModel
};