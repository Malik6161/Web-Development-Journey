let a = [1, 2, 3, 4, 5];
console.log(a); 
console.log(a[0]);
console.log(a[1]);
console.log(a[2]);
console.log(a[3]);
console.log(a[4]);

// for getting the length of array, also its a property of array;not funtion:
console.log(a.length);

// for checking the exexution time of the code;

console.timeLog("Time taken to execute the code");

// Strings are immutable in JavaScript, which means that once a string is created, it cannot be changed. Any operation that modifies a string will create a new string instead of modifying the original one.

console.log(a.toString()); 

console.log(a.join(" and ")); 

console.log(a.pop()); // removes the last element from the array and returns that element. This method changes the length of the array.

console.log(a); 


console.log(a.push(6)); // adds a new element to the end of the array and returns the new length of the array.

console.log(a);

console.log(a.push("Malik")); // so here we can add any type of data in the array, as array is a collection of different types of data.

console.log(a);

console.log(a.shift()); // removes the first element from the array and returns that removed element. This method changes the length of the array.

console.log(a);

console.log(a.unshift(1)); // adds a new element to the beginning of the array and returns the new length of the array.

console.log(a);
//shift is the brother of pop and unshift is the brother of push.

let b = [1, 2, 3, 4, 5];
let c = [6, 7, 8, 9, 10];
console.log(a.concat(b, c)); // The concat() method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.
console.log(a);

let d = [100, 400,44, 55, 66, 77, 88, 99];
console.log(d.reverse()); // The reverse() method reverses the order of the elements in an array in place. The first array element becomes the last, and the last array element becomes the first.
console.log(d.sort()); // The sort() method sorts the elements of an array in place and returns the sorted array. The default sort order is ascending, built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values.
console.log(a.splice(2, 0, "Awais")); // The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.2 is the index at which to start changing the array, 0 is the number of elements to remove, and "Awais" is the element to add.
console.log(a);
