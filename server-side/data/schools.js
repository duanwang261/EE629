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

  async addSchool(schoolname) {
    if (!schoolname) {
      throw 'Add school failed';
    }
    const schoolsCollection = await schools();
    const newTempSchool = {
      schoolname: schoolname,
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