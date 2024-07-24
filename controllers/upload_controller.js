const UserImage  = require("../models/userImage");


exports.uploadImage =  async (req, res) => {
    
    try {
        const {username} = req.body;

        const image = req.file.filename; 
        const newUserImage = new UserImage({
            username, image
        })
        await newUserImage.save();

        res.status(201).send("Image uploaded successfully!");
    } 
    catch (err) {
        console.error("Error from Uploading image",err);
        res.status(500).send("Error uploading image");
    }
}

