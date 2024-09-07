const fs = require('fs');

const a = 100;

setImmediate(()=> console.log("Set Immediate"))

Promise.resolve().then(() => console.log("Promise"));

fs.readFile("./file.txt","utf-8",()=>{
    console.log("File reading CB");
})

setTimeout(() => console.log("Timer expired"),0);

process.nextTick(()=>console.log("Process.nextTick"));

function printA(){
    console.log("a =",a);
}

printA();
console.log("Last line of file");

//Based on priority of event loop, below will be output 

// a = 100
// Last line of file
//Process.nextTick
//Promise
//Timer expired
//Set Immediate
//File reading CB
