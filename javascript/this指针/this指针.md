# this指针

## 什么是this指针

在JavaScript中，创建函数会自动生成两个隐式参数 `this` 和 `arguments` 只能在函数内部使用。

this指针指向该函数调用隐式关联的一个对象，该对象被称为 `函数上下文`

`this` 是 JavaScript 的一个关键字， 随着函数使用场景不同， this 的指向也不同。

`this` 永远指向其所在函数的真实调用者（谁调用的就指向谁）如果没有所有者时，指向全局对象window。

 ECMAScript 规范中

 `
    this 关键字执行为当前执行环境的 ThisBinding。
 `

 MDN 中 

 `
    In most cases, the value of this is determined by how a function is called.
    在绝大多数情况下，函数的调用方式决定了this的值。
 `



## 调用位置

首先需要了解调用位置，调用位置就是函数在代码中被调用的位置，而不是声明位置。

通过分析调用栈，可以找到调用位置

```javascript
    function baz(){
        console.log("baz");
        bar();
    }
    function bar(){
        console.log("bar");
        foo();
    }
    function foo(){
        console.log("foo");
    }
    baz();
```



当我们调用baz() 时， 它会以此调用 baz() -> bar() -> foo()

对于foo() 调用位置为 bar() ，对于 bar() 调用位置为 baz()，而对于baz() 调用位置是全局作用域中。

