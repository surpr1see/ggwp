const { educationModel } = require('./../models/education.js');
const { yearModel } = require('./../models/year.js');
const { gradeModel } = require('./../models/grade.js');
const mongoose = require('mongoose');

class Education {
    constructor(educationProgramTitle, grade, totalAmountOfGraduates, amountOfGraduatesParticipated, 
        amountOfEmployed, amountOfUnemployed, amountOfEmployedInScience, amountOfUnavailableToEmploy, amountOfStartedBusiness,
        amountOfUkraineAchievements, year) {

        this.educationProgramTitle = educationProgramTitle;
        this.grade = grade;
        this.totalAmountOfGraduates = totalAmountOfGraduates;
        this.amountOfGraduatesParticipated = amountOfGraduatesParticipated;
        this.amountOfEmployed = amountOfEmployed;
        this.amountOfUnemployed = amountOfUnemployed;
        this.amountOfEmployedInScience = amountOfEmployedInScience;
        this.amountOfUnavailableToEmploy = amountOfUnavailableToEmploy;
        this.amountOfStartedBusiness = amountOfStartedBusiness;
        this.amountOfUkraineAchievements = amountOfUkraineAchievements;
        this.year = year;

    }

    save() {
        const educationModelInstance = new educationModel({
            educationProgramTitle: this.educationProgramTitle,
            grade: this.grade,
            totalAmountOfGraduates: this.totalAmountOfGraduates,
            amountOfGraduatesParticipated: this.amountOfGraduatesParticipated,
            amountOfEmployed: this.amountOfEmployed,
            amountOfUnemployed: this.amountOfUnemployed,
            amountOfEmployedInScience: this.amountOfEmployedInScience,
            amountOfUnavailableToEmploy: this.amountOfUnavailableToEmploy,
            amountOfStartedBusiness: this.amountOfStartedBusiness,
            amountOfUkraineAchievements: this.amountOfUkraineAchievements,
            year: this.year
        });
        educationModelInstance.save((error) => {
            console.log(`Error while saving education: ${error}`);
        })
    }

    static deleteById(educationId) {
        educationModel.findById(mongoose.Types.ObjectId(educationId)).remove((error) => {
            if(error) {
                console.log(`Error while removing education: ${error}`);
            }
        })
    }

    updateById(educationId) {
        educationModel.updateOne({ _id: mongoose.Types.ObjectId(educationId) }, {
            educationProgramTitle: this.educationProgramTitle,
            grade: this.grade,
            totalAmountOfGraduates: this.totalAmountOfGraduates,
            amountOfGraduatesParticipated: this.amountOfGraduatesParticipated,
            amountOfEmployed: this.amountOfEmployed,
            amountOfUnemployed: this.amountOfUnemployed,
            amountOfEmployedInScience: this.amountOfEmployedInScience,
            amountOfUnavailableToEmploy: this.amountOfUnavailableToEmploy,
            amountOfStartedBusiness: this.amountOfStartedBusiness,
            amountOfUkraineAchievements: this.amountOfUkraineAchievements,
            year: this.year
        }, (error, result) => {
            if(error) {
                console.log(`Error while updating education: ${error}`);
            } 

            if(result) {
                console.log(`Result: ${result}`);
            }
        });
    }

    loadById(educationId) {
        educationModel.findById({ _id: mongoose.Types.ObjectId(educationId) }, (error, education) => {
            if(error) {
                console.log(`Error while loading education: ${error}`);
            } else {
                this.educationProgramTitle = education.educationProgramTitle;
                this.grade = education.grade;
                this.totalAmountOfGraduates = education.totalAmountOfGraduates;
                this.amountOfGraduatesParticipated = education.amountOfGraduatesParticipated;
                this.amountOfEmployed = education.amountOfEmployed;
                this.amountOfUnemployed = education.amountOfUnemployed;
                this.amountOfEmployedInScience = education.amountOfEmployedInScience;
                this.amountOfUnavailableToEmploy = education.amountOfUnavailableToEmploy;
                this.amountOfStartedBusiness = education.amountOfStartedBusiness;
                this.amountOfUkraineAchievements = education.amountOfUkraineAchievements;
                this.year = education.year;
            }
        });
    }

    static async loadAll() {
        const educations = await educationModel.find({});

        for(let i = 0; i < educations.length; i++) {
            const grade = await gradeModel.findById(educations[i].grade);
            const year = await yearModel.findById(educations[i].year);

            const mutableEducation = JSON.parse(JSON.stringify(educations[i]));
            mutableEducation.gradeValue = grade.grade;
            mutableEducation.yearValue = year.year;

            educations[i] = mutableEducation;
        }

        return educations;
    }
}

module.exports = {
    Education
}