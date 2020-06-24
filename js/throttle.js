function throttle(fn, delay, immediate) {
    var timer = null;
    var start = +new Date();
    return function () {
        window.clearTimeout(timer);
        var context = this;
        var now = +new Date();
        var arr = [];
        var result = null;
        for (var i = 0; i < arguments.length; i++)
            arr.push(arguments[i]);
        // 是否需要立即执行
        if (immediate) {
            // 只执行第一次
            immediate = false;
            fn.apply(context, arr);
        }
        else {
            if (now - start >= delay) {
                start = now;
                result = fn.apply(context, arr);
            }
            else {
                // 函数脱离事件后仍然会执行
                timer = window.setTimeout(function () {
                    fn.apply(context, arr);
                }, delay);
            }
        }
        return result;
    };
}
