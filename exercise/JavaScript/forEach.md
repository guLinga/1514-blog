[<=返回](./index.md)
<hr/>

题目：
```
const obj = {
  prefix: 'BFE',
  list: ['1', '2', '3'],
  log() {
    this.list.forEach(function (item) {
      console.log(this.prefix + item);
    });
  },
};

obj.log();
```

答案：
```
'undefined1'
'undefined2'
'undefined3'
```

解析：
forEach(function(element, index, array){}, thisArg);
element：数组遍历的每个元素
index：数组遍历的下标
array：原数组
thisArg：forEach中函数内的this指向，如果不写该参数，this指向window