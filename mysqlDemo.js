var mysql = require('mysql');

var con = mysql.createConnection({
    host: "sql12.freemysqlhosting.net",
    user: "sql12214312",
    password: "W9YxZTXXKt",
    database: "sql12214312",
    port:3306
    //port:3307
});
module.exports={con};
