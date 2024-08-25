const superagent=require('superagent');
require('dotenv').config();
async function get_fun(){
    try{
        // console.log(`${process.env.URL}`);
        // console.log(`${process.env.KEY}`);
    const res=await superagent.get(`${process.env.URL}`)
    .set('Authorization',`Bearer ${process.env.KEY}`);
    return res;
    }
    catch(error){
        return error;
    }
}
module.exports={get_fun}