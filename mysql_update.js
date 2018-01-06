var {con}=require("../mysql/mysqlDemo");
con.connect((err)=>{

    sql="update register set  name='mohini123' where id='2'";
    con.query(sql,(err,result)=>{
        if(err)
            throw err;
        console.log("recored updated..");
    });
});
