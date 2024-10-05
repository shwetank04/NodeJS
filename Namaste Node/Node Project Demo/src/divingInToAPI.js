const express = require('express');
const connectDb = require('./config/database');
const User = require('./models/user')
const app = express();

//Middleware for reading JSON request for all incoming request
app.use(express.json());

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

