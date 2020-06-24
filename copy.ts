function deepCopy (source: object, stack?: any[]): object {
    if (!source) return source
    var root: object = {}
    if (Array.isArray(source)) root = []
    var keys: string[] = Object.keys(source)
    var len: number = keys.length
    var key: any = null

    // 存储递归的值
    // 如果发现循环引用，则直接return，避免递归爆栈
    stack = stack || []
    var stackLen: number = stack.length

    while (stackLen--) {
        if (stack[stackLen] === source) {
            return source
        }
    }
    stack.push(source)
    
    while (len--) {
        key = keys[len]
        if (typeof source[key] === 'object') {
            root[key] = deepCopy(source[key], stack)
        } else {
            root[key] = source[key]
        }
    }

    stack.pop()
    return root
}

var copy1 = {a: 1, b: { c: 2 }}
// var copy2 = deepCopy(copy1)

copy1.b.c = 3
// console.log(copy1);
// console.log(copy2);

var copy3 = {}
copy3.a = copy3
// var copy4 = deepCopy(copy3)
// console.log(copy4);

interface loopListInterface {
    parent: object
    key: undefined | string
    data: object
}


function cloneLoop (source: object): object {
    var root: object = {}

    // 存储遍历的source值，避免循环引用导致爆栈
    var uniqueList: any[] = []

    var loopList = [{
        parent: root,
        key: undefined,
        data: source
    }]

    while (loopList.length) {
        var node: loopListInterface = loopList.pop()
        var parent = node.parent
        var key = node.key
        var data = node.data

        var res = parent
        if (typeof key !== 'undefined') {
            res = parent[key] = {}
        }

        var uniqueData = find(uniqueList, data)

        if (uniqueData) {
            parent[key] = uniqueData.target
            break
        }
        
        uniqueList.push({
            source: data,
            target: res
        })
        
        var keys: string[] = Object.keys(data)
        var len: number = keys.length
        var key: string = null
        while (len--) {
            key = keys[len]
            if (typeof data[key] === 'object') {
                loopList.push({
                    parent: res,
                    key,
                    data: data[key]
                })
            } else {
                res[key] = data[key]
            }
        }
    }
    return root
}

function find (arr: any[], item: object) {
    var len: number = arr.length
    while (len--) {
        if (arr[len].source === item) {
            return arr[len]
        }
    }
}

var loop1 = {a: 1, b: {c: 2}}
// var loop2 = cloneLoop(loop1)
// loop1.b.c = 3
// console.log(loop2);

var loop3: any[] = [1, null]
loop3[1] = loop3
var loop4 = cloneLoop(loop3)
console.log(loop4);



