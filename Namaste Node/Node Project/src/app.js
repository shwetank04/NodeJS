const express = require('express');

//this is instance of express js application. Creating a new webserver using this.
const app = express();

//Request handler
app.use((req,res) =>{
res.send("Hello from Server")
});

app.listen(3000,()=>{
    console.log("Server is successfully listening on port 3000");
});
