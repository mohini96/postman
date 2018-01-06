var {con} = require('../mysql/mysqlDemo');
con.connect((err)=>{
    var sql="Delete from register where id=1";
    con.query(sql,(err,result)=>{
       if(err)
           throw err;
       console.log("recored deleted..!");
    });
})