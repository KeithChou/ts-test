var arr3 = [1, [2, [3, 4, [5]]]]

function flatten1 (arr: any[]) {
    var res = []
    if (!Array.isArray(arr)) return arr
    arr.forEach(function (item) {
        if (Array.isArray(item)) {
            res = res.concat(flatten1(item))
        } else {
            res.push(item)
        }
    })
    return res
}

console.log(flatten1(arr3));

function flatten2 (arr: any[]) {
    if (!Array.isArray) return arr
    return arr.reduce((prev, next) => {
        return prev.concat(Array.isArray(next) ? flatten2(next) : next)
    }, [])
}

console.log(flatten2(arr3));

