var {con} = require('../mysql/mysqlDemo');
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO register(id,name,email,password) VALUES (2,'mohini', 'mohini.patel@gmail.com','mohini123')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});