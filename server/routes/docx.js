const express = require('express');
const router = express.Router();
const zip = require('express-zip');

const { Docx } = require('./../services/docx.js');

router.post('/docx', async ( req, res ) => {
    const docx = new Docx();

    await docx.createEducationsDocument(req.body.educationsToDoc);
    await docx.createStudentsDocument(req.body.studentsToDoc);

    res.json({
        status: 'OK'
    });
});

router.get('/download', async ( req, res ) => {

    const educationsFile = __dirname + '\\..\\public\\docs\\doc.docx';
    const studentsFile = __dirname + '\\..\\public\\docs\\doc2.docx';

    console.log("Download: " + educationsFile);

    res.zip([
        {
            path: studentsFile, name: 'students.docx'
        },
        {
            path: educationsFile, name: 'educations.docx'
        }
    ], 'docs.zip');
});

module.exports = router;