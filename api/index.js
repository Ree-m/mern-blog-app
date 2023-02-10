const express = require("express");
const app = express();
const cors =require("cors");
const mongoose =require("mongoose");
const User=require("./models/User")

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //postman has error without this


mongoose.connect("mongodb+srv://Reem:N5XhNF17Z4u1zfLU@cluster0.qywkq54.mongodb.net/?retryWrites=true&w=majority")

app.post("/register",async (req,res)=>{
    console.log(req.body)

    const userInfo= new User({
        username:req.body.username,
        password:req.body.password
    })
    try{
        const userInfoToSave=await userInfo.save()
        res.status(200).json(userInfoToSave);

    }catch(error){
        res.status(400).json({message:error})


    }
})

app.listen(4000);

//