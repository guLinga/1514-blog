import MyReact from './my_react';
import MyReactDom from './react-dom';

let element=<h1 className='title' style={{color:'red'}}>react</h1>
let element2=MyReact.createElement("h1", {
  className: "title",
  style: {
    color: 'red'
  }
}, "react","react2",MyReact.createElement("h1", null,'我是h1'));
console.log(element2);//现在element是vnode虚拟DOM

//render把虚拟DOM转换成真实DOM加载到页面上去
MyReactDom.render(
  element2,
  document.getElementById('root')
)


// const root = ReactDOM.createRoot(document.getElementById('root'));
// console.log(document.getElementById('root'),root);
// root.render(
//   <React.StrictMode>
//     {element}
//   </React.StrictMode>
// );


