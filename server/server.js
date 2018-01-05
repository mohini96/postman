const _=require('lodash');
const express=require('express');
var {mongoose}=require('./db/mongoose');
var bodyParser=require('body-parser');
var {Todo}=require('./models/todo');
var {User}=require('./models/user');
const {ObjectID}=require('mongodb');
var app=express();
const port=process.env.POST || 3000;
app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    console.log('response: ');
   console.log(req.body);
    var todo=new Todo({
        text:req.body.text

    });
    todo.save().then((doc)=>{
        res.send(doc);
        console.log('response: 1');
    },(e)=>{
        res.status(400).send(e);
        console.log('response: 3');
    });
});
//get all
app.get('/todos',(req,res)=>{
   Todo.find().then((f)=>{
       res.send({f});
    });
},(e)=>{
    res.status(400).send(e);
});
//port
app.listen(3000,()=>{
   console.log(`started`);
});

//get by Id
app.get('/todos/:id',(req,res)=>{
    var id=req.params.id;
    Todo.findById(id).then((f)=>{
        res.send({f});
    });
},(e)=>{
    res.status(400).send(e);
});


//delete

app.delete('/todos/:id',(req,res)=> {
    var id = req.params.id;
    console.log(id);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send(todo);

    }).catch((e) => {
        res.status(404).send(e);
    });
});

//update
app.patch('/todos/:id',(req,res)=> {
    var id = req.params.id;
    console.log(id);
    var body = _.pick(req.body, ['text', 'completed']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    console.log(body);
    if (_.isBoolean(body.completed) && body.completedAt) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(404).send(e);
    })
});

