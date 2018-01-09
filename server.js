const _=require('lodash');
const express=require('express');
let lodash=require('lodash');
var {mongoose}=require('./db/mongoose');
var bodyParser=require('body-parser');
var {Todo}=require('./models/todo');
const {User}=require('../server/models/user');
var {authenticate}=require('./midleware/midleware');
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
   console.log(`started on port 3000`);
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

//find all data
app.get('/find',(req,res) => {
    Todo.find({},{_id:false,text:true}).then((response) =>{
        res.send(response)
        res.send(error)
    })
})

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
//USER.........................

//post User
app.post('/users',(req,res)=>{
    var body=_.pick(req.body,['email','password']);
    var user=new User(body);
    // console.log(req.body.email);
    // user.save().then((user)=>{
    //     res.send(user);
    // }).catch((e)=>{
    //     res.status(400).send(e);
    // });
    user.save().then(()=>{
        return user.generateAuthToken();
    }).then((token)=>{
        // res.send(token);
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
        res.status(404).send(e);
    })
});
//get User
// app.get('/users/me',(req,res)=>{
//     var token=req.header("x-auth");
//      User.findByToken(token).then((user)=>{
//          if(!user){
//             return Promise.reject();
//         }
//         res.send(user);
//     }).catch((e) => {
//         res.status(401).send(e)
//      })
// });

app.get('/users/me',authenticate,(req,res)=>{
    res.send(req.user)
});

//POST /user/login {email.password}
app.post('/users/login',(req,res)=>{
    var body=_.pick(req.body,['email','password']);
    User.findByCredential(body.email,body.password).then((user)=>{
        // console.log("Console : " ,user)
        res.send(user);
    }).catch((e)=>{
        res.status(400).send();
    })
    // res.send(body);
})

//logout
app.delete('user/me/token',authenticate,(req,res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    },()=>{
        res.status(200).send();
    })
})