require("./xyz") //This means i need to require this file in code, which needs to be run first. OR one module into another.
//Very imp js code in xyz file will also print.

// require("./sum") This wont work when we use this statement and do calculateSum(a,b);. We cant access the variables, function
//of one module to another through this. It will only run the code.

//Importing the module under here and no need to add .js extension. 
// const obj = require("./calculate/sum");

// const {calculateMultiplication} = require('./calculate/multiply');

//Destructuring on the fly, and can directly access x and calculateSum
// const {x,calculateSum} = require("./sum");

//we can write like this also, and it will just communicate with calculate folder.
const {calculateMultiplication,calculateSum} = require('./calculate')

const data = require('./data.json')
console.log(JSON.stringify(data))

var name = "Namaste Nodejs";

var a = 10;
var b = 20;

console.log(name);
console.log(a+b);

// obj.calculateSum(a,b);
// console.log(obj.x);
calculateSum(a,b);

calculateMultiplication(a,b);


//OUTPUT------------------------>
// Very imp js code in xyz file
// Namaste Nodejs
// 30
//Hello World
//200
