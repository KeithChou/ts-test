var arr = [1, 1, 2, '2', '1', '1', 'a', 'A'];
function unique1(arr) {
    var res = [];
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < res.length; j++) {
            // 如果外层和内层一样，表示是重复的，那么就退出循环
            if (arr[i] === res[j])
                break;
        }
        // 如果没有重复，表明是新的元素
        // 则push到res数组中
        if (j === res.length)
            res.push(arr[i]);
    }
    return res;
}
console.log('双层循环: ', unique1(arr));
function unique2(arr) {
    var res = [];
    for (var i = 0; i < arr.length; i++) {
        if (!~res.indexOf(arr[i])) {
            res.push(arr[i]);
        }
    }
    return res;
}
console.log('indexOf去重:', unique2(arr));
function unique4(arr, isSorted) {
    if (isSorted === void 0) { isSorted = false; }
    var res = [];
    var seen;
    for (var i = 0; i < arr.length; i++) {
        var value = arr[i];
        if (isSorted) {
            if (!i || seen !== value) {
                res.push(value);
            }
            seen = value;
        }
        else {
            if (!~res.indexOf(value)) {
                res.push(value);
            }
        }
    }
    return res;
}
console.log('判断是否排序，选择对应方式去重:', unique4(arr));
var arr1 = ["A", "B", "a", "b"];
function unique5(arr, isSorted, iteratee) {
    var res = [];
    var seen = [];
    for (var i = 0; i < arr.length; i++) {
        // 数组元素
        var value = arr[i];
        // 回调返回值
        var computed = iteratee ? iteratee(value, i, arr) : value;
        if (isSorted) {
            if (!i || seen !== computed) {
                res.push(value);
            }
            seen = computed;
        }
        else if (iteratee) {
            if (!~seen.indexOf(computed)) {
                seen.push(computed);
                res.push(value);
            }
        }
        else if (!~res.indexOf(value)) {
            res.push(value);
        }
    }
    return res;
}
console.log('回调方式去重:', unique5(arr1, false, function (item) {
    return typeof item === 'string' ? item.toLowerCase() : item;
}));
function unique6(arr) {
    return arr.filter(function (item, index, array) {
        return array.indexOf(item) === index;
    });
}
console.log('filter函数去重:', unique6(arr));
function unique7(arr) {
    return arr.slice().sort().filter(function (item, index, array) {
        return !index || item !== array[index - 1];
    });
}
console.log('filter函数排序后去重:', unique7(arr));
function unique8(arr) {
    var obj = {};
    return arr.filter(function (item) {
        var key = typeof item + JSON.stringify(item);
        return obj.hasOwnProperty(key) ? false : obj[key] = true;
    });
}
var arr2 = [1, undefined, null, NaN, { value: 1 }, { value: 2 }, { value: 1 }];
console.log('键值对去重:', unique8(arr2));
