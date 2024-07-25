
const mongoose = require("mongoose")

const {Schema} = mongoose;

const uploadBlogSchema = new Schema({
    blogimg:{
        type: String,
        required:true,
    },
    title: {
        type: String,
        // required: true
    },
    description : {
        type: String,
        // required: true,
    }
}, {timestamps: true}
);

const UploadBlog = mongoose.model("UploadBlog", uploadBlogSchema)

module.exports = UploadBlog;