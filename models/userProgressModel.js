const { v4 } = require('uuid');
const mongoose = require('mongoose');
const lodash = require('lodash');

const userProgressSchema = mongoose.Schema({
    id:{
        type: String,
        required:true,
        default:()=> v4()
    },
    userId:{
    type: String,
    required:true
},
batchId:{
    type: String,
    required:true
},
timeAttendant:{
    type: Date,
    required:true
},
attended:{
    type: Boolean,
    required:true
},
comment:{
    type: String,
    required:true
},
rating:[{
    id:{
        type: String,
        required:true,
        default:()=> v4()
    },
    question:{
        type: String,
        required:true
    },
    answer:{
        type: Number,
        required:true
    },
}]
});

userProgressSchema.method.toJSON = function(){
    let userDetails = this;
    let userObject = userDetails.toObject();
    return lodash.pick(userObject, ['id','userId','batchId','timeAttendant','attended','comment','rating']);
}


//method to Store Feedback of user into mongodb
userProgressSchema.statics.markChildrenAttendance =function (userId,batchId,attended ,comment ,rating ,timeAttendant){
    let userProgressModel = this;
    return new Promise(async (resolve,reject)=>{
        try {
            let batchObject = new userProgressModel({
                userId:userId,
                batchId: batchId,
                timeAttendant: timeAttendant,
                attended: attended,
                comment: comment,
                rating: rating
            });
            let batchDetailResult = await batchObject.save();

            if(batchDetailResult)
                return resolve({status:200,result:batchDetailResult,message:"Attendance of a Children Marked Successfully."})
             else 
                return resolve({status:204,result:null,message:"Error Happend While Marking Attendance."})
        } catch (exception) {
            console.log(exception)
            return reject({status:500,result:null,message:"Server Error Happend"})
        }
    });
};


module.exports = mongoose.model('UserProgress',userProgressSchema);
