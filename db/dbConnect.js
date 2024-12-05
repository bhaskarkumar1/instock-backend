const mongoose= require("mongoose")
 async function dbConnect(){
    try{
        await mongoose.connect("mongodb://localhost:27017/inStock")
        console.log("Connection to DB established Successfully!")
     }catch(err){
        console.log("error in establishing the connection to DB",err)
     }
}


module.exports=dbConnect