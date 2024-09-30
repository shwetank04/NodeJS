const express = require('express');

//this is instance of express js application. Creating a new webserver using this.
const app = express();

//// If we put this Request handler here then if we go to / it will give Hello Namaste from Serve and if we do /test or anything else it will give 
//Hello Namaste from Serve
// app.use("/",(req,res) =>{
// res.send("Hello Namaste from Server")
// });

//Adding route under Request handler. The /test will handle everything stating with /test. We can make it get.post.put. This current one will handle all /get.
app.get("/test",(req,res) =>{
    res.send("Hello from Server under Route Test")
});

app.get("/user",(req,res) =>{
    res.send("Hello from Server under Route user")
});

///ab?c here we can ignore b as is optional
app.get("/ab?c",(req,res) =>{
    res.send("Output")
});

//Passing data under url
app.post("/user/:userId",(req,res) =>{
    res.send("Output "+req.params.userId)
});


// If we put this Request handler here then if we go to / it will give Hello Namaste from Serve and if we do /test it will give Hello from Server under Route Test.
//The below route will handle all type of request type as its using use and if we use /user with POST and as there is nothing above with post then by default
//below router will be called.
app.use("/",(req,res) =>{
res.send("Hello Namaste from Server")
});
    

app.listen(3000,()=>{
    console.log("Server is successfully listening on port 3000");
});
