const UploadBlog = require("../models/uploadblog");


exports.uploadNewBlog =  async (req, res) => {
    
    try {
        const {title, description} = req.body;

        const blogimg = req.file.filename; 
        const newUserImage = new UploadBlog({
            title, description, blogimg
        })
        await newUserImage.save();

        res.status(201).send("Image uploaded successfully!");
    } 
    catch (err) {
        console.error("Error from Uploading image",err);
        res.status(500).send("Error uploading image");
    }
}
