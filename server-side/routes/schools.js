const express = require('express');
const router = express.Router();
const data = require('../data');
const schoolsData = data.schools;

//  schoolsData.addSchool('111111')

router.get('/schools', async (req, res) => {
    try {
      let schoolList = await schoolsData.getAllSchools();
      res.json(schoolList);
    } catch (e) {
      res.sendStatus(500).json({ error: e });
    }
});

router.get('/search/:searchTerm', async (req, res) => {
  try {
    let schoolList = await schoolsData.getSchoolsbySearchTerm(req.params.searchTerm);
    res.json(schoolList);
  } catch (e) {
    res.sendStatus(500).json({ error: e });
  }
});

router.get('/schooldetail/:id', async (req, res) => {
  try {
    const school = await schoolsData.getSchoolById(req.params.id);
    res.json(school);
  } catch (e) {
    res.status(404).json({ error: 'Post not found' });
  }
});






module.exports = router;
