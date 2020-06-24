function throttle (fn: Function, delay: number, immediate: boolean): Function {
    var timer: number = null
    var start: number = +new Date()
    return function (): void {
        window.clearTimeout(timer)
        var context: Function = this
        var now: number = +new Date()
        var arr: void[] = []
        var result: void = null
        for (var i: number = 0; i < arguments.length; i++) arr.push(arguments[i])
        // 是否需要立即执行
        if (immediate) {
            // 只执行第一次
            immediate = false
            fn.apply(context, arr)
        } else {
            if (now - start >= delay) {
                start = now
                result = fn.apply(context, arr)
            } else {
                // 函数脱离事件后仍然会执行
                timer = window.setTimeout(function () {
                    fn.apply(context, arr)
                }, delay)
            }
        }
        return result
    }
}