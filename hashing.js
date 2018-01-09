const {SHA256}=require('crypto-js');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
//
var password='123abc';
// bcrypt.genSalt(10,(err,salt)=>{
//     bcrypt.hash(password,salt,(err,hash)=>{
//         console.log(hash);
//     });
// });
var hashpas='$2a$10$zb0EzhPQ3fWpv2eW777cee2.YgSx5yhVu88byMzdPtdSzHOmF.hdK';
bcrypt.compare(password,hashpas,(err,res)=>{
    console.log(res);
})
// var data={
//     id:4
// };
// var token=jwt.sign(data,'123abc');
// console.log(token);
// var decode=jwt.verify(token,'123abc');
// console.log(decode);


// var meg="i ma user number 3";
// var hash=SHA256(meg).toString();
// console.log(`Message: ${meg}`);
// console.log(`Hash: ${hash}`);
// var data={
//     id:4
// };
// var token={
//     data,
//     hash:SHA256(JSON.stringify(data)+"somesecret").toString()
// }
// var reshash=SHA256(JSON.stringify(token.data)+"somesecret").toString();
// if(reshash === token.hash){
//     console.log("not change");
// }else{
//     console.log("change");
// }
