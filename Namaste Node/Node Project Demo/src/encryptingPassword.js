const express = require('express');
const connectDb = require('./config/database');
const User = require('./models/user')
const app = express();
const validateSignUpData = require('./utils/validation')
const bcrypt = require('bcrypt');
const validator = require('validator');


//Middleware for reading JSON request for all incoming request
app.use(express.json());

app.post("/login",async (req,res)=>{
    try{
        const {emailId, password} = req.body;
        if(!validator.isEmail(emailId)) {
            throw new Error("Invalid email");
        }
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("No user found for this email");
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(isPasswordValid){
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

//Get all user from database
app.get('/feed',async (req,res)=>{
    try{
        const users = await User.find();
        if(users.length === 0){
            res.status(404).send("No Users found");
        }
        else{
            res.send(users);
        }    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
})

//Get user based on email.
app.get("/user", async (req,res)=>{
    const userEmail = req.body.emailId;
    try{
        const users = await User.find({emailId: userEmail});
        if(users.length === 0){
            res.status(404).send("User not found");
        }
        else{
            res.send(users);
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
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

//delete a user
app.post("/deleteUser",async (req,res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
})


//Update data of the user
app.patch("/updateUser/:userId",async (req,res) => {
    const userId = req.params?.userId;
    const data = req.body;
    const allowedUpdates = ['about','gender','age','skills'];
    try{
        const isUpdateAllowed = Object.keys(data).every(input =>
            allowedUpdates.includes(input)
        )
        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }
        //return document which was before update. If we put after it will return the document after the update.
        //run validators is use to run the validation function from model in patch related operations
        const before = await User.findByIdAndUpdate({_id:userId},data,{returnDocument : "before",runValidators:true});
        console.log("Before document "+before)
        res.send("User updated successfully");
    }
    catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
})


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

