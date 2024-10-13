const express = require('express');
const connectDb = require('./config/database');
const User = require('./models/user')
const app = express();
const validateSignUpData = require('./utils/validation')
const bcrypt = require('bcrypt');
const validator = require('validator');
const cookieParser = require('cookie-parser');
const {tokenAuth} = require('./middleware/auth')

//Middleware for reading JSON request for all incoming request
app.use(express.json());
app.use(cookieParser());

app.post("/login",async (req,res)=>{
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
})

app.post('/signup', async (req,res) => {

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
})

app.get("/profile",tokenAuth,async (req,res) => {
    try{
        res.status(200).send(req.user ? req.user : "User not found");
    }
    catch(err){
        res.status(500).send(err.message);
    }
})

app.post("/sendConnectionRequest",tokenAuth, (req,res) => {
    res.send("Connection request send");
});

//Connecting to db and then only starting the application
connectDb().then(() =>{
    console.log("Connected to DB");
    app.listen(3000,()=>{
        console.log("Server is successfully listening on port 3000");
    });
})
.catch((err) => {
    console.log("Error in connecting to DB "+err)
});

