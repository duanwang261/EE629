const mongoCollections = require('../config/mongoCollections');
const schools = mongoCollections.schools;
var { ObjectId } = require('mongodb');


const exportedMethods = {
  async getAllSchools() {
    try {
      const schoolsCollection = await schools();
      const allschool = await schoolsCollection.find({}).toArray();
      if (!allschool) throw 'school not found';
      return allschool;
    } catch (e) {
      throw 'get all school failed'
    }
  },

  async getSchoolById(id) {
    const schoolsCollection = await schools();
    const school = await schoolsCollection.findOne({ _id: ObjectId(id) });
    if (!school) throw 'school not found';
    return school;
  },

  async addSchool(UNITID, schoolname, address, undergraduateStudentsCount,
                  graduateStudentsCount, totalStudentsCount, undergraduateGenderMaleFraction,
                  undergraduateGenderFemaleFraction, undergraduateRaceWhiteFraction,
                  undergraduateRaceNonWhiteFraction, undergraduateRaceAsianFraction,
                  undergraduateRaceBlackFraction, undergraduateRaceNonresidentAlienFraction,
                  undergraduateRaceHispanicFraction, undergraduateRaceOtherFraction,
                  admittedSAT25Percentile, admittedSAT50Percentile, admittedSAT75Percentile,
                  admittedACTCombined25Percentile, admittedACTCombined50Percentile,
                  admittedACTCombined75Percentile) {
    if (!UNITID) {
      throw 'Add school failed: UNITID';
    }
    if (!schoolname) {
      throw 'Add school failed: schoolname';
    }
    if (!address) {
      throw 'Add school failed: address';
    }
    if (!undergraduateStudentsCount) {
      throw 'Add school failed: undergraduateStudentsCount';
    }
    if (!graduateStudentsCount) {
      throw 'Add school failed: graduateStudentsCount';
    }
    if (!totalStudentsCount) {
      throw 'Add school failed: totalStudentsCount';
    }
    if (!undergraduateGenderMaleFraction) {
      throw 'Add school failed: undergraduateGenderMaleFraction';
    }
    if (!undergraduateGenderFemaleFraction) {
      throw 'Add school failed: undergraduateGenderFemaleFraction';
    }
    if (!undergraduateRaceWhiteFraction) {
      throw 'Add school failed: undergraduateRaceWhiteFraction';
    }
    if (!undergraduateRaceNonWhiteFraction) {
      throw 'Add school failed: undergraduateRaceNonWhiteFraction';
    }
    if (!undergraduateRaceAsianFraction) {
      throw 'Add school failed: undergraduateRaceAsianFraction';
    }
    if (!undergraduateRaceBlackFraction) {
      throw 'Add school failed: undergraduateRaceBlackFraction';
    }
    if (!undergraduateRaceNonresidentAlienFraction) {
      throw 'Add school failed: undergraduateRaceNonresidentAlienFraction';
    }
    if (!undergraduateRaceHispanicFraction) {
      throw 'Add school failed: undergraduateRaceHispanicFraction';
    }
    if (!undergraduateRaceOtherFraction) {
      throw 'Add school failed: undergraduateRaceOtherFraction';
    }
    if (!admittedSAT25Percentile) {
      throw 'Add school failed: admittedSAT25Percentile';
    }
    if (!admittedSAT50Percentile) {
      throw 'Add school failed: admittedSAT50Percentile';
    }
    if (!admittedSAT75Percentile) {
      throw 'Add school failed: admittedSAT75Percentile';
    }
    if (!admittedACTCombined25Percentile) {
      throw 'Add school failed: admittedACTCombined25Percentile';
    }
    if (!admittedACTCombined50Percentile) {
      throw 'Add school failed: admittedACTCombined50Percentile';
    }
    if (!admittedACTCombined75Percentile) {
      throw 'Add school failed: admittedACTCombined75Percentile';
    }

    const schoolsCollection = await schools();
    const newTempSchool = {
      UNITID: UNITID, 
      schoolname: schoolname, 
      address: address, 
      undergraduateStudentsCount: undergraduateStudentsCount,
      graduateStudentsCount: graduateStudentsCount, 
      totalStudentsCount: totalStudentsCount, 
      undergraduateGenderMaleFraction: undergraduateGenderMaleFraction,
      undergraduateGenderFemaleFraction: undergraduateGenderFemaleFraction, 
      undergraduateRaceWhiteFraction: undergraduateRaceWhiteFraction,
      undergraduateRaceNonWhiteFraction: undergraduateRaceNonWhiteFraction,
      undergraduateRaceAsianFraction: undergraduateRaceAsianFraction,
      undergraduateRaceBlackFraction: undergraduateRaceBlackFraction,
      undergraduateRaceNonresidentAlienFraction: undergraduateRaceNonresidentAlienFraction,
      undergraduateRaceHispanicFraction: undergraduateRaceHispanicFraction,
      undergraduateRaceOtherFraction: undergraduateRaceOtherFraction,
      admittedSAT25Percentile: admittedSAT25Percentile,
      admittedSAT50Percentile: admittedSAT50Percentile, 
      admittedSAT75Percentile: admittedSAT75Percentile,
      admittedACTCombined25Percentile: admittedACTCombined25Percentile,
      admittedACTCombined50Percentile: admittedACTCombined50Percentile,
      admittedACTCombined75Percentile: admittedACTCombined75Percentile
    }
    try {
      const newInsertInformation = await schoolsCollection.insertOne(newTempSchool);
      const newId = newInsertInformation.insertedId;
      
      return await this.getSchoolById(newId);
    } catch (e) {
      throw "add school failed";
    }
  },

    async getSchoolsbySearchTerm(searchTerm) {
      if (!searchTerm) throw 'No search term provided';

      const schoolsCollection = await schools();
      const query = { schoolname: { $regex: ".*" + searchTerm + ".*" }};
      const allSchools = await schoolsCollection.find(query).toArray();

      if (!allSchools) throw 'schools not found';

      return allSchools;
    }
  
  


 


  

}



module.exports = exportedMethods;