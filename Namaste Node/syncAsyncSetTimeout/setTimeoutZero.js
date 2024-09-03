console.log("Hello World");

var a = 107;
var b = 209;

setTimeout(()=>{
    console.log("Call me asap");
},0)

function multiply(a,b){
    const result = a * b;
    return result;
}

var c = multiply(a,b);

console.log("multiplication result is: ",c);

// Hello World
// multiplication result is:  22363
// Call me asap

// Settimeout will be offloaded to libub as its an async operation and in the millisecond the code moves on to execute
//  other part and call stack becomes busy.Thats why setTimeout console is printed at last. Only when main thread is empty, after that 0 sec it will execute
