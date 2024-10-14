const connectDb = require('./config/database');
const express = require('express');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const cookieParser = require('cookie-parser');
const app = express();

//Middleware for reading JSON request for all incoming request
app.use(express.json());
app.use(cookieParser());


app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);


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

