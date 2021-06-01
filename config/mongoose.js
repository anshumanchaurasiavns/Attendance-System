
const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true );
mongoose.set('useUnifiedTopology', true );

mongoose.connect('mongodb://localhost:27017/stones2milestones?readPreference=primary');

mongoose.connection.on('connected',(res)=>{
    console.log("Db Connected...");
});

mongoose.connection.on('error',(res)=>{
    console.log("Error occured while Db Connection...");
});

module.exports = {
    mongoose
};