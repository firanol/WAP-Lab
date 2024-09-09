const testIsPrime = async (n: number) => {
    console.log('start');
    try {
        const result = await isPrimeAsync(n);
        console.log(result);
    } catch (error) {
        console.error(error);
    }
    console.log('end');
};

testIsPrime(7);
