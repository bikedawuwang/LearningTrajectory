# 词法作用域与动态作用域

### 作用域

作用域是指程序源代码中定义变量的区域。

作用域规定了如何呢查找变量，确定了当前执行代码对变量的访问权限。

JavaScript 采用词法作用域，也就是静态作用域

### 静态作用域

因为JavaScript采用的事此法作用域，函数的作用域在函数定义的时候经已经决定了。

而动态作用域则是在函数调用的时候才决定的。

举个栗子

```javascript 
var value = 1;
function foo() {
	console.log(value)
}

function bar() {
  var value = 2;
  console.log(value);
}

bar() // 1
```

执行foo函数，先从foo函数内部查找是否有局部变量value，如果没有则查找上一层代码，就根据上面一层的代码，也就是value等于1。

假设JavaScript采用动态作用域，执行foo函数，从foo函数内部查找是否有局部变量value，如果没有就从调用函数的作用域，也就是bar函数内部查找value变量，所以输出2。

### 动态作用域

bash 就是动态作用域，所以输出2

```JavaScript
value=1
function foo () {
    echo $value;
}
function bar () {
    local value=2;
    foo;
}
bar
```