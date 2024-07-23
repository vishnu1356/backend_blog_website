const { SALTROUND, MY_EMAIL, MY_PASSWORD, CLIENT_URL } = require("../config/server_config");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const { generateToken, verifyToken } = require("../utils/auth");
const nodemailer = require("nodemailer");
const { ObjectId } = require('mongodb');
// Create a new user



exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
}

  const hashedPassword = await bcrypt.hash(password, +SALTROUND)
  try {
    const user = new User({ name, email, password:hashedPassword });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserByEmail = async (req, res) => {
    const {email, password } = req.body;
    if (!email || !password) {
        return res.status(404).json({ message: 'Not a Valid User' });
    }
    try {
        const user = await User.findOne({email:email});
        console.log("User details are:", user)
        const doesPasswordMatch = await bcrypt.compare(password, user.password);

        res.cookie("token", generateToken({email: user.email, id: user.id}), {httpOnly: true, maxAge: 7*24*60*60*1000})

        res.status(200).json({jwt: generateToken({email: user.email, id: user.id, name:user.name})}) 
        res.status(200).json({username:user.name})
        
    } catch (error) {
        console.log("Error caught by getUserByMail", error)
    }
}

exports.getAllUsers = async (req, res) => {
    try{
        const user = await User.find();
        res.status(201).json(user)
    }
    catch (error) {
        res.status(400).json({error:"something went wrong!"})
    }
}


exports.getSingleUser = async (req, res) => {
    try{

        const user = await User.findById(req.params.id)

        if(!user) {
            res.status(404).json({message:"User not Found"})
        }
        res.status(200).json(user)
    }
    catch(error){
        res.status(500).json({error: "Something Went Wrong!"})
    }
}

exports.deleteSingleUser = async (req, res) => {

    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            res.status(404).json({message:"User Not Found"})
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error:"Something Went Wrong!"})
    }

}

exports.updateSingleUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, {name,email, password})
        if(!user) {
            res.status(404).json({massage: "Details are not valid"})
        }
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({error:"Something Went Wrong!"})
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        const {email} = req.body;
        if(!email){
            return res.status(400).send({message:"Please provide email"})
        }
        const checkUser = await User.findOne({email});
        const objectId = checkUser._id;
        const idString = objectId.toString(); // This will give you '669f2b8edc2d2a533e59fca5'

        console.log(idString);
        if(!checkUser) {
            res.status(400).send({message:"User Not Found!"})
        }

        const token = generateToken({email});
        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            auth: {
                user: MY_EMAIL,
                pass: MY_PASSWORD,
            }
        })
        const receiver = {
            from: "vishnu@whizamet.com",
            to: email,
            subject: "Password Reset Request",
            html: `<p>Click <a href="${CLIENT_URL}/reset/${idString}">here</a> to generate a new password.</p>`            // text: `Click on this link to generate new password\n ${CLIENT_URL}/forgot/${token}`
        }
        await transporter.sendMail(receiver);
        return res.status(200).send({message:"password link send to your email"})
    } catch (error) {
        res.status(500).json({error:"Something Went Wrong!"})
    }
}


exports.resetPassword = async (req, res) => {
    try {
        const { id, password } = req.body;

        console.log("before userId is:", id);
        console.log("password is:", password);

        if (!password) {
            return res.status(400).send({ message: "Please provide a password" });
        }

        // Convert id string to MongoDB ObjectId
        const userId = new ObjectId(id);
        console.log("userId is", userId);

        // Find user by _id (ObjectId)
        const user = await User.findById(userId);
        console.log("user is:->", user)

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Hash the new password
        const newHashedPassword = await bcrypt.hash(password, +SALTROUND);
        user.password = newHashedPassword;

        // Save the updated user object
        await user.save();

        return res.status(200).send({ message: "Password reset successfully!" });
    } catch (error) {
        console.error("Error in resetPassword:", error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}