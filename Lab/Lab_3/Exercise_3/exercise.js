const getNewArray = function(arr) {
    return arr.filter(str => str.length >= 5 && str.includes('a'));
};

const resultArray = getNewArray(['apple', 'banana', 'car', 'cat', 'avocado']);
console.log(resultArray); // Output: ['apple', 'banana', 'avocado']
