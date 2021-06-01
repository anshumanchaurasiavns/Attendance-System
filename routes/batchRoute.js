var express = require('express');
var router = express.Router();

let batchModel = require('../models/batchModel');

router.get('/getBatchDetails/',async function(req, res, next) {
  try {
    let batchDate = req.query.date;

    batchDate = new Date(batchDate);

    let dayStartTime = batchDate;
    let dayEndTime = batchDate;
    let batchDetailsResult = await batchModel.getBatchDetailsForDay(dayStartTime,dayEndTime);
    res.send(batchDetailsResult);

  } catch (exception) {
    res.send({status:500,result:null,message:"Server Error Happend"});
  }
});

module.exports = router;
