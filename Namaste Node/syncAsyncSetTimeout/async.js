const fs = require('fs');
const https = require('https');

console.log("Hello World");

var a = 209;
var b = 107;

//This is sync function and will block the main thread. 
fs.readFileSync("./file.txt","utf-8")
    console.log("File Text from Sync ");

//Goes to libu and stores the call back function
https.get("https://dummyjson.com/products/1",(res)=>{
    console.log("Data fetched successfully");
});

//Goes to libu and stores the call back function
setTimeout(() =>{
    console.log("setTimeout called after 5 seconds");
},5000);

//Goes to libu and stores the call back function
fs.readFile("./file.txt","utf-8",(err,data)=>{
    console.log("File Text ",data)
})

function multiply(a,b){
    const result = a * b;
    return result;
}

var c = multiply(a,b);

console.log("multiplication result is: ",c);

//The third one will be under functional execution context and meanwhile GEC will be sitting idle. JS Functionis sitting Idle
// Hello World
// File Text from Sync 
// multiplication result is:  22363
//These are given back from Libuv and the above Js main thread is not blocked.
// File Text  "Shwetank"s
// Data fetched successfully
// setTimeout called after 5 seconds
