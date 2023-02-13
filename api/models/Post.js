const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    title: {
        type: String
    },
    summary: {
        type: String
    },
    content: {
        type: String
    },
    cover: {
        type: String
    }
},{
    timestamps:true,
})

module.exports=mongoose.model("Post",PostSchema)