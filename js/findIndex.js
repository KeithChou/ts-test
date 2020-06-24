function findIndex(arr, fn, context) {
    for (var i = 0; i < arr.length; i++) {
        if (fn.call(context, arr[i], i, arr)) {
            return i;
        }
    }
    return -1;
}
console.log(findIndex([1, 2, 3, 45], function (res) {
    return res > 2;
}));
function findLastIndex(arr, fn, context) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (fn.call(context, arr[i], i, arr)) {
            return i;
        }
    }
    return -1;
}
console.log(findLastIndex([1, 2, 3, 45], function (item) {
    return item > 2;
}));
function createIndexFinder(dir) {
    return function (arr, fn, context) {
        var length = arr.length;
        var index = dir > 0 ? 0 : length - 1;
        for (; index >= 0 && index < length; index += dir) {
            if (fn.call(context, arr[index], index, arr))
                return index;
        }
        return -1;
    };
}
console.log(createIndexFinder(1)([1, 2, 3, 4], function (item) {
    return item > 1;
}));
console.log(createIndexFinder(-1)([1, 2, 3, 4], function (item) {
    return item > 1;
}));
// 二分搜索
// 已排序
function sortedIndex(arr, param, iteratee, context) {
    var low = 0;
    var high = arr.length;
    iteratee = (function (fn, context) {
        return fn ? function () {
            var arr = [];
            for (var i = 0; i < arguments.length; i++)
                arr.push(arguments[i]);
            return fn.apply(context, arr);
        } : null;
    }(iteratee, context));
    while (low < high) {
        var mid = Math.floor((low + high) / 2);
        if (iteratee) {
            if (iteratee(arr[mid]) < iteratee(param)) {
                low = mid + 1;
            }
            else {
                high = mid;
            }
        }
        else {
            if (arr[mid] < param) {
                low = mid + 1;
            }
            else {
                high = mid;
            }
        }
    }
    return high;
}
console.log(sortedIndex([1, 19, 22, 48, 68, 82], 20));
console.log(sortedIndex([{ age: 19 }, { age: 30 }], { age: 1 }, function (item) {
    return item.age;
}));
