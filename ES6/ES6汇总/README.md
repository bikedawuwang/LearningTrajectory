# ES6 汇总

## 1. let 和 const

在开发时默认应该使用const，只要在值需要变化时才使用let，预料之外的变量修改是很多bug的源头

````javascript
// bad
var foo = 'bar';

// good
let foo = 'bar';

// better
const foo = 'bar';

````

## 2.模板字符串

### 1. 模板字符串

需要拼接字符串时，尽量改成使用模板字符串拼接

```javascript
// bad
const foo = 'this is a' + example;

// good
const foo = `this is a ${example}`;
```

### 2. 标签模板

可以借助标签模板优化书写方式：

```javascript
let url = oneLine `www.baidu.com?link=${example}&bar=${bar}`;
console.log(url); // www.baidu.com?link=1&bar=2
```

## 3. 箭头函数

优先使用箭头函数，但是以下几种情况避免使用

### 1. 使用箭头函数定义对象的方法

```javascript
// bad
let foo = {
  value: 1,
  getValue: () => console.log(this.value);
}
foo.getValue() // undefined
```

### 2. 定义原型方法

```javascript
// bad
function Foo() {
  this.value = 1
}
Foo.prototype.getValue = () => console.log(this.value)

let foo = new Foo()
foo.getValue() // undefined
```

### 3. 作为时间的回调函数

```javascript
// bad
const button = document.getElementById('myButton');
button.addEventListener(’check), () => {
  console.log(this === window); // => true
  this.innerHTML = 'Clicked button'
})
```

## Symbol

### 1. 唯一值

```javascript
// bad
// 1. 创建的属性会被 for-in 或 Object.keys() 枚举出来
// 2. 一些库可能在将来会使用同样的方式，这会与你的代码发生冲突
if (element.isMoving) {
  smoothAnimations(element);
}
element.isMoving = true;

// good
if (element.__$jorendorff_animation_library$PLEASE_DO_NOT_USE_THIS_PROPERTY$isMoving__) {
  smoothAnimations(element);
}
element.__$jorendorff_animation_library$PLEASE_DO_NOT_USE_THIS_PROPERTY$isMoving__ = true;

// better
var isMoving = Symbol("isMoving");

...

if (element[isMoving]) {
  smoothAnimations(element);
}
element[isMoving] = true;
```

### 2. 魔术字符串

魔术字符串指的是在代码中多次出现、与代码形成强耦合的某一个具体的字符串或者数值

魔术字符串不利于修改和维护，风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替。

```javascript
// bad
const TYPE_AUDIO = 'AUDIO'
const TYPE_VIDEO = 'VIDEO'
const TYPE_IMAGE = 'IMAGE'

// good
const TYPE_AUDIO = Symbol()
const TYPE_VIDEO = Symbol()
const TYPE_IMAGE = Symbol()

function handleFileResource(resource) {
  switch(resource.type) {
    case TYPE_AUDIO:
      playAudio(resource)
      break
    case TYPE_VIDEO:
      playVideo(resource)
      break
    case TYPE_IMAGE:
      previewImage(resource)
      break
    default:
      throw new Error('Unknown type of resource')
  }
}
```

