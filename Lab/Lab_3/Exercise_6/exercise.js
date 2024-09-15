function foo(x) {
    let m;
    console.log(x, y);
    
    if (x > 5) {
        var y = 5;
        m = x + y;
    } else {
        let z = 10;
        m = z;
    }
    
    x = m;
    console.log(x, y);
}

var x = 10;
foo(3);

console.log(x, y);


// Console output:

// 3 undefined
// 10 undefined
// ReferenceError: y is not defined

foo(5)
function foo(i){
    if(i) {
        let j =20;
    }else {
        var m=2;
    }
    console.log(i+x);
    console.log(m,j);
}
var x =10