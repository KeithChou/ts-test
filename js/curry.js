var _this = this;
// 固定参数
function curry(fn, outer, context) {
    outer = outer || [];
    context = context || window;
    return function () {
        var inner = [];
        for (var i = 0; i < arguments.length; i++)
            inner.push(arguments[i]);
        outer = outer.concat(inner);
        if (outer.length < fn.length) {
            return curry.call(context, fn, outer);
        }
        else {
            return fn.apply(context, outer);
        }
    };
}
var a = curry(function (a, b, c) {
    return a + b + c;
});
// console.log(a(1, 2, 3));
// console.log(a(1)(2, 3));
// console.log(a(1)(2)(3));
console.log(a(1, 2)(3));
// 固定参数es6
var curryEs6 = function (fn) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        rest = rest.concat(args);
        if (rest.length < fn.length) {
            return curry.call(_this, fn, rest);
        }
        else {
            return fn.apply(_this, rest);
        }
    };
};
var b = curry(function (a, b, c) {
    return a + b + c;
});
console.log(b(1, 2)(3));
// 不固定参数
var add = function () {
    var param = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        param[_i] = arguments[_i];
    }
    var addSum = param.reduce(function (prev, next) { return prev + next; });
    var fn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var sum = args.reduce(function (prev, next) { return prev + next; });
        return add(addSum + sum);
    };
    fn.valueOf = function () { return addSum; };
    return fn;
};
console.log(+add(1)(1, 1, 1)(1)); // 5
console.log(+add(1)(2)(3, 4)); // 10
