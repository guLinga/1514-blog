## js类型

js的类型分为`基本类型(原始类型)`和`引用类型(对象类型)`

### 基本类型

- undefined
- null
- number
- string
- boolean
- symbol
- bigint

**基本类型都是储存的值，自身没有函数可以调用。**

特例：
1. string类型
```js
var a = '1'
a.toString()
```
string是基本类型，但是却可以调用函数，这是因为定义字符串的时候被强制转换成了String类型，也就是对象类型，所以可以调用toString函数。

2. string
string类型的值定义后就不可改变了，你不能使用s[i]的形式改变string的值。

3. number
```
0.1 + 0.2 != 0.3
```
js中的number类型是浮点类型，在使用中会出现一些bug

4. null
`typeof null`会输出object，这是因为js在最初版本中使用的32位系统，为了性能考虑，000开头代表对象。然后null表示为全零，所以将null误判为对象。




### 引用类型
基本类型以值的形式储存在栈中，而引用类型储存的是地址值，地址指向堆中的数据。
```js
const a = []
const b = a
b.push(1)
console.log(a,b);
```
修改b的时候，a也跟着改变了，因为a和b是指向一个地址值。

```js
function test(person) {
  person.age = 26
  person = {
    name: 'yyy',
    age: 30
  }

  return person
}
const p1 = {
  name: 'yck',
  age: 25
}
const p2 = test(p1)
console.log(p1) // -> { name: 'yck', age: 26 }
console.log(p2) // -> { name: 'yyy', age: 30 }
```
因为我们传参的时候也是传递的地址值，所以`person.age = 26`将p1中的name改变了。

