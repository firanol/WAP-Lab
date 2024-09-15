console.log('start');

const myPromise = new Promise(resolve => {

    console.log('1');

    resolve('Fairfield');

    console.log('2');

});

async function firstFunction() {

    console.log(await myPromise);

    console.log('3');

}


function secondFunction() {

    myPromise.then(console.log);

    console.log('4');

}


firstFunction();

secondFunction();

console.log('end');
