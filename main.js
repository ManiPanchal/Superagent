const express=require('express');
const app=express();
app.get("/users",(req,res)=>{
    res.send().statusCode(200);
})
app.listen(8000,()=>{
    console.log('server at 8000');
})
module.exports={app};