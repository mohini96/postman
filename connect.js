var express=require("express");
var http=require("http").Server(app);
var mysql = require('mysql');
var app=express();
var bodyParser=require('body-parser');

var con = mysql.createConnection({
    host: "sql12.freemysqlhosting.net",
    user: "sql12214312",
    password: "W9YxZTXXKt",
    database: "sql12214312",
    port:3306
    //port:3307
});
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
let data;
app.get('/user',(req,res)=>{

    con.connect((err)=>{
        sql="select * from register LIMIT 5";
        con.query(sql,(err,result)=>{
            if(err)
                throw err;
            console.log(JSON.stringify(result));
    res.send(JSON.stringify(result));
        });
    })

});
app.post('/user',(req,res)=>{
    let id=req.body.id;
    let name=req.body.name;
    let email=req.body.email;
    let password=req.body.password;
    console.log(id);


    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO register(id,name,email,password) VALUES ("+id+",'"+name+"','"+email+"','"+password+"')";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            res.send("insered..")
        });
    });
});
//delete
app.delete('/user/:id',(req,res)=>{
    let id=req.params.id;
    con.connect((err)=>{
        var sql="Delete from register where id="+id;
        con.query(sql,(err,result)=>{
            if(err)
                throw err;
            console.log("recored deleted..!");
            res.send("deleted");
        });
    })
})


//update
app.put('/user/:id',(req,res)=>{
    let id=req.params.id;
    let id1=req.body.id;
    let name=req.body.name;
    let email=req.body.email;
    let password=req.body.password;
    con.connect((err)=>{

        sql="update register set id="+id1+", name='"+name+"',email='"+email+"',password='"+password+"' where id="+id;
        con.query(sql,(err,result)=>{
            if(err)
                throw err;
            console.log("recored updated..");
            res.send("updated");
        });
    });

})
//port
app.listen(3000,()=>{
    console.log(`started`);
});
