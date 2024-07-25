
const mongoose =  require("mongoose")

const {Schema} = mongoose;

const UserImageSchema = new Schema({
    username: {
        type: String,
        required: true,
    }, 
    image: {
        type: String,
        required: true,
    },

}, {timestamps: true})

const UserImage = mongoose.model("UserImage", UserImageSchema);
module.exports =  UserImage;