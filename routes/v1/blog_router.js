const multer = require("multer");
const path = require("path")
const express = require("express");
const { createBlog, getAllBlogs, getSingleBlog, deleteSingleBlog, updateSingleBlog } = require("../../controllers/blog_controller");
const { uploadImage,  } = require("../../controllers/upload_controller");
const { uploadNewBlog } = require("../../controllers/new_blog_controller");

const blogRouter = express.Router()


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.resolve(__dirname, "../../public");
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({ storage:storage })


blogRouter.post("/blog/post",  upload.single("blogimg"), uploadNewBlog);
blogRouter.get("/blogs", getAllBlogs);
blogRouter.get("/blog/:id", getSingleBlog);
blogRouter.delete("/blog/:id", deleteSingleBlog);
blogRouter.patch("/blog/:id", updateSingleBlog);

blogRouter.post("/upload", upload.single("profileImage"), uploadImage)
module.exports = blogRouter;