const { yearModel } = require('./../models/year.js');
const mongoose = require('mongoose');

class Year {
    constructor(year) {
        this.year = year;
    }

    save() {
        const yearModelInstance = new yearModel({
            year: this.year
        });
        yearModelInstance.save((error) => {
            console.log(`Error while saving year: ${error}`);
        })
    }

    static deleteById(yearId) {
        yearModel.findById(mongoose.Types.ObjectId(yearId)).remove((error) => {
            if(error) {
                console.log(`Error while removing year: ${error}`);
            }
        })
    }

    updateById(yearId) {
        yearModel.updateOne({ _id: mongoose.Types.ObjectId(yearId) }, {
            year: this.year
        }, (error, result) => {
            if(error) {
                console.log(`Error while updating year: ${error}`);
            } 

            if(result) {
                console.log(`Result: ${result}`);
            }
        });
    }

    loadById(yearId) {
        yearModel.findById({ _id: mongoose.Types.ObjectId(yearId) }, (error, year) => {
            if(error) {
                console.log(`Error while loading year: ${error}`);
            } else {
                this.year = year.year;
            }
        });
    }

    static async loadAll() {
        return await yearModel.find({});
    }
}

module.exports = {
    Year
}