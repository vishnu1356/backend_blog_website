
const express = require("express");
const { createBlog, getAllBlogs, getSingleBlog, deleteSingleBlog, updateSingleBlog } = require("../../controllers/blog_controller");

const blogRouter = express.Router()


blogRouter.post("/blog/post", createBlog);
blogRouter.get("/blogs", getAllBlogs);
blogRouter.get("/blog/:id", getSingleBlog);
blogRouter.delete("/blog/:id", deleteSingleBlog);
blogRouter.patch("/blog/:id", updateSingleBlog);

module.exports = blogRouter;