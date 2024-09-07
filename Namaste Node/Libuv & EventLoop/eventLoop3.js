const fs = require('fs');

setImmediate(()=> console.log("Set immediate"));

setTimeout(()=> console.log("Time expired"),0);

Promise.resolve().then(() => console.log("Promise"));

fs.readFile("./file.txt","utf-8",()=> {
    setTimeout(()=> console.log("2nd Timer"),0);
    process.nextTick(()=>console.log("2nd Process.nextTick"));
    setImmediate(()=> console.log("2nd Set immediate"));
    console.log("File reading CB")
})

process.nextTick(()=>console.log("Process.nextTick"));

console.log("Last line of file");


// Last line of file
// Process.nextTick    
// Promise
// Time expired        
// Set immediate

//-------------------------------Below is under file----------------------------------- 
//------------------The event loop was in waiting state and was waiting at Poll Phase and go to next phase which is check and print immediate first.
//---------->The functions inside fs.readFile will goto call stack and will start executing again with new calls to libuv.

// File reading CB
// 2nd Process.nextTick
// 2nd Set immediate   
// 2nd Timer
