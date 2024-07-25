
const express = require("express");
const mongoose = require("mongoose")
const cors = require('cors')
const cookieParser = require("cookie-parser")

const bodyParser = require("body-parser")
const { PORT } = require("./config/server_config");
const apiRouter = require("./routes/api_routes");



const app = express()

mongoose.connect('mongodb://localhost:27017/myDatabase')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))


app.use("/api", apiRouter)





app.listen(PORT, (req, res) => {
    console.log("Server started listening at: ", PORT)
});

