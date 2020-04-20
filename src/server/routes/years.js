const express = require('express');
const router = express.Router();

const { Year } = require('./../services/year.js');

router.get('/years', async ( req, res ) => {

    const years = await Year.loadAll();

    res.json(years);
});

router.post('/years/', ( req, res ) => {

    console.log(req.body);

    const newYear = new Year(
        req.body.year,
    );
    newYear.save();

    res.json({
        status: 'year was added'
    });
});

router.put('/years/:yearId', ( req, res ) => {

    const yearId = req.params.yearId;
    const updatedYear = new Year(
        req.body.year
    );
    updatedYear.updateById(yearId);

    res.json({
        status: 'year was updated'
    });
});

router.delete('/years/:yearId', (req, res) => {
    const yearId = req.params.yearId;
    year.deleteById(yearId);

    res.json({
        status: 'Year was deleted'
    });
}); 

module.exports = router;

