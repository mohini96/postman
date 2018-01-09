
const express = require('express'),
    app = express();

var get = app.get('/',(req,res) => {
    res.send("Arjun")
});


var add = (a,b) => a+b

module.exports = {add,get}