# 深拷贝与浅拷贝

## 数组的浅拷贝

如果是数组，我们可以通过slice、concat返回一个新数组的形式实现深拷贝。

比如

```javascript
var arr = ['old', 1, true, null, undefined];

var new_arr = arr.concat();

new_arr[0] = 'new';

console.log(arr) // ["old", 1, true, null, undefined]
console.log(new_arr) // ["new", 1, true, null, undefined]
```

slice 可以

```javascript
var new_arr = arr.slice();
```

但是如果是嵌套模式，可以通过以下方式完成深拷贝

```javascript
var arr = [{old: 'old'}, ['old']];

var new_arr = arr.concat();

arr[0].old = 'new';
arr[1][0] = 'new';

console.log(arr) // [{old: 'new'}, ['new']]
console.log(new_arr) // [{old: 'new'}, ['new']]
```

## 数组的深拷贝

最常见的方式我们可以通过JSON的方法实现

```javascript
var arr = ['old', 1, true, ['old1', 'old2'], {old: 1}]

var new_arr = JSON.parse( JSON.stringify(arr) );

console.log(new_arr);
```

虽然是一个简单的办法，但是存在一个问题就是无法拷贝函数。

## 浅拷贝的实现

以上的所有方法都属于技巧类，只是运用了JavaScript API的一些特性。

我们也可以自己动手实现一个浅拷贝

```javascript
var shallowCopy = function(obj) {
  // 只拷贝对象
  if (typeof !== 'object') return;
  var newObj = obj instanceof Array ? [] : {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = ojb[key];
    }
  }
  return newObj;
}
```



## 深拷贝

通过递归的方式逐层拷贝

```javascript
var deepCopy = function(obj) {
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj;
}
```

