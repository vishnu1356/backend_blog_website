const Blog = require("../models/blog");


exports.createBlog = async (req, res)=> {
    const {imgurl, title, description} = req.body;
    try {
        if(!imgurl || !title || !description){
            res.status(404).json("ImageUrl or Title or Description not found")
        }
        const post = new Blog({imgurl, title, description})
        await post.save()
        res.status(200).json(post)
        
    } catch (error) {
        res.status(500).json({error: "Something Went Wrong!"})
    }
}


exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
        if(!blogs){
            res.status(404).json("Not Found")
        }
        res.status(200).json(blogs)
    } catch (error) {
        res.status(500).json({error: "Something Went Wrong!"})
    }
}

exports.getSingleBlog = async (req, res) => {
    if(!req.params.id){
        res.status(404).json("Id Not Found!")
    }
    try {
        const blog = await Blog.findById(req.params.id)
        if(!blog) {
            res.status(404).json("Blog Not Found")
        }
        res.status(200).json(blog)
    } catch (error) {
        res.status(500).json({error: "Something Went Wrong!"})
    }
}

exports.deleteSingleBlog = async (req, res) => {
    if(!req.params.id){
        res.status(404).json("Id Not Found")
    }
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id)
        if(!blog){
            res.status(404).json("Blog Not Found")
        }
        res.status(200).json(blog)
    } catch (error) {
        res.status(500).json({error: "Something Went Wrong!"})
    }
}

exports.updateSingleBlog = async (req, res) => {
    if(!req.params.id){
        res.status(404).json("Please Provide Id, First")
    }

    try {
        
        const {imgurl, title, description} = req.body;
        const blog = await Blog.findByIdAndUpdate(req.params.id, {imgurl, title, description})
        if(!blog){
            req.status(404).json("Something Went Wrong!")
        }
        res.status(200).json(blog)

    } catch (error) {
        res.status(500).json({error: "Something Went Wrong!"})

    }
}