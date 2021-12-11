const express = require('express');
const router = express.Router();
const data = require('../data');
const schoolsData = data.schools;

// schoolsData.addSchool('111111')

router.get('/', async (req, res) => {
    try {
      let schoolList = await schoolsData.getAllSchools();
      res.json(schoolList);
    } catch (e) {
      res.sendStatus(500);
    }
});


module.exports = router;
