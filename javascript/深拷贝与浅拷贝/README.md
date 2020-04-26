# 深拷贝与浅拷贝

如果是数组，我们可以通过slice、concat返回一个新数组的形式实现深拷贝。

比如

```javascript
var arr = ['old', 1, true, null, undefined];

var new_arr = arr.concat();

new_arr[0] = 'new';

console.log(arr) // ["old", 1, true, null, undefined]
console.log(new_arr) // ["new", 1, true, null, undefined]
```

