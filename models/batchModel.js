const { v4 } = require('uuid');
const mongoose = require('mongoose');
const lodash = require('lodash');

const batchSchema = mongoose.Schema({
    id:{
        type: String,
        required:true,
        default:()=> V4()
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
    return lodash.pick(userObject, ['id','startDate','endDate','title','description']);
}