const fs = require('fs');
const a = 100;

setImmediate(() =>{
    console.log("SetImmediate");
});

fs.readFile("./file.txt","utf-8",()=>{
    console.log("File reading CB");
})


setTimeout(()=>{
    console.log("Timer expired")
},0);

function printA(){
    console.log("a =",a);
}

printA();
console.log("Last line of file");

//Based on priority of event loop, below will be output 

// a = 100
// Last line of file
//---------------------------- Below are coming from event loop ----------------------------
// Timer expired (This is first in priority)
// SetImmediate (Second on priority under check phase)
// File reading CB (This comes last as it takes time for libuv to read the file and then put it in queue and others are directly kept in queue)
