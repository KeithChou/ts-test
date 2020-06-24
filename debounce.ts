function debounce (fn: Function, delay: number, immediate: boolean): Function {
    var timer: number = null
    var debounced: Function = function (): void {
        var context: Function = this
        var arr: void[] = []
        var result: void = null
        window.clearTimeout(timer)
        for (var i: number = 0; i < arguments.length; i++) {
            arr.push(arguments[i])
        }
        if (immediate) {
            immediate = false
            result = fn.apply(context, arr)
        } else {
            timer = window.setTimeout(function () {
                fn.apply(context, arr)
            }, delay) 
        }
        return result
    }
    return debounced
}
