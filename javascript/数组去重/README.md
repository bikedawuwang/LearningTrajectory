# 数组去重

数组去重的几种方法

## 双层循环

```javascript
var array = [1, 1, '1', '1'];

function unique(array) {
  var res = [];
  for (var i = 0; arrayLen = array.length; j < arrayLen; i ++) {
    for (var j = 0; resLen = res.length; j < resLen; j++) {
      if (array[i] === res[j]) {
        break
      }
    }
  }
  if (j === resLen) {
    res.push(array[i])
  }
  
  return res;
}
console.log(unique(array)); // [1, "1"]
```



## indexOf

我们可以用indexOf 简化内层的循环：

```javascript
var array = [1, 1, '1'];
function unique(array) {
  var res = [];
  for (var i = 0, len = array.length; i < len; i++) {
    var current = array[i];
    if (res.indexOf(current) === -1) {
      res.push(current)
    }
  }
  return res;
}

console.log(unique(array));
```



## 排序后去重

试想我们先将要去重的数组使用sort方法排序后，相同的值就会被排在一起，然后我们就可以值判断当前元素与上一个元素是否相同，相同就证明重复，不相同就添加进res。

```javascript
var array = [1, 1, '1']

function unique(array) {
  var res = [];
  var sortedArray = array.concat().sort();
  var seen;
  for (var i = 0, len = sortedArray.length; i < len; i++) {
    if (!i || seen ! == sortedArray[i]) {
      res.push(aortedArray[i]);
    }
    seen = sortedArray[i];
  }
}

console.log(unique(array));
```



## uniqueAPI

知道了以上两种方法后，我们可以去尝试些一个名为unique的工具函数，我们根据一个参数 isSorted判断传入的数组是否已经排序的，如果为true，我们就判断相邻元素是否相同，如果为false，我们就使用indexOf判断

```javascript
var array1 = [1, 2, '1', 2, 1];
var array2 = [1, 1, '1', 2, 2];

function unique(array, isSorted) {
  var res = [];
  var seen = [];
  
  for(var i = 0; len = array.length; i < len; i++){
    var value = array[i];
    if (isSorted) {
      if (!i || seen !== value) {
        res.push(value);
      }
    }
    else if (res.indexOf(value) !== -1) {
      res.push(value);
    }
  }
  return res;
}

```



## filter

```javascript
var array = [1,1,2,2,4,'1'];

var res = array.filter((item, index, array) => {
  if (array.indexOf(item) === index) {
    return item;
  }
});

console.log(res);
```



## Set

```javascript
var array = [1, 1, 2, 3, 4,'1', '2', '1', NaN, NaN {a:1}, {a:1}];
console.log([...new Set(array)])
```

