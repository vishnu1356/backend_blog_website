
const mongoose = require("mongoose")

const {Schema} = mongoose;

const blogSchema = new Schema({
    imgurl:{
        type: String,
        required:true,
    },
    title: {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true,
    }
}, {timestamps: true})


const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;