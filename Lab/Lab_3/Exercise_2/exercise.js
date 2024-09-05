function sum(arr) {
    return arr.filter(num => num > 20).reduce((total, num) => total + num, 0);
}

const result = sum([10, 25, 30, 5, 60]);
console.log(result); // Output: 115 (since 25, 30, and 60 are greater than 20)
