// 1. 判断+0和-0
// 2. 非null
// 3. 判断NaN
// 4. 基本数据类型和函数
// 5. 基本数据类型和对象
// 6. 构造函数
// 7. 数组 (包含循环引用)
// 7. 对象 (包含循环引用)

function isFunction (obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object Function]'
}

function eq (a: any, b: any, aStack?: any[], bStack?: any[]): boolean {
    // 判断+0和-0
    if (a === b) return a !== 0 || 1 / a === 1 / b

    // 非null
    if (a === 'null' || b === 'null') return false

    // NaN
    if (a !== a) return b !== b

    // 基本数据类型和非对象(Object | Array)
    var type: string = typeof a
    if (type !== 'function' && type !== 'object' && typeof b !== 'object') return false

    // 处理其它类型
    return deepEq(a, b, aStack, bStack)
}

function deepEq (a: any, b: any, aStack?: any[], bStack?: any): boolean {
    // 基本数据类型和对象
    var className: string = Object.prototype.toString.call(a).slice(8, -1)
    switch (className) {
        case 'Boolean':
        case 'Date':
            return +a === +b
        case 'String':
        case 'RegExp':
            return a + '' === b + ''
        case 'Number':
            if (+a !== +a) return +b !== +b
            return +a === 0 ? 1 / +a === 1 / +b : +a === +b
    }

    var isArray: boolean = className === 'Array'

    if (!isArray) {
        // 排除两个都是函数的情况
        if (typeof a !== 'object' || typeof b !== 'object') return false

        var aCtor: (Function | undefined) = a.constructor 
        var bCtor: (Function | undefined) = b.constructor
        // 不同构造函数下的对象，且构造函数都不是Object，返回false，表示不是同一个对象
        if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) && 'constructor' in a && 'constructor' in b) {
            return false
        }
    }

    // 存放递归的值
    aStack = aStack || []
    bStack = bStack || []

    var length: number = aStack.length

    while (length--) {
        if (aStack[length] === a) {
            return bStack[length] === b
        }
    }

    aStack.push(a)
    bStack.push(b)

    if (isArray) {
        var len: number = a.length
        if (len !== b.length) return false
        while (len--) {
            if (!eq(a[len], b[len], aStack, bStack)) return false
        }
    } else {
        var keys: string[] = Object.keys(a)
        var key: any = null
        var len: number = keys.length
        if (len !== Object.keys(b).length) return false
        while (len--) {
            key = keys[len]
            if (!(b.hasOwnProperty(key) && eq(a[len], b[len], aStack, bStack))) return false
        }
    }

    return true
}

// +0、-0
console.log('+0, -0: ', eq(+0, -0));

console.log('NaN:', eq(NaN, NaN));

console.log('new Number(NaN): ', eq(new Number(NaN), new Number(NaN)));

console.log('new Boolean: ', eq(new Boolean(true), new Boolean(true)));

console.log('new String: ', eq('Curly', new String('Curly')));

console.log('两个数组: ', eq([1], [1]));

console.log('两个对象: ', eq({ value: 1 }, { value: 1 }));

var a, b;

a = { foo: { b: { foo: { c: { foo: null } } } } };
b = { foo: { b: { foo: { c: { foo: null } } } } };
a.foo.b.foo.c.foo = a;
b.foo.b.foo.c.foo = b;

console.log('对象循环拷贝: ', eq(a, b)) 

var e: any[] = [1, null]
var f: any[] = [1, null]
e[1] = e
f[1] = f

console.log('数组循环拷贝:', eq(e, f));


function A () {
    this.name = 'kk'
}
var c = new A()
var d = new A()

console.log('构造函数:', eq(c, d));

var attr = Object.create(null)
attr.name = 'kk'

console.log('Object.create(null): ', eq(attr, { name: 'kk' }));

function B () {
    this.name = 'kk'
}

var a = new A()
var b = new B()

console.log('两个不同的构造函数实例对象:', eq(a, b));


