const express = require('express');
const router = express.Router();

const { Education } = require('./../services/education.js');

router.get('/educations', async ( req, res ) => {

    const educations = await Education.loadAll();

    console.log(educations);

    res.json(educations);
});

router.post('/educations/', ( req, res ) => {

    console.log(req.body);

    const newEducation = new Education(
        req.body.educationProgramTitle,
        req.body.grade,
        req.body.totalAmountOfGraduates,
        req.body.amountOfGraduatesParticipated,
        req.body.amountOfEmployed,
        req.body.amountOfUnemployed,
        req.body.amountOfEmployedInScience,
        req.body.amountOfUnavailableToEmploy,
        req.body.amountOfStartedBusiness,
        req.body.amountOfUkraineAchievements,
        req.body.year
    );
    newEducation.save();

    res.json({
        status: 'Education was added'
    });
});

router.put('/educations/:educationId', ( req, res ) => {

    console.log(req.body);

    const educationId = req.params.educationId;
    const updatedEducation = new Education(
        req.body.educationProgramTitle,
        req.body.grade,
        req.body.totalAmountOfGraduates,
        req.body.amountOfGraduatesParticipated,
        req.body.amountOfEmployed,
        req.body.amountOfUnemployed,
        req.body.amountOfEmployedInScience,
        req.body.amountOfUnavailableToEmploy,
        req.body.amountOfStartedBusiness,
        req.body.amountOfUkraineAchievements,
        req.body.year
    );
    updatedEducation.updateById(educationId);

    res.json({
        status: 'Education was updated'
    });
});

router.delete('/educations/:educationId', (req, res) => {
    const educationId = req.params.educationId;
    Student.deleteById(educationId);

    res.json({
        status: 'Education was deleted'
    });
}); 

module.exports = router;

