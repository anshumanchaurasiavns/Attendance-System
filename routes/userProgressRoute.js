var express = require('express');
var router = express.Router();
let userProgressModel = require('../models/userProgressModel');

router.post('/markAttendance/',async function(req, res, next) {
  try {
    let userId = req.body.userId;
    let batchId = req.body.batchId;
    let attended = req.body.attended;
    let comment = req.body.comment;
    let rating = req.body.rating;
    let timeAttendant = new Date();

    let batchDetailsResult = await userProgressModel.markChildrenAttendance(userId,batchId,attended ,comment ,rating ,timeAttendant );
    res.send(batchDetailsResult);
  } catch (exception) {
    console.log(exception)

    res.send({status:500,result:null,message:"Server Error Happend"});
  }
});

module.exports = router;
