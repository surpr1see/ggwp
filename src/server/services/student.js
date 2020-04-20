const { studentModel } = require('./../models/student.js');
const { educationModel } = require('./../models/education.js');
const mongoose = require('mongoose');

class Student {
    constructor(name, phone, socialProfile, position, 
        companyTitle, region, activityField, isNotEmployed, isFullTime,
        isUnavailableToEmploy, isBusinessStarted, achievements, education) {

        this.name = name;
        this.phone = phone;
        this.socialProfile = socialProfile;
        this.position = position;
        this.companyTitle = companyTitle;
        this.region = region;
        this.activityField = activityField;
        this.isNotEmployed = isNotEmployed;
        this.isFullTime = isFullTime;
        this.isUnavailableToEmploy = isUnavailableToEmploy;
        this.isBusinessStarted = isBusinessStarted;
        this.achievements = achievements;
        this.education = education;

    }

    async save() {
        const studentModelInstance = new studentModel({
            name: this.name,
            phone: this.phone,
            socialProfile: this.socialProfile,
            position: this.position,
            companyTitle: this.companyTitle,
            region: this.region,
            activityField: this.activityField,
            isNotEmployed: this.isNotEmployed,
            isFullTime: this.isFullTime,
            isUnavailableToEmploy: this.isUnavailableToEmploy,
            isBusinessStarted: this.isBusinessStarted,
            achievements: this.achievements,
            education: this.education
        });
        await studentModelInstance.save((error) => {
            console.log(`Error while saving student: ${error}`);
        });
    }

    static async deleteById(studentId) {
        await studentModel.findById(mongoose.Types.ObjectId(studentId)).remove((error) => {
            if(error) {
                console.log(`Error while removing student: ${error}`);
            }
        })
    }

    async updateById(studentId) {
        await studentModel.updateOne({ _id: mongoose.Types.ObjectId(studentId) }, {
            name: this.name,
            phone: this.phone,
            socialProfile: this.socialProfile,
            position: this.position,
            companyTitle: this.companyTitle,
            region: this.region,
            activityField: this.activityField,
            isNotEmployed: this.isNotEmployed,
            isFullTime: this.isFullTime,
            isUnavailableToEmploy: this.isUnavailableToEmploy,
            isBusinessStarted: this.isBusinessStarted,
            achievements: this.achievements,
            education: this.education
        }, (error, result) => {
            if(error) {
                console.log(`Error while updating student: ${error}`);
            } 

            if(result) {
                console.log(`Result: ${result}`);
            }
        });
    }

    loadById(studentId) {
        studentModel.findById(mongoose.Types.ObjectId(studentId), (error, student) => {
            if(error) {
                console.log(`Error while loading student: ${error}`);
            } else {
                this.name = student.name;
                this.phone = student.phone;
                this.socialProfile = student.socialProfile;
                this.position = student.position;
                this.companyTitle = student.companyTitle;
                this.region = student.region;
                this.activityField = student.activityField;
                this.isNotEmployed = student.isNotEmployed;
                this.isFullTime = student.isFullTime;
                this.isUnavailableToEmploy = student.isUnavailableToEmploy;
                this.isBusinessStarted = student.isBusinessStarted;
                this.achievements = student.achievements;
                this.education = education;
            }
        });
    }

    static async loadAll() {
        let students = await studentModel.find({});
        console.log("Before: " + students);

        for(let i = 0; i < students.length; i++) {
            const education = await educationModel.findById(students[i].education);
            const mutableStudent = JSON.parse(JSON.stringify(students[i]));
            mutableStudent.educationTitle = education.educationProgramTitle;
            students[i] = mutableStudent;
        }

        console.log("After: " + students);
        return students;
    }
}

module.exports = {
    Student
}