# 数据扁平化

数据扁平化就是将一个嵌套多层的数组转换为只有一层的数组。

假设有个名为 flatten 的函数可以做到这一点。

```javascript
var arr = [1, [2, [3, 4]]];
console.log(flatten(arr)) // [1, 2, 3, 4]
```

知道效果什么样了，我们就可以进一步完成这个函数。

## 递归

最简单也是最普遍的方法

```javascript
function flatten(arr) {
    let result = [];
    for (let i = 0, len = arr.length; i < len; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flatten(arr[i]));
        }
        else {
            result.push(arr[i]);
        }
    }
    return result;
}
```



