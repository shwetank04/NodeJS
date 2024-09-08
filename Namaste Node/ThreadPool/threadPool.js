const fs = require('fs');
const crypto = require('crypto');

//Used to change the thread pool size in libUv
process.env.UV_THREADPOOL_SIZE = 1;

crypto.pbkdf2("password","salt", 500000,50,"sha512",(err,key) =>{
    console.log("1- pbkdf2 done")
})

// fs.readFile("./file.txt","utf-8",() =>{
//     console.log("File reading CB");
// })

crypto.pbkdf2("password","salt", 500000,50,"sha512",(err,key) =>{
    console.log("2- pbkdf2 done")
})

crypto.pbkdf2("password","salt", 500000,50,"sha512",(err,key) =>{
    console.log("3- pbkdf2 done")
})

crypto.pbkdf2("password","salt", 500000,50,"sha512",(err,key) =>{
    console.log("4- pbkdf2 done")
})

crypto.pbkdf2("password","salt", 500000,50,"sha512",(err,key) =>{
    console.log("5- pbkdf2 done")
})


//when we run both crypto function, we will get output at the same time as 2 threads are assigned to it seperately.
//1- pbkdf2 done
// 2- pbkdf2 done

//Even if we run 4 crypto functions at the same time, all 4 threads are used and we get the result at the same time

//if we are runing 5 crypto functions at same time.The 4 output will come at the same time and the 5th one wil come after sometime as 
//all the 4 libuv threads were blocked and 5th was waiting for thread to be empty.

// 4- pbkdf2 done
// 3- pbkdf2 done
// 2- pbkdf2 done
// 1- pbkdf2 done
// 5- pbkdf2 done
