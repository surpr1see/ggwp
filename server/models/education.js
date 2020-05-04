const mongoose = require('mongoose');

const educationSchema = mongoose.Schema({
    educationProgramTitle: {
        type: String,
        required: true
    },
    grade: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    totalAmountOfGraduates: {
        type: Number,
        required: true
    },
    amountOfGraduatesParticipated: {
        type: Number,
        required: true
    },

    amountOfEmployed: {
        type: Number,
        required: false
    },
    amountOfUnemployed: {
        type: Number,
        required: false
    },
    amountOfEmployedInScience: {
        type: Number,
        required: false
    },
    amountOfUnavailableToEmploy: {
        type: Number,
        required: false
    },

    amountOfStartedBusiness: {
        type: Number,
        required: false
    },
    amountOfUkraineAchievements: {
        type: Number,
        required: false
    },

    year: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const educationModel = mongoose.model('Education', educationSchema);

module.exports = {
    educationModel
};