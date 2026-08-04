let a = [1, 44, 33, 46, 15]

for (let i = 0; i < a.length; i++) {
    console.log(a[i])
}
//foreach loop use to iterate over the array
a.forEach((value, index, array) => {
    console.log(value, index, array)
})

//forof loop use to iterate over the array
for (const value of a) {
    console.log(value)
}

//Map: Create an empty map
const fruts = new Map()
fruts.set('apple', 30)
fruts.set('banana', 20)
console.log(fruts.get('apple')) // get gave the value of the item 

console.log(fruts.has('banana')) // has gave true or false

let numbers = [78,45,89,23,90,10];
let double = numbers.map(Number => Number*2);
let resut = numbers.slice(45,23)
console.log(double);

console.log(numbers.length);

console.log(numbers.push("Malik"));

console.log(numbers);
 
console.log(numbers.pop);

console.log(numbers);
console.log(result)



//FILTER
let numbers2 = [10,13,45,8,9];
let result = numbers2.filter(Number => Number > 10);
console.log(result);

//very important 

let products = [
    { name: "Nike", price: 5000 },
    { name: "Adidas", price: 8000 },
    { name: "Puma", price: 3000 }
];

let cheapProducts = products.filter(product => product.price < 6000);

console.log(cheapProducts);

let prices = [100, 200, 300, 400];

let total = prices.reduce((sum, price) => {
    return sum + price;
}, 0);

console.log(total);

//some()checks if some of the given number is present or not

console.log(prices.some(number => number > 40));

//Checks whether all elements satisfy a condition.

console.log(numbers.every(number => number > 5));

let colors = ["red", "green", "blue"];

let [first, second, third] = colors;

console.log(first);
console.log(second);
console.log(third);

//spread operator

let a = [55,78,11,];
let b = [41, 58, 60];

let c = [...a, ...b];

console.log(c);
