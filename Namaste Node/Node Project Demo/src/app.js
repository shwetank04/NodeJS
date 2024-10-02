const express = require('express');

//this is instance of express js application. Creating a new webserver using this.
const app = express();

//// If we put this Request handler here then if we go to / it will give Hello Namaste from Serve and if we do /test or anything else it will give 
//Hello Namaste from Serve
// app.use("/",(req,res) =>{
// res.send("Hello Namaste from Server")
// });

//If there is no res.send then the api will keep waiting until it gets timed out. 
//Below code will send Response as output, as it goes to first route handler and sends back response and doesnt go any further.
//If we comment first res.send then it wont go to next one, it will keep waiting. To make it go to next response handler, we need to use next.
//If we have both res.send and next under first request handler, then it will still print only Response as response is already send but the code will still go to
//next lines of code and goes to second route handler and console log will be printed but code will throw error as we are tryig to send other response 
//in the same url.
//We can put array of request handler as well.
app.use('/test2',[(req,res,next)=>{
    console.log("Handling the route user1");
    // res.send("Response");
    next();
},(req,res) =>{
    console.log("Handling the route user2");
    res.send("2nd Response");
}])

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
