# JavaScript 深入 call 和 apply 以及 bind 的模拟实现

call 方法在使用一个指定this值和若干个指定的参数值的前提喜爱调用某个函数

举个栗子:

```javascript
    var foo = {
        value: 1
    };

    function bar() {
        console.log(this.value);
    }

    bar.call(foo); // 1
```

注意两点：

- 1. call 改变了 this 的指向， 指向到了 foo
- 2. bar 函数执行了 

## 模拟实现第一步

试想着当调用call的时候，把foo对象改造成如下 

```javascript
var foo = {
	value: 1,
	bar: function() {
		console.log(this.value);
	}	
}

foo.bar();
```

这个时候，this 就指向了 foo。

但是这却给 foo 对象本身添加了一个属性。

所以我们模拟的步骤可以分为：

1. 将函数设为对象的属性
2. 执行该函数
3. 删除该函数

```JavaScript
    // 第一步
    foo.fn = bar;
    // 第二步
    foo.fn();
    // 第三步
    delete foo.fn
```

fn是个对象名，因为最后都要删除它，所以并不用在意它叫什么名字

根据这个思路，我们可以继续实现我们的call函数

```javascript
    Function.prototype.call2 = function (context) {
        context.fn = this;
        context.fn();
        delete context.fn;
    }

    var foo = {
        value: 1
    };

    function bar() {
        console.log(this.value);
    };

    bar.call2(foo);
```

## 模拟实现第二步

一开始讲到，call 函数还能给定参数执行函数，举个栗子：

```javascript
var foo = {
	value: 1
};

function bar(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value);
};

bar.call(foo, 'jack', 18);
```

注：传入的参数并不确定，所以需要改写call2方法

我们可以从 Arguments 对象中取值，取出第二个到最后一个参数然后放到一个数组中

```javascript
var arg = [];
for (var i = 0; len = arguments.length; i < len; i++) {
  args.push('arguments[' + i + ']' );
}
// 执行后 args为 [foo, 'jack', 18]
```

已经取得参数，我们可以继续完成第二版

```javascript
Function.prototype.call2 = function(context) {
  context.fn = this;
  var arg = [];
  for (var i = 0; i < arguments.length; i++) {
    args.push('argiments[' + i + ']');
  }
  eval('context.fn(' + args +')');
  delete context.fn;
}

var foo = {
  value: 1
};

function bar (name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value);
};

bar.call2(foo, 'jack', 18);
```



## 模拟实现第三步

还有两个点需要注意

1. this的参数可以传null，当为null的时候，指向window
2. 函数是可以有返回值的

我们改造一下第二版函数解决这两个问题

```JavaScript
Function.prototype.call2 = function(context) {
  var context = context || window;
  context.fn = this;
  var args = [];
  for (var i = 0; i < arguments.length; i++) {
    args.push('arguments[' + i ']');
  }
   // var result = context.fn(...arr); 或者使用 ES6
  var reuslt = eval('context.fn(' + args +')');
  delete context.fn;
  return result
}

var value = 2;
var foo = {
  value:1
};

function bar(name, age) {
  console.log(value);
  return {
    value: this.value,
    name,
    age
  }
};

bar.call(null);

console.log(bar.call2(obj, 'jack', 18));
```

到这里就实现了一个call方法 👍



## 实现一个 apply

根据 call 的实现, 同理我们可以很轻松的实现一个 apply

```javascript
Fucntion.prototype.apply2 = function(context, arr) {
  var context = Object(context) || window;
  context.fn = this;
  var result;
  if (!arr) {
    result = context.fn();
  }
  else {
    var arg = [];
    for (var i = 0; i < arr.length; i++) {
      args.push(arr[i]);
    }
    
    result = context.fn(...args);
    // result = eval('context.fn(' + args + ')');
  }
  delete context.fn;
  return result;
}

var foo = {
  value: 1
}

function bar(a, b, c) {
  return {
    value: this.value,
    a,
    b,
    c
  }
}
var values = [1, 2, 3];
console.log(bar.apply2(foo, values))
```



## 实现一个bind

一句话介绍bind：

```html
bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN )
```

由此我们可以得出bind函数的两个特点：

1. 返回一个函数
2. 可以传入参数

### 第一步

```javascript
Function.prototype.bind2 = function(context) {
  var self = this;
  return function() {
    self.apply(context);
  }
}
```

### 第二步

```javascript
Function.prototype.bind2 = function(context) {
  var self = this;
  // 获取bind2函数从第二个参数到最后一个参数
  var agrs = Array.prototype.slice.call(arguments, 1);
  
  return function() {
    // 这个时候的arguments是指bind返回的函数传入的参数
    var bindArgs = Array.prototype.slice.cal(arguments);
    self.apply(context, args.concat(bindArgs));
  }
}
```



实现

```javascript
Function.prototype.bind2 = function(context) {
  if (typeof this !== 'function') {
    throw new Error('Function.prototype.bind - what iss trying to be bound is not callback');
  }
  
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  var fNOP = function () {};
  
  var fbound = function () {
   	self.apply(this instanceof self ? this : context, args.concat(Array.prototype.slice.call(arguments)));
    fNOP.prototype = this.prototype;
    fbound.prototype = new fNOP();
    
    return fbound;
  }
}
```

