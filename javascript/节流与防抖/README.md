# 节流与防抖

在前端开发中会经常会遇见一些频繁的时间出发，比如： window的resize，scroll。

为了解决频繁出发问题，一般会有两种解决方案

1. debounce
2. throttle

### 防抖

防抖的原理就是，你尽管触发事件，但是我一定在事件触发N秒后才执行，如果你在一个时间出发的N秒内又出发了这个时间，那我就以新的时间的时间为准，n秒后才执行，总之，就是等到你出发玩时间n秒内不在触发时间，我才执行。

 

### 第一版

```javascript
function debounce(func, wait) {
  var timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  }
}
```

如果我们要使用它

```javascript
container.onmousemove = debounce(getUserAction, 1000)
```

现在无论你如何移动，在移动完的1000ms内都不再触发，我才执行事件。



### this

如果我们在 getUserAction 函数中 console.log(this), 在不使用 debounce 函数的时候， this的值为：

```html
<div id="container"></div>
```

但是如果使用我们的 debounce函数，this就会指向window对象！

所以我们需要更正this指向正确的对象。



```javascript
function debounce(func, wait) {
  var timeout;
  return function() {
    var context = this;
    clearTimeout(timeout);
    timeout = setTimeout(function(){
      func.apply(context)
    }, wait)
  }
}
```



### event 对象

JavaScript在时间处理函数中会提供事件对象 event ，如果getUserAction函数如下

```javascript
function getUserAction(e) {
  console.log(e);
  container.innerHtml = count++;
}
```

所以修改如下

```javascript
function debounce(func, wait) {
  var timeout;
  return function() {
    var context = this;
    var arg = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function(){
      func.apply(context, arg)
    }, wait)
  }
}
```

到此为止，我们修复了两个小问题

1. this指向
2. event 对象



### 立即执行

我并不希望非要等到时间停止触发后财智星，我希望立即执行函数，然后等到停止触发N秒后，可以重新触发执行。

所以我们加入一个 immediate 参数判断是否立即执行

```javascript
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this;
    var args = arguments;
    if (timeout) {
      clearTimeout(timeout);
    }
    if(immediate) {
      // 如果已经执行过，不再执行
      var collNow = !timeout;
      timeout = setTimeout(function(){
        timeout = null
      }, wait);
      if (callNow) {
        func.apply(context, args);
      }
    }
    else {
      timeout = setTimeout(function(){
        func.apply(context, args)
      }, wait);
    }
  }
}
```

### 返回值

此时注意一点，就是getUserAction函数可能有返回值，所以我们也要返回函数的执行结果，但是当immediat为false的时候，因为使用了setTimeout，我们将 func.apply(context, args) 的返回值赋给变量，最后在return的时候，值将会一直未 undefined，所以我们只在immediate 为 true的时候返回的函数的执行结果。



```javascript
function debounce(func, wait, immediate) {
  var timeout, result;
  return function() {
    var context = thisl
    var args = arguments;
    
   	if(timeout) {
      clearTimeout(timeout);
    }
    
    if (immediate) {
      // 如果已经执行过，不再执行
      var callNow = !timeout;
      timeout = setTimeout(function(){
        timeout = null;
      }, wait)
      if (callNow) result = func.apply(context, args)
    }
    else {
      timeout = setTimeout(function(){
        func.apply(context, args)
      }, wait);
    }
    return result;
  }
}
```

### 取消

```javascript
function debounce(func, wait, immediate) {

    var timeout, result;

    var debounced = function () {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout;
            timeout = setTimeout(function(){
                timeout = null;
            }, wait)
            if (callNow) result = func.apply(context, args)
        }
        else {
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
        return result;
    };

    debounced.prototype.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
}
```

