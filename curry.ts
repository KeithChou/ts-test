// 固定参数
function curry (fn: Function, outer?: any[], context?: any) {
    outer = outer || []
    context = context || window
    return function () {
        var inner: any[] = []
        for (var i: number = 0; i < arguments.length; i++) inner.push(arguments[i])
        outer = outer.concat(inner)
        if (outer.length < fn.length) {
            return curry.call(context, fn, outer)
        } else {
            return fn.apply(context, outer)
        }
    }
}

var a = curry(function (a, b, c) {
    return a + b + c
})

// console.log(a(1, 2, 3));
// console.log(a(1)(2, 3));
// console.log(a(1)(2)(3));
console.log(a(1, 2)(3));

// 固定参数es6
const curryEs6 = (fn: Function, ...rest: any[]): Function => {
    return (...args) => {
        rest = rest.concat(args)
        if (rest.length < fn.length) {
            return curry.call(this, fn, rest)
        } else {
            return fn.apply(this, rest)
        }
    }
}

var b = curry(function (a, b, c) {
    return a + b + c
})

console.log(b(1, 2)(3));

// 不固定参数
const add = (...param: number[]): Function => {
    const addSum = param.reduce((prev, next) => prev + next)
    const fn = (...args: number[]) => {
        const sum = args.reduce((prev, next) => prev + next)
        return add(addSum + sum)
    }
    fn.valueOf = () => addSum
    return fn
}

console.log(+add(1)(1, 1, 1)(1)) // 5
console.log(+add(1)(2)(3, 4)) // 10
