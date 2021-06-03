var express = require('express');
var router = express.Router();

let userModel = require('../models/userModel');


//Fetch User Details
router.get('/v1/getUserDetails/',async function(req, res, next) {
    try {
    let userId = req.query.userId;
      
      let batchDetailsResult = await userModel.getBatchDetailsForDay(userId);
      res.send(batchDetailsResult);
  
    } catch (exception) {
      res.send({status:500,result:null,message:"Server Error Happend"});
    }
  });


module.exports = router;
