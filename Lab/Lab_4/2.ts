interface BankAccount {
    money: number;
    deposit(value: number): void;
}

let bankAccount: BankAccount = {
    money: 2000,
    deposit(value: number): void {
        this.money += value;
    }
};

interface PersonWithBankAccount {
    name: string;
    age: number;
    isStudent: boolean;
    bankAccount: BankAccount;
    hobbies: string[];
}

let myself: PersonWithBankAccount = {
    name: "John",
    age: 30, // Added age
    isStudent: false, // Added isStudent
    bankAccount: bankAccount,
    hobbies: ["Violin", "Cooking"]
};

myself.bankAccount.deposit(3000);
console.log(myself);
