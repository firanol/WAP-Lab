const strings = ['apple', 'banana', 'grapefruit', 'kiwi'];

const uppercaseLongStrings = strings.reduce((acc, str) => {
    if (str.length > 5) {
        acc.push(str.toUpperCase());
    }
    return acc;
}, []);

console.log(uppercaseLongStrings); // Output: ['BANANA', 'GRAPEFRUIT']
