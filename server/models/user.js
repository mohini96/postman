var mongoose=require("mongoose");
//user
var User=mongoose.model('User',{
    email:{
        type:String,
        trim:true,
    }
});
// var user=new User({
//     email:"mohini.patel@gmail.com"
// });
// user.save().then((doc)=>{
//     console.log('Saved todo',doc);
// },(e)=>{
//     console.log('Unable to save todo',e);
// });
module.exports={User};