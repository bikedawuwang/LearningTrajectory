# 从原型到原型链

## 构造函数创建对象

我们使用构造函数创建一个对象

```javascript
function Person() {
  
}
var person = new Person();
person.name = 'kevin'
console.log(person.name) // kevin
```

Person 是一个构造函数，person则是new创建的一个实例对象

### prototype

每个函数都存在一个prototype属性，比如

```javascript
function Person(){
  
}
person.prototype.name = 'Kevin';
var person1 = new Person();
var person2 = new Person();

console.log(person1.name); // Kevin
console.log(person2.name); // Kevin
```

函数的 prototype 属性指向了一个对象，这个对象正是调用该构造函数而创建的实例的原型，也就是person1 和 person2 的原型。

### __proto__

这是每一个JavaScript对象（除了null）都具有的属性，叫 __proto__，这个属性会指向该对象的原型。

```javascript 
function Person(){
  
}
var person = new Person();
console.log(person.__proto__ === Person.prototype) // true
```

### constructor

每个原型都有一个constructor属性指向关联的构造函数。

```javascript
function Person() {
  
}
console.log(Person === Person.prototype.constructor); //true
```



### 实例与原型

当读取实例的属性时候，如果找不到，就会查找与对象关联的原型中的属性，如果还查不到，就去找原型的原型，一直到最顶层为止

```javascript 
function Person() {
  
}
Person.prototype.name = 'Kevin';

var person = new Person();
console.log(person.name); // Kevin

delete person.name;
console.log(person.name) // Kevin
```

当删除了person的name属性时，读取person.name ， 从person对象中找不到name就会从person的原型中，也就是person.__proto__ ,也就是person.prototype 查找。

### 原型的原型

原型是一个对象，我们可以用最原始的方式创建它

```javascript
var obj = new Object();
obj.name = 'Kevin';
console.log(obj.name) // Kevin
```

原型对象就是通过 Object 构造函数生成的，结合之前内容，实例的 proto 指向构造函数的 prototype

### 原型链

Object.prototype 的原型为 null 所以 Object 不存在原型。 所以查找属性的时候查到 Object.prototype 就可以停止查找了。