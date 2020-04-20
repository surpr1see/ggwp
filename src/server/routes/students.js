const express = require('express');
const router = express.Router();

const { Student } = require('./../services/student.js');

router.get('/students', async ( req, res ) => {

    const students = await Student.loadAll();
    res.json(students);
});

router.post('/students/', ( req, res ) => {

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
        req.body.achievements,
        req.body.education
    );
    newStudent.save();

    res.json({
        status: 'Student was added'
    });
});

router.put('/students/:studentId', ( req, res ) => {

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
        req.body.achievements,
        req.body.education
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

