var mongoose=require("mongoose");
var Todo=mongoose.model('todo',{
    text:{
        type:String
    },
    completed:{
        type:Boolean
    },
    completedAt:{
        type:Number
    }
});
// var newTodo=new Todo({
//     text:'cook dinner'
// });
// newTodo.save().then((doc)=>{
//     console.log('Saved todo',doc);
// },(e)=>{
//     console.log('Unable to save todo',e);
// });

var otherTodo=new Todo({
    text:'sleep',
    type:String,
    minlength:1,
    completed:true,
    completedAt:123
 });
// otherTodo.save().then((doc)=>{
//     console.log('Saved todo',doc);
// },(e)=>{
//     console.log('Unable to save todo',e);
// });
module.exports={Todo};