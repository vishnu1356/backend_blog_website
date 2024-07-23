
const express = require("express")
const pingOneRouter = require("./v1/ping_route");
const blogRouter = require("./v1/blog_router");

const apiRouter  = express.Router()


apiRouter.use("/v1", pingOneRouter);
apiRouter.use("/v1", blogRouter)

module.exports = apiRouter