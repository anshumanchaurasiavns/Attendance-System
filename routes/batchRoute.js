var express = require('express');
var router = express.Router();

let batchModel = require('../models/batchModel');

router.get('/getBatchDetails/',async function(req, res, next) {
  try {
    let batchDate = req.query.date;

    batchDate = new Date(batchDate);

    let dayStartTime = await extractDate(batchDate, 0, 0, 0);
    let dayEndTime = await extractDate(batchDate, 23, 59, 59);

    if(dayStartTime.status ===200 && dayEndTime.status === 200){
      dayStartTime = dayStartTime.result
      dayEndTime = dayEndTime.result
    } else {
        res.send({status:500,result:null,message:"Server Error Happend"});
    }

    let batchDetailsResult = await batchModel.getBatchDetailsForDay(dayStartTime,dayEndTime);
    
    res.send(batchDetailsResult);

  } catch (exception) {
    res.send({status:500,result:null,message:"Server Error Happend"});
  }
});


function extractDate(batchDate, hour, minute, second){
return new Promise(async function(resolve,reject){
  try {
    
    batchDate = new Date(batchDate).toUTCString();
    let dateString = new Date(batchDate);

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
