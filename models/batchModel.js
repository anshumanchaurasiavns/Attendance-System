const { v4 } = require('uuid');
const mongoose = require('mongoose');
const lodash = require('lodash');

const batchSchema = mongoose.Schema({
    id:{
        type: String,
        required:true,
        default:()=> v4()
    },
startDate:{
    type: Date,
    required:true
},
endDate:{
    type: Date,
    required:true
},
title:{
    type: String,
    required:true
},
description:{
    type: String,
    required:true
},
usersEnrolled:{
    type: Array,
    required:true
}
});

batchSchema.method.toJSON = function(){
    let userDetails = this;
    let userObject = userDetails.toObject();
    return lodash.pick(userObject, ['id','startDate','endDate','title','description','usersEnrolled']);
}

batchSchema.statics.getBatchDetailsForDay =function (dayStartTime, dayEndTime){
    batchModel = this;
    return new Promise(async (resolve,reject)=>{
        try {
            let batchDetailResult = await batchModel.aggregate([
                {
                  '$match': {
                    'startDate': {
                      '$gte': dayStartTime
                    }, 
                    'endDate': {
                      '$lte': dayEndTime
                    }
                  }
                }
              ]);

            if(batchDetailResult && batchDetailResult.length > 0)
                return resolve({status:200,result:batchDetailResult,message:"Batch Details For the Day fetched successfully."})
             else 
                return resolve({status:204,result:null,message:"No Batch For the Day"})
        } catch (exception) {
            return reject({status:500,result:null,message:"Server Error Happend"})
        }
    });

};

module.exports = mongoose.model('Batch',batchSchema);
