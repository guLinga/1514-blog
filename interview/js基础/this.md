## this

### 结论
1. 对于直接调用的函数，无论在哪里，this指向都是window。
2. 对于obj.foo()，谁调用了函数，谁就是this。
3. 对于new，this永远绑定在函数上，不会被任何方式改变。
4. 箭头函数中没有this，箭头函数中的this指向是父元素的this指向。
5. 对于call、bind、apply这些改变this指向的API，this指向取决于第一个API传入的第一个参数，如果第一个参数为空，那么就是window。
6. 对于bind来说，不论调用多少次bind，this指向永远是第一个bind的this指向。
7. 定时器和延时器中的this指向window，严格模式下是undefined。

### 对于直接调用的函数，无论在哪里，this指向都是window
```js
const obj = {
  fn: function(){
    console.log(this);//window
  }
}
const test = obj.fn;
test();
```

### 对于obj.foo()，谁调用了函数，谁就是this。
```js
const obj = {
  fn: function(){
    console.log(this);//{fn: f}
  }
}
obj.fn();
```

### 对于new，this永远绑定在函数上，不会被任何方式改变。
```js
function Fn(){
  console.log(this);//Fn {}
}
const fn = new Fn();
```

### 箭头函数中没有this，箭头函数中的this指向是父元素的this指向。
```js
const a = () => {
  console.log(this);//window
}
const obj = {a:'1'}
a.call(obj);
```
```js
const a = {};
function fn(){
  return (() => {
    console.log(this);//window
  }).apply(a);
}
fn();
```

### 对于call、bind、apply这些改变this指向的API，this指向取决于第一个API传
```js
const a = {};
function fn(){
  console.log(this);
}
fn.call(a);//{}
fn.call();//window
```

### 对于bind来说，不论调用多少次bind，this指向永远是第一个bind的this指向。
```js
let a = {}
function foo() {
  console.log(this);//{}
}
foo.bind(a).bind()();
```

### 定时器和延时器中的this指向window。
```js
const obj = {
  time: setTimeout(function(){
    console.log(this);//window
  })
}
obj.time;
```