function nice(name) {
    console.log(`Hello, ${name}! Nice to meet you.`);
    console.log(`Welcome to our community, ${name}. We hope you have a great time here!`);
    console.log(`If you have any questions, feel free to ask, ${name}. We're here to help!`);
    console.log(`Thank you for joining us, ${name}. We appreciate your presence!`);
}

// here i make a simple function and gave the sum of two numbers and return the result.

function sum(a, b) {
    const result = a + b;
    return result;
}
const result = sum(5, 10);
const result2 = sum(20, 30);
const result3 = sum(100, 200);
console.log(result);
console.log(result2);
console.log(result3);
nice("Alice");

// default parameter by using subtract function
function subract(a, b, c = 10) {
    const nxt = a - b - c;
    return nxt;
}

// arrow function

const function1 = (x) => {
    console.log("I am a arrow function.", x)
}
function1(34);


const nxt = subract(20, 5);
const nxt2 = subract(50, 20, 5);
const nxtt3 = subract(100, 50);
console.log(nxt);
console.log(nxt2);
console.log(nxtt3);

