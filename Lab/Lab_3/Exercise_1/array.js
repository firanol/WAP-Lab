// Array
let fruits = ["apple", "banana", "cherry"];
console.log(fruits[0]); // Output: apple

//Push, Pop, shift, unshift, filter, reduce
let numbers = [1, 2, 3, 4];
let evenNumbers = numbers.filter(num => num % 2 === 0); 
console.log(evenNumbers); // Output: [2, 4]

//reduce
function sum(...args) {
    return args.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3)); // Output: 6
