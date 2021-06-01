var express = require('express');
var router = express.Router();

router.post('/markAttendance/',async function(req, res, next) {
  try {
    let userId = req.body.userId;
    let batchId = req.body.batchId;
    let attended = req.body.attended;
    let comment = req.body.comment;
    let rating = req.body.rating;
    let timeAttendant = new Date();

    let batchDetailsResult = await batchModel.markChildrenAttendance(userId,batchId,attended ,comment ,rating ,timeAttendant );
    res.send(batchDetailsResult);
    // if(batchDetailsResult.status === 200)
    //   res.send({status:200,result:batchDetailsResult.result,message:"Server Error Happend"});
    // else
    //   res.send({status:500,result:null,message:"No Batch For the Day"});

  } catch (exception) {
    res.send({status:500,result:null,message:"Server Error Happend"});
  }
});

module.exports = router;