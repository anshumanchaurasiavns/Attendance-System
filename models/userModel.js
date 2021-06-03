const { v4 } = require('uuid');
const mongoose = require('mongoose');
const lodash = require('lodash');
const userSchema = mongoose.Schema({
    id:{
        type: String,
        required:true,
        default:()=> v4()
    },
firstName:{
    type: String,
    required:true
},
lastName:{
    type: String,
    required:true
},
tokens:{
    type: Array,
    required:true
}
});

userSchema.method.toJSON = function(){
    let userDetails = this;
    let userObject = userDetails.toObject();
    return lodash.pick(userObject, ['id','firstName','lastName','tokens']);
}

userSchema.statics.getBatchDetailsForDay =function (userId){
    userModel = this;
    return new Promise(async (resolve,reject)=>{
        try {
            let userDetailResult = await userModel.findOne({'id': userId});

            if(userDetailResult )
                return resolve({status:200,result:userDetailResult,message:"Batch Details For the Day fetched successfully."})
             else 
                return resolve({status:204,result:null,message:"No Batch For the Day"})
        } catch (exception) {
            return reject({status:500,result:null,message:"Server Error Happend"})
        }
    });
};

module.exports = mongoose.model('User',userSchema);