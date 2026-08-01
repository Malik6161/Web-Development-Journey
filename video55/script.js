console.log("Hello, World!");
// Variables are case sensitive in js. WE use the let because it is a global variable and can be changed. If we use const then it will be a constant variable and cannot be changed.
let a = 10;

let b = 20;
let c = "Harry Potter"; 
// console.log(let a = 10; // This will throw an error because we cannot redeclare a variable with let. If we want to change it, we can use var or const. The variable in the block is only for the block and cannot accessod outside of the block.)

const pi = 3.14; // constant variable
// pi = 3.14159; // This will throw an error because pi is a constant. If we want to change it .

console.log("The sum of a and b is: " + (a + b));
console.log(typeof a, typeof b, typeof c);

let x = "Harry bhai";
let y = 10;
let z = 3.14;
const p = true;
let q = undefined;
let r = null;
console.log(x, y, z, p, q, r);
console.log(typeof x, typeof y, typeof z, typeof p, typeof q, typeof r);

// creating an object in js, we have to follow the rules of object creation in js.

let o = {
    name : "Harry",
    "job code" : "Programmer",
    age : 20,
    isMarried : false
}
console.log(o);
o.salary = 100000; // Adding a new property to the object
console.log(o);
o.salary = 200000; // Changing the value of the property
console.log(o);