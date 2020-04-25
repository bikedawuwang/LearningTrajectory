# 类型判断

## typeof

我们最常用的莫过于typeof

```javascript
typeof('aaa') // string
```

的写法，但是typeof 是一个运算

```javascript
typeof 'aaa' // string
```

那么我们知道，在es6前，JavaScript 共六中数据类型

undefined、null、boolean、Number、String、Object

然而当我们使用 typeof 对这些数据类型的值进行操作的时候，返回的结果并不是一一对应，分别是

undefined object boolean、number、string、object

Null 和 Object 的类型都反回了 Object

尽管无法一一对应，但是typeof却能检测出函数类型

```javascript
function a() {}
typeof a // function
```

## Object.prototype.toString()

```javascript
console.log(Object.prototype.toString.call(undefined)) // [object Undefined]
console.log(Object.prototype.toString.call(null)) // [object Null]

var date = new Date();
console.log(Object.prototype.toString.call(date)) // [object Date]
```

## Type API

```javascript
var class2type = {}

"Boolean Number String Function Array Date RegExp Object Error".split(" ").map(function(item, index) {
    class2type["[object " + item + "]"] = item.toLowerCase();
})


function type(obj) {
    // 一箭双雕
    if (obj == null) {
        return obj + "";
    }
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[Object.prototype.toString.call(obj)] || "object" :
        typeof obj;
}
```

