const crypto = require("crypto");

console.log("Hello World");

var a = 105;
var b = 200;

//Sync Function, will block the main thread. This doesnt have a callback, as libuv is not taking the callback and main
//thread is basically waiting for it to complete.
crypto.pbkdf2Sync("password","salt",500000,50,"sha512");
    console.log("Key is generated from Sync");

//This is Async.
//Gives us the function to create a key for a password. (Password based key derivative function). This is managed by libUv
crypto.pbkdf2("password","salt",500000,50,"sha512",(err,key)=>{
    console.log("Key is generated");
})

function multiply(a,b){
    return a*b;
}

var c = multiply(a,b);
console.log("Multiplication results ",c);

// Hello World
// Multiplication results  21000
// Key is generated


//After adding sync
// Hello World
// Key is generated from Sync
// Multiplication results  21000
// Key is generateda
