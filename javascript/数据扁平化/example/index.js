
// 递归
// function flatten(arr) {
//     let result = [];
//     for (let i = 0, len = arr.length; i < len; i++) {
//         if (Array.isArray(arr[i])) {
//             result = result.concat(flatten(arr[i]));
//         }
//         else {
//             result.push(arr[i]);
//         }
//     }

//     return result;
// }

// toString

function flatten(arr) {
    return arr.toString().split(',').map(item => {
        return +item;
    })
}

var arr = [1, [2, [3, 4]]];
console.log(flatten(arr)) // [1, 2, 3, 4]
