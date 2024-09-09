const isPrimeAsync = (n: number): Promise<{ prime: boolean }> => {
    return new Promise((resolve, reject) => {
        if (n < 2) {
            reject({ prime: false });
            return;
        }

        for (let i = 2, s = Math.sqrt(n); i <= s; i++) {
            if (n % i === 0) {
                reject({ prime: false });
                return;
            }
        }

        resolve({ prime: true });
    });
};

// Testing with .then() and .catch()
console.log('start');
isPrimeAsync(7)
    .then(console.log)
    .catch(console.error);
console.log('end');
