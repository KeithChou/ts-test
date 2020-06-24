var arr = [1, 2, 3, 4, 5];
function max(arr) {
    return arr.reduce(function (prev, next) {
        return Math.max(prev, next);
    });
}
console.log(max(arr));
console.log(Math.max.apply(Math, arr));
