const express = require('express');
const connectDb = require('./config/database');
const User = require('./models/user')
const app = express();

//Middleware for reading JSON request for all incoming request
app.use(express.json());

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

    //If we do req.body it will give undefined as our server is not able to read the JSON data. So we added above express.json
    const user = new User(req.body);
    try{
        await user.save();
        res.send("User saved successfully")
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
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
app.patch("/updateUser",async (req,res)=>{
    const userId = req.body.userId;
    const data = req.body;
    try{
        //return document which was before update. If we put after it will return the document after the update.
        const before = await User.findByIdAndUpdate({_id:userId},data,{returnDocument : "before"});
        console.log("Before document "+before)
        res.send("User updated successfully");
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
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

