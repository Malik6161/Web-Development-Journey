console.log("This is the strings practice file.");
let a = "Malik";
console.log(a);
console.log(a[0]);
console.log(a[1]);
console.log(a[2]);
console.log(a[3]);
console.log(a[4]);
//  If we try to access a character that is out of bounds, it will return undefined.
// console.log(a[5]);

console.log(a.length);

// template literals

let name = "Malik";
let name2 = "awais";
console.log(`My name is ${name} and my friend name is ${name2}.`);
let name3 = "Shazam";
console.log(name3.toUpperCase()); 
console.log(name3.toLowerCase());
console.log(name3.slice(1, 3)); /*It extracts everything from index 1 up to (but not including) index 3 */
console.log(name3.slice(3));
console.log(name3.length);
console.log(name3.trimStart());
console.log(name3.trimEnd());

console.log(name3.trim()); /*trim use to remove whitespace from both ends of a string */

console.log(name3.replace("Shazam", "Shaz"));
let name4 = "hanan";

console.log(name4.slice(1, 4)); /*It extracts everything from index 1 up to (but not including) index 4 */

console.log(name4.replace("hanan", "Adan"));
console.log(name4.concat(" is a good boy."));
console.log(name4.charAt(2));
console.log(name3.concat(" is also a  good boy."));
console.log(name2.concat(` is a friend of ${name3} and ${name4}.`));

/*tomorrow i have to upload the code to the github repository with the commit of feet: Update the properties of strings 
because today i made changes in the string methods
Also upload the project3 and project4 files withe commits but push all them one by one for making a strong practice of github */
