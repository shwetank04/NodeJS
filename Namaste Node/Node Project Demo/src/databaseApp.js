const express = require('express');
const connectDb = require('./config/database');
const User = require('./models/user')
const app = express();


app.post('/signup', async (req,res) => {

    //creating a new user with above data.
    //creating a new instance of User model
    const user = new User({
        firstName:"shwetank",
        lastName:"sudhanshu",
        emailId:"shw@gmailcom",
        password:"shw123"
    })

    await user.save();
    res.send("User saved successfully")
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

