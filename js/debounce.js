function debounce(fn, delay, immediate) {
    var timer = null;
    var debounced = function () {
        var context = this;
        var arr = [];
        var result = null;
        window.clearTimeout(timer);
        for (var i = 0; i < arguments.length; i++) {
            arr.push(arguments[i]);
        }
        if (immediate) {
            immediate = false;
            result = fn.apply(context, arr);
        }
        else {
            timer = window.setTimeout(function () {
                fn.apply(context, arr);
            }, delay);
        }
        return result;
    };
    return debounced;
}
