console.log("Learning to loop in JavaScript!");
console.log("This is a simple for loop example.");
let a = 1;
for (let i = 0; i < 10; i++) {
  
    console.log("The value of a is: " + a );
    a++;
}
let object = {
    name: "Awais",
    age: 20,
   "Dream city": "New York",
   role: "Software Engineer"
};
// for in loop is use to print the key and value of an object
for (const key in object) {
    const element = object[key];
    console.log(key + ": " + element);
}
// for of loop is use to print the value of an array
for (const c of "malik") {
    console.log(c);
}
// while loop
while(a < 20) {
    console.log("The value of a is: " + a );
    a++;
}

// do while loop
do {
    console.log("The value of a is: " + a );
    a++;
} while(a < 30);