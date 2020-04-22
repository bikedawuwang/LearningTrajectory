# 闭包

闭包是指那些能够访问自由变量的函数

#### 自由变量

自由变量是指在函数中使用，  但既不是函数参数，也不是函数局部变量的变量。

所以我们得出结论

闭包 = 函数 + 函数能够访问的自由变量

举个栗子

```javascript
var a = 1;
function foo() {
  console.log(a);
}

foo() // 1
```

foo函数可以访问变量a，但是变量a既不是参数也不是局部变量，所以变量a为自由变量，那么foo + 自由变量。foo本身其实就是闭包。

技术上来讲 JavaScript所有函数都是闭包。

但是实践上却并不相同 ECMAScript中，闭包指的是：

1. 从理论角度：所有的函数。因为它们都在创建的时候就将上层上下文的数据保存起来了。哪怕是简单的全局变量也是如此，因为函数中访问全局变量就相当于是在访问自由变量，这个时候使用最外层的作用域。
2. 从实践角度：以下函数才算是闭包：
   1. 即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
   2. 在代码中引用了自由变量



#### 题目

```javascript
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = function() {
    console.log(i);
  }
}

data[0](); // 3
data[1](); // 3
data[2](); // 3
```

因为全局上下文中  i = 3 所以三次调用返回的结果均为3

```javascript
globalContext = {
    VO: {
        data: [...],
        i: 3
    }
}

data[0]Context = {
    Scope: [AO, globalContext.VO]
}
```

当我们修改为闭包时

```javascript
var data  = [];
for (var i = 0; i < 3; i++) {
  data[i] = (function(i){
    return function(){
      	 console.log(i);
    )
  })(i)
}
             
data[0](); // 0
data[1](); // 1
data[2](); // 2
```

执行到 data[0] 时，此时全局上下文VO为

```javascript
globalContext = {
    VO: {
        data: [...],
        i: 3
    }
}
```

当执行data[0]函数时，作用域链发生了改变

```javascript
data[0]Context = {
    Scope: [AO, 匿名函数Context.AO globalContext.VO]
}
```

匿名函数的上下文为

```javascript
匿名函数Context = {
    AO: {
        arguments: {
            0: 0,
            length: 1
        },
        i: 0
    }
}
```

data[0]Context 的 AO 并没有 i 值，所以会沿着作用域链从匿名函数 Context.AO 中查找，这时候就会找 i 为 0，找到了就不会往 globalContext.VO 中查找了，即使 globalContext.VO 也有 i 的值(值为3)，所以打印的结果就是0。

