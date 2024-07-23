// const { StatusCodes, ReasonPhrases } = require("http-status-codes");
// const errorResponse = require("../utils/error_response");
// const UnauthorizedError = require("../errors/unauthorized_error");
const { verifyToken } = require("../utils/auth");

const isLoggedIn = function (req, res, next) {
    
    // console.log(req.cookies)
    if(!req.cookies || !req.cookies.token) {
        return res.status(404).json({message:"You are not authorized"})
    }
    const {token} = req.cookies;
    let decodedToken;
    try {
        decodedToken = verifyToken(token)
    }
    catch (error) {
        return res.status(404).json({message:"You are not authorized"})
    }

    req.user = { email: decodedToken.email, id: decodedToken.id }

    next();
}

module.exports = {
    isLoggedIn,
}