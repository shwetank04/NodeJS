const http = require("http");

//Gives us an instance of a server
const server = http.createServer(function(req,res){

    if(req.url === "/getSecret"){
        res.end("Luffy");
    }

    //Sending the response back using res.end()
    res.end("Hello World");
});

server.listen(7777);

//http://localhost:7777/
