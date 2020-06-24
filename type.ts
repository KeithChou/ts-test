var number = 1;          // [object Number]
var string = '123';      // [object String]
var boolean = true;      // [object Boolean]
var und = undefined;     // [object Undefined]
var nul = null;          // [object Null]
var obj = {a: 1}         // [object Object]
var array = [1, 2, 3];   // [object Array]
var date = new Date();   // [object Date]
var error = new Error(); // [object Error]
var reg = /a/g;          // [object RegExp]
var func = function a(){}; // [object Function]

const type = (obj?: any) => {
    if (typeof obj !== 'object' || typeof obj === 'function') {
        return typeof obj
    } else {
        return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() 
    }
}

console.log(type(func));

