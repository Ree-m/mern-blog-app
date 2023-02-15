const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const multer = require('multer')
const uploadMiddleware = multer({ dest: 'uploads/',limits:{fieldSize:25* 1024 * 1024} })
const fs = require("fs");
// const { dirname } = require("path");
// const { intervalToDuration } = require("date-fns/esm");

// const connectDB = require("../config/database");


// Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Connect To Database
// connectDB();

// To hash a password
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)
const secret = "kj06d8eg4dbklpo3ie3u2x86k047gfbc7ny" //this secret is called a salt!!


app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

app.use("/uploads", express.static(__dirname + "/uploads"))
app.use(express.json());
app.use(cookieParser())



mongoose.connect("mongodb+srv://Reem:N5XhNF17Z4u1zfLU@cluster0.qywkq54.mongodb.net/?retryWrites=true&w=majority")

app.post("/register", async (req, res) => {
    const { username, password } = req.body

    const userInfo = new User({
        username: username,
        password: bcrypt.hashSync(password, salt)
    })
    try {
        const userInfoToSave = await userInfo.save()
        res.status(200).json(userInfoToSave);

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error })
    }
})

app.post("/login", async (req, res) => {
    const { username, password } = req.body
    const userInfo = await User.findOne({ username })  //find username that is eqaul to the username typed in
    const passOk = bcrypt.compareSync(password, userInfo.password)

    if (passOk) {
        // logged in
        jwt.sign({ username, id: userInfo._id }, secret, {}, (err, token) => { //this token gets used in /profile
            if (err) throw err
            res.cookie('token', token).json({
                id: userInfo._id,
                username
            })  //'token' is set to token fro the parameter
        })
    } else {
        // not logged in
        res.status(400).json("wrong credentials")
    }

})

app.get("/profile", (req, res) => {
    const { token } = req.cookies
    jwt.verify(token, secret, {}, (error, userInfo) => {
        if (error) throw error
        res.json(userInfo)
    })
})

app.post("/logout", (req, res) => {
    res.cookie("token", "").json("ok")  //sets 'token; to empty,ie,invalid,now user can be loged out

})


app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
    const { originalname, path } = req.file
    // In the the uploads folder,i need the images to upload from client side form.
    // For that,the uploaded file (in upload folder) needs the extension,ie,png/jpg/.. etc
    // So i need to grab the extension from req.file.originalname

    const splitFileName = originalname.split(".")  //makes an array of two objects,one is the fle name and the other is the extension name 
    const extension = splitFileName[splitFileName.length - 1]  //gets onlt the extension
    const newPath = path + "." + extension
    fs.renameSync(path, newPath)  //the path ofthe image now has an extension and works.ie.its uploaded in the upload folder and is viewable
    // res.json(extension)  like console.log but in network

    const { token } = req.cookies
    jwt.verify(token, secret, {}, async (error, userInfo) => {
        if (error) throw error
        const newPost = await Post.create({
            title: req.body.title,
            summary: req.body.summary,
            content: req.body.content,
            cover: newPath,
            author: userInfo._id
        })
        res.json(newPost)

    })

})


app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
    let newPath = null;
    if (req.file) {
      const {originalname,path} = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path+'.'+ext;
      fs.renameSync(path, newPath);
    }
  
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
      if (err) throw err;
      const {id,title,summary,content} = req.body;
      const postDoc = await Post.findById(id);
      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(400).json('you are not the author');
      }
      await postDoc.update({
        title,
        summary,
        content,
        cover: newPath ? newPath : postDoc.cover,
      });
  
      res.json(postDoc);
    });
})



    app.get("/post", async (req, res) => {
        const { id } = req.params

        const posts = await Post.find()
            .populate('author', ['username'])
            .sort({ createdAt: -1 })  //descinding order.ie,newest post first
            .limit(20)  //onlt 20 posts shown

        res.json(posts)
    })



    app.get("/post/:id", async (req, res) => {
        const { id } = req.params
        const postInfo = await Post.findById(id).populate("author", ['username'])   //the populate is for getting author name from author id 
        res.json(postInfo)
    })

    app.listen(4000);

