

const dotenv = require("dotenv")

dotenv.config()


module.exports = {
    PORT:  process.env.PORT || 3040,
    NAME: process.env.NAME || "Vishnu",
    SALTROUND:process.env.SALTROUND,
    JWT_SECRET:process.env.JWT_SECRET,
    JWT_EXPIRY:process.env.JWT_EXPIRY,
    MY_EMAIL:process.env.MY_EMAIL,
    MY_PASSWORD:process.env.MY_PASSWORD,
    CLIENT_URL:process.env.CLIENT_URL,
   

}