

# Let 与 Const

## 块级作用域的出现

通过 var 生成的变量存在变量提升特性

```javascript
if (condition) {
  var value = 1;
}
console.log(value);
```

也许你会认为只有 condition 为 true 的时候才创建 value 其实这段代码等价于

```javascript
var value;
if (condition) {
  value = 1
}
console.log(value)
```

也就是说当 condition 为 false 的时候 value 其实也已经被定义了

如果 condition 为 true 会输出 1  为 false 时 输出 undefined

除此之外，在for循环中

```javascript
for (var i = 0; i < 10; i++) {
  ...
}
console.log(i);
```

实际上，for 循环的 i 被定义在了当前上下文中

```javascript
var i；
for (i = 0; i < 10; i++) {...}
```

所以为了加强对变量生命周期的控制，ECMAScrip 6 引入了 块级作用域

块级作用域存在于：

- 函数内部
- 块中(字符 { 和 } 之间的区域)



## let 和 const

块级声明用于声明在指定块的作用域之外无法访问的变量。

let 和 const 都是会计声明的一种

### 1.不会被提升

```javascript
if (false) {
  let value = 1;
}
console.log(value); // Uncaught ReferenceError: value is not defined
```

### 2. 重复声明报错

```javascript
var value = 1;
let value = 2; // Uncaught SyntaxError: Identifier 'value' has already been declared
```

### 3.不绑定全局作用域

var 会绑定全局作用域

```javascript
var value = 1;
console.log(window.value); // 1
```

let 和 const 不会绑定全局作用域

```javascript
let value = 1;
console.log(window.value); // undefined
```

## 临时死区

临时死区 （Temporal Dead Zone） 简称 TDZ

let 和 const 不会被提升到作用域顶部，如果在声明之前访问这些变量，会导致报错： 

```javascript
console.log(typeof value)
let value = 1;
```

这是因为 JavaScript 引擎在扫描代码发现变量声明时，要么将它们提升到作用域顶部(遇到 var 声明)，要么将声明放在 TDZ 中(遇到 let 和 const 声明)。访问 TDZ 中的变量会触发运行时错误。只有执行过变量声明语句后，变量才会从 TDZ 中移出，然后方可访问。

```javascript
var value = 'global';

(function(){
  console.log(value);
  let value = 'local'
})())

{
  console.log(value)
  const value = 'local';
}
```

  

