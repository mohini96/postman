var {con}=require("../mysql/mysqlDemo");
con.connect((err)=>{
    sql="select * from register LIMIT 5";
    con.query(sql,(err,result)=>{
       if(err)
           throw err;
       console.log(JSON.stringify(result));

    });
})