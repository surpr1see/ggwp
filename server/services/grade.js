const { gradeModel } = require('./../models/grade.js');
const mongoose = require('mongoose');

class Grade {
    constructor(grade) {
        this.grade = grade;
    }

    save() {
        const gradeModelInstance = new gradeModel({
            grade: this.grade
        });
        gradeModelInstance.save((error) => {
            console.log(`Error while saving grade: ${error}`);
        })
    }

    static deleteById(gradeId) {
        gradeModel.findById(mongoose.Types.ObjectId(gradeId)).remove((error) => {
            if(error) {
                console.log(`Error while removing grade: ${error}`);
            }
        })
    }

    updateById(gradeId) {
        gradeModel.updateOne({ _id: mongoose.Types.ObjectId(gradeId) }, {
            grade: this.grade
        }, (error, result) => {
            if(error) {
                console.log(`Error while updating grade: ${error}`);
            } 

            if(result) {
                console.log(`Result: ${result}`);
            }
        });
    }

    loadById(gradeId) {
        gradeModel.findById({ _id: mongoose.Types.ObjectId(gradeId) }, (error, grade) => {
            if(error) {
                console.log(`Error while loading grade: ${error}`);
            } else {
                this.grade = grade.grade;
            }
        });
    }

    static async loadAll() {
        return await gradeModel.find({});
    }
}

module.exports = {
    Grade
}