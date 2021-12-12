const dbConnection = require('./config/mongoConnection');
const data = require('./data');
const fs = require('fs'); 
const csv = require('csv-parser');
const schools = data.schools;

async function main() {

    const db = await dbConnection();
    await db.dropDatabase();

    let path = './data-scrape/schools.csv';
    fs.createReadStream(path)
    .pipe(csv())
    .on('data', function(data){
        try {
            console.log("UNITID: " + data.UNITID);
            schools.addSchool(data.UNITID, 
                            data.schoolname, 
                            data.address, 
                            data.undergraduateStudentsCount,
                            data.graduateStudentsCount, 
                            data.totalStudentsCount, 
                            data.undergraduateGenderMaleFraction,
                            data.undergraduateGenderFemaleFraction, 
                            data.undergraduateRaceWhiteFraction,
                            data.undergraduateRaceNonWhiteFraction, 
                            data.undergraduateRaceAsianFraction,
                            data.undergraduateRaceBlackFraction, 
                            data.undergraduateRaceNonresidentAlienFraction,
                            data.undergraduateRaceHispanicFraction, 
                            data.undergraduateRaceOtherFraction,
                            data.admittedSAT25Percentile, 
                            data.admittedSAT50Percentile, 
                            data.admittedSAT75Percentile,
                            data.admittedACTCombined25Percentile, 
                            data.admittedACTCombined50Percentile,
                            data.admittedACTCombined75Percentile);
            //perform the operation
        }
        catch(err) {
      }
    })
    .on('end',function(){
        console.log('finished');
    }); 
    

}


main();