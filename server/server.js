var express=require('express');
var {mongoose}=require('./db/mongoose');
var bodyParser=require('body-parser');
var {Todo}=require('./models/todo');
var {User}=require('./models/user');
var app=express();
app.use(bodyParser.json());
app.post('/todos',(req,res)=>{
    console.log('response: ');
   // console.log(req.body);
    var todo=new Todo({
        text:req.body.text
    });
    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    });
});
app.get('/todos',(req,res)=>{
   Todo.find().then((f)=>{
       res.send({f});
    });
},(e)=>{
    res.status(400).send(e);
});
app.listen(3000,()=>{
   console.log("started");
});