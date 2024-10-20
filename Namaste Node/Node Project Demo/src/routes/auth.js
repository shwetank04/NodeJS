const express = require('express');
const authRouter = express.Router();
const {validateSignUpData} = require('../utils/validation');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const validator = require('validator');


authRouter.post('/signup', async (req,res) => {

    try{
    //Validation of data
    validateSignUpData(req);

    const {firstName,lastName,emailId,password} = req.body;

    //Encrypt the password
    const passwordHash = await bcrypt.hash(req.body.password,10);

    //If we do req.body it will give undefined as our server is not able to read the JSON data. So we added above express.json
    const user = new User({
        firstName,lastName,emailId, password: passwordHash
    });
    await user.save();
    res.send("User saved successfully")
    }
    catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
});

authRouter.post("/login",async (req,res)=>{
    try{
        const {emailId, password} = req.body;
        if(!validator.isEmail(emailId)) {
            throw new Error("Invalid email");
        }
        const user = await User.findOne({emailId: emailId});
        if(!user) {
            throw new Error("No user found for this email");
        }
        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){
        //create JWT Token
        //we are hiding the userId in jwt and then giving secreat key in second argument
        const token = await user.getJWT();
        console.log(token);
        //Add the token to cookie and send the response back to user.
            res.cookie("token",token,{expiresIn : "1d"});
            res.status(200).send("Login successfull");
        }
        else{
            res.status(400).send("Incorrect password");
        }
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{expiresIn : new Date(Date.now())});
    res.send();
});

module.exports = authRouter;
