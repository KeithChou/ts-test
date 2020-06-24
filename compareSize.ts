var arr: any[] = [1, 2, 3, 4, 5]

function max (arr: number[]) {
    return arr.reduce((prev, next) => {
        return Math.max(prev, next)
    })
} 

console.log(max(arr));

console.log(Math.max(...arr));
