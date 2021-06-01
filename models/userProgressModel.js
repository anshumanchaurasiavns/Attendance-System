const { V4 } = require('uuid');
const mongoose = require('mongoose');
const lodash = require('lodash');

const userProgressSchema = mongoose.Schema({
    id:{
        type: String,
        required:true,
        default:()=> V4()
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
        default:()=> V4()
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



module.exports = mongoose.model('UserProgress',userProgressSchema);
