import MyReact from './my_react';
import MyReactDom from './react-dom';

//函数组件
//函数组件的首字母大写，区分原生组件和自定义组件
//函数组件返回值是一个react元素jsx
//jsx是一个根组件
//属性props
function App(props){
  return MyReact.createElement("h1", null, "Hello", props.name);
}

//函数组件使用
let element = <App name="100"></App>
let element2 = MyReact.createElement(App, {
  name: "100"
});

//通过babel转译变成React.createElement
console.log(element);

 MyReactDom.render(element2,document.getElementById('root'))