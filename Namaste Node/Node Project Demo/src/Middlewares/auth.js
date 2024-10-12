const jwt = require("jsonwebtoken");
const User = require('../models/user');

//MiddleWare which only works for api starting with /admin
const adminAuth = (req,res,next)=>{
    const token = 'xyz'
    const isAdminAuthorized = token === 'xyz'
    if(isAdminAuthorized){
        next();
    }
    else{
        res.status(401).send("Not valid")
    }
}

//Middleware for token authentication
const tokenAuth = async (req,res,next) => {
    try{
    //Read the Token
    const {token} = req.cookies;
    if (!token) {
        throw new Error("Invalid Token");
    }
    //Validate the Token
    const decodedMsg = await jwt.verify(token,"NODEPROJECT$790");
    //Find the User
    const {_id} = decodedMsg;
    const user = await User.findById(_id);
    if(!user){
        throw new Error("Invalid User");
    }
    req.user = user;
    next();
    }
    catch(err){
        console.log(err);
        res.status(500).send(err.message)
    }
}

module.exports ={
    adminAuth,tokenAuth
}
