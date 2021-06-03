var express = require('express');
var router = express.Router();

let batchModel = require('../models/batchModel');

// router.get('/getBatchDetails/',async function(req, res, next) {
//   try {
//     let batchDate = req.query.date;
//     console.log(req.query.authorization)
//     batchDate = new Date(batchDate);

//     let dayStartTime = await extractDate(batchDate, 0, 0, 0);
//     let dayEndTime = await extractDate(batchDate, 23, 59, 59);

//     if(dayStartTime.status ===200 && dayEndTime.status === 200){
//       dayStartTime = dayStartTime.result
//       dayEndTime = dayEndTime.result
//     } else {
//         res.send({status:500,result:null,message:"Server Error Happend"});
//     }

//     let batchDetailsResult = await batchModel.getBatchDetailsForDay(dayStartTime,dayEndTime);
//     // console.log(batchDetailsResult)
//     res.render("batchDetails",batchDetailsResult);

//     // res.send(batchDetailsResult);

//   } catch (exception) {
//     res.send({status:500,result:null,message:"Server Error Happend"});
//   }
// });


router.get('/v2/getBatchDetails/',async function(req, res, next) {
  try {
    let batchDate = req.query.date;
    batchDate = new Date(batchDate);

    //Extract Start time of day from date and endTime of Day from date
    let dayStartTime = await extractDate(batchDate, 0, 0, 0);
    let dayEndTime = await extractDate(batchDate, 23, 59, 59);

    if(dayStartTime.status ===200 && dayEndTime.status === 200){
      //If Extraction Successfull then store it in variable
      dayStartTime = dayStartTime.result
      dayEndTime = dayEndTime.result
    } else {
        res.send({status:500,result:null,message:"Server Error Happend"});
    }

    //Pass startTime and endTime to fetch Batch Details
    let batchDetailsResult = await batchModel.getBatchDetailsForDay(dayStartTime,dayEndTime);
    // console.log(batchDetailsResult)
    // res.render("batchDetails",batchDetailsResult);

    res.send(batchDetailsResult);

  } catch (exception) {
    res.send({status:500,result:null,message:"Server Error Happend"});
  }
});

//Method to Extract date based upon given condition, it will set hour, minute, second a/c to parameter
function extractDate(batchDate, hour, minute, second){
return new Promise(async function(resolve,reject){
  try {
    
    batchDate = new Date(batchDate).toUTCString();
    let dateString = new Date(batchDate);

    //Extract day,Moonth,Year from date parameter and make new date with provided parameters.
    let day = dateString.getUTCDate();
    let month = dateString.getUTCMonth();
    let year = dateString.getUTCFullYear();

    return resolve({status :200,result: new Date(Date.UTC(year, month, day, hour, minute, second))});
  } catch (exception) {
    return reject({status:500,result:null});
  }
});

}
module.exports = router;
