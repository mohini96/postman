var mongoose=require("mongoose");
var db=require("./mongoose");


var UserDetail = new mongoose.Schema({
    email:String,
    username: String,
    password: String
});
//const user = mongoose.model('users', UserDetail);
const user = mongoose.model('users', UserDetail);

//user.find().then((res)=>{console.log(res)});
module.exports={user}

