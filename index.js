const mongoose=require('mongoose')
const express=require("express")
const app=express()
const bodyParser = require('body-parser');


const dbConnect=require("./db/dbConnect")
const Admin=require("./models/admin")
const User=require("./models/user")
const port=3000

// middle-ware 
app.use(express.json())
app.use(bodyParser.json());

 dbConnect()


app.get("/health",(req,res)=>{
    res.send("The server is running with good health")
})



//admin login 
app.post("/admin/login",async(req,res)=>{
    try{
    console.log(req.body)
    let mail=req.body.email
    let pwd=req.body.password
console.log(mail,pwd)
    let isPresent=await Admin.findOne({email:mail})
    if(isPresent){
        res.send("email already present !")
    }else{
    const doc=new Admin({
        email:mail,
        password:pwd,
    })

    await doc.save()
    console.log("new admin user has been created! ")
    res.send("Admin has been registered! ")

}
}catch(err){
    console.log("error in creating a new admin",err)
    res.send("this is admin login ")

}
// res.send("this is admin login ")

})



// user
app.post("/user", async(req,res)=>{
    console.log(req.body)
    try{
        let mail=req.body.email
        let password=req.body.password
        let username=req.body.username

        let isPresent =await User.findOne({email:mail})
        if(isPresent){
            res.send(`user with this ${mail} is already registered!`)
        }else{
            let doc =new User({
                email:mail,
                username:username,
                password:password,
            })
            await doc.save()

            console.log("new user has been created! ")
            res.send("New user has been created ! ")
        }
    }catch(err){
        console.log("error in creating a new admin",err)
        res.send("Error creating new User ! ")
    
    }

})


app.post("/user/login",async(req,res)=>{
console.log(req.body)
try{
    let mail=req.body.email
    let password=req.body.password

    let isPresent= await User.findOne({email:mail})
    if(isPresent){
        console.log(isPresent.password)
        if(isPresent.password==password){
            console.log("password matched")
            res.send("password matched!")
        }else{
            console.log("wrong password")
            res.send("wrong password!")
        }
    }else{
        console.log("User not registered!")
        res.send("User not registered!")
    }

}catch(Error){
    console.log("error while login !")
}
res.send("user-login ")

})










app.listen(port,()=>{
    console.log(`Server has been started on port ${port}`)
})