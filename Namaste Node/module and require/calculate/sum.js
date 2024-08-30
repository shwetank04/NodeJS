//By default the Modules protects the variable and function to be leaked. Because the variables here can conflict with other 
//modules variable name.

var x = "Hello World";

function calculateSum(a,b) {
console.log(a+b);
}

//Have to export this function from here by wrapping it inside the object which is old way
// module.exports = {
//     calculateSum:calculateSum,
//     x:x,
// };

console.log(module.exports) // {} This is an empty object so we can assign variable using . or with below way.


//new way
module.exports = {
    calculateSum,
    x,
};
