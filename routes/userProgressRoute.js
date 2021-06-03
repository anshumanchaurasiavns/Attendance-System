var express = require('express');
var router = express.Router();
let userProgressModel = require('../models/userProgressModel');

router.post('/markAttendance/',async function(req, res, next) {
  try {
    let body  =JSON.stringify(req.body );
    body  =JSON.parse(body);
    body  =JSON.parse(body.data );
    
   
    req.body = body;
    let userId = req.body.userId;
    let batchId = req.body.batchId;
    let attended = req.body.attended;
    let comment = req.body.comment;
    let rating = req.body.rating;
    let timeAttendant = new Date();

    //Method to store Feedback into the db.
    let batchDetailsResult = await userProgressModel.markChildrenAttendance(userId,batchId,attended ,comment ,rating ,timeAttendant );
    res.send(batchDetailsResult);
  } catch (exception) {
    console.log(exception)

    res.send({status:500,result:null,message:"Server Error Happend"});
  }
});

router.post('/v2/markAttendance/',async function(req, res, next) {
  try {
    
    let userId = req.body.userId;
    let batchId = req.body.batchId;
    let attended = req.body.attended;
    let comment = req.body.comment;
    let rating = req.body.rating;
    let timeAttendant = new Date();

    //Method to store Feedback into the db.
    let batchDetailsResult = await userProgressModel.markChildrenAttendance(userId,batchId,attended ,comment ,rating ,timeAttendant );
    res.send(batchDetailsResult);
  } catch (exception) {
    console.log(exception)

    res.send({status:500,result:null,message:"Server Error Happend"});
  }
});

// router.get('/',async function(req, res, next) {

//   let batchId = req.query.batchId;
//   let usersEnrolled = req.query.usersEnrolled;
//   usersEnrolled = usersEnrolled.split(',');
//   // console.log(batchId, typeof(usersEnrolled) )
//   res.render("markAttendance",{ batchId:batchId, usersEnrolled:usersEnrolled });

// });
module.exports = router;
