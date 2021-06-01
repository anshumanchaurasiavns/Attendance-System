const { v4 } = require('uuid');
const mongoose = require('mongoose');
const lodash = require('lodash');
const userSchema = mongoose.Schema({
    id:{
        type: String,
        required:true,
        default:()=> V4()
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



module.export = mongoose.model('User',userSchema);