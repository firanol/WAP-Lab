// Object declaration using object literal
const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    // Method (a function inside an object)
    fullName: function() {
        return this.firstName + " " + this.lastName;
    }
};

console.log(person.firstName); // Output: John
console.log(person.fullName()); // Output: John Doe

// Accessing object properties
console.log(person.age); // Output: 30

// Changing object properties
person.age = 35;
console.log(person.age); // Output: 35

// Calling a method
console.log(person.fullName()); // Output: John Doe

// Adding a new property
person.nationality = "American";
console.log(person.nationality); // Output: American

// Adding a new method
person.greet = function() {
    return "Hello, " + this.firstName;
};
console.log(person.greet()); // Output: Hello, John


