interface SimplePerson {
    name: string;
    age: number;
    isStudent: boolean;
}

function describePerson(person: SimplePerson): string {
    return `${person.name} is ${person.age} years old and is ${person.isStudent ? "a student" : "not a student"}.`;
}

const person: SimplePerson = { name: "Alice", age: 25, isStudent: true };
console.log(describePerson(person));
