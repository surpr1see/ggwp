const express = require('express');
const router = express.Router();

const { Grade } = require('./../services/grade.js');

router.get('/grades', async ( req, res ) => {

    const grades = await Grade.loadAll();

    res.json(grades);
});

router.post('/grades/', ( req, res ) => {
    const newGrade = new Grade(
        req.body.grade,
    );
    newGrade.save();

    res.json({
        status: 'grade was added'
    });
});

router.put('/grades/:gradeId', ( req, res ) => {

    const gradeId = req.params.gradeId;
    const updatedGrade = new Grade(
        req.body.grade
    );
    updatedGrade.updateById(gradeId);

    res.json({
        status: 'grade was updated'
    });
});

router.delete('/grades/:gradeId', (req, res) => {
    const gradeId = req.params.gradeId;
    Grade.deleteById(gradeId);

    res.json({
        status: 'grade was deleted'
    });
}); 

module.exports = router;

