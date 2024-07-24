
const express = require("express");
const mongoose = require("mongoose")
const multer  = require('multer')
const cors = require('cors')
const cookieParser = require("cookie-parser")

const bodyParser = require("body-parser")
const { PORT } = require("./config/server_config");
const apiRouter = require("./routes/api_routes");



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({ storage:storage })
const app = express()

mongoose.connect('mongodb://localhost:27017/myDatabase')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(bodyParser.urlencoded({extended:true}))



app.use("/api", apiRouter)
app.post("/upload", upload.single("profileImage"), (req, res) => {

    console.log(req.body)
    console.log(req.file)
    res.send({message: "Image Upload Successfully"})

})




app.listen(PORT, (req, res) => {
    console.log("Server started listening at: ", PORT)
});

