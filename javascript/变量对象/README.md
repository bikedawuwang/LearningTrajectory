# 变量对象

## 变量对象

变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明。



## 全局上下文

全局对象：

1. 可以通过this引用，在客户端JavaScript中，全局对象就是window对象。

   ```javascript
   console.log(this)
   ```

2. 全局对象是有 Object 构造函数实例化的一个对象。

   ```javascript
   console.log(this instanceof Object);
   ```

3. 预定义了一堆函数和属性。

   ```JavaScript
   console.log(Math.random());
   console.log(this.Math.random());
   ```

4. 作为全局变量的宿主

   ```javascript
   var a = 1;
   console.log(this.a) // 1
   ```

5. 客户端中，全局对象有window属性指向自身。

   ```javascript
   var a = 1;
   console.log(window.a) // 1
   ```

   全局上下文中的变量对象就是全局对象。



## 函数上下文

在函数上下文中，我们用活动对象(activation object, AO)来表示变量对象。

活动对象和变量对象其实是一个东西，只是变量对象是规范上的或者说是引擎实现上的，不可在 JavaScript 环境中访问，只有到当进入一个执行上下文中，这个执行上下文的变量对象才会被激活，所以才叫 activation object 呐，而只有被激活的变量对象，也就是活动对象上的各种属性才能被访问。

活动对象是在进入函数上下文时刻被创建的，它通过函数的 arguments 属性初始化。arguments 属性值是 Arguments 对象。

### 进入执行上下文

当进入执行上下文时，这时候还没有执行代码。

变量对象会包括：

  		1. 函数的所有形参（如果是函数上下文）
       - 由名称和对应值组成的一个变量对象的属性被创建
       - 没有实参，属性值为 undefined 
		2. 函数声明
     - 由名称和对应值（函数对象（function-object））组成一个变量对象的属性被创建
     - 如果变量对象已经存在相同名称的属性，则完全替换这个属性
		3. 变量声明
     - 由名称和对应值（undefined）组成一个变量对象的属性被创建
     - 如果变量名称跟已经生命的像是参数或者函数相同，则变量声明不会感染已经存在的这类属性。

举个栗子

```javascript
function foo(a) {
  var b = 2;
  function c(){}
  var d = function(){}
  b = 3;
}

foo(1)
```

在进如执行上下文后，这时候的AO是：

```javascript
AO = {
  arguments: {
    0:1,
    length: 1
  },
  a: 1,
  b: undefined,
  c: reference to function c(){},
  d: undefined
}
```

### 代码执行

在代码执行阶段，会顺序执行代码，根据代码，修改变量对象的值。

```javascript
AO = {
  arguments: {
    0: 1,
    length: 1
  },
  a: 1,
  b: 3,
  c: reference to function c(){},
  d: reference to FunctionExpression "d"
}
```

1. 全局上下文的变量对象初始化是全局对象
2. 函数上下文的变量对象初始化只包括Arguments 对象
3. 在进如执行上下文时会给变量对象添加形参、函数声明、变量声明等初始的属性值
4. 在代码执行阶段，会再次修改变量对象的属性值

## 作用域链

由多个执行上下文变量构成的链表叫做作用域链。

