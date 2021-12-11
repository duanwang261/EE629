const mongoCollections = require('../config/mongoCollections');
const schools = mongoCollections.schools;



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

 


  

}



module.exports = exportedMethods;