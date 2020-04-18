const express = require('express');
const router = express.Router();

const { Student } = require('./../services/student.js');

router.get('/students', ( req, res ) => {

    const students = Student.loadAll();

    res.json({
        test: 'OK'
    });
});

router.post('/students/', ( req, res ) => {

    console.log(req.body);

    const newStudent = new Student(
        req.body.name,
        req.body.phone,
        req.body.socialProfile,
        req.body.position,
        req.body.companyTitle,
        req.body.region,
        req.body.activityField,
        req.body.isNotEmployed,
        req.body.isFullTime,
        req.body.isUnavailableToEmploy,
        req.body.isBusinessStarted,
        req.body.achievements
    );
    newStudent.save();

    res.json({
        status: 'Student was added'
    });
});

router.put('/students/:studentId', ( req, res ) => {

    console.log(req.body);

    const studentId = req.params.studentId;
    const updatedStudent = new Student(
        req.body.name,
        req.body.phone,
        req.body.socialProfile,
        req.body.position,
        req.body.companyTitle,
        req.body.region,
        req.body.activityField,
        req.body.isNotEmployed,
        req.body.isFullTime,
        req.body.isUnavailableToEmploy,
        req.body.isBusinessStarted,
        req.body.achievements
    );
    updatedStudent.updateById(studentId);

    res.json({
        status: 'Student was updated'
    });
});

router.delete('/students/:studentId', (req, res) => {
    const studentId = req.params.studentId;
    Student.deleteById(studentId);

    res.json({
        status: 'Student was deleted'
    });
}); 

module.exports = router;

