import React from './react';
import ReactDOM from './react-dom';


const Element = <h1 title="title" className='class'>
    <div title="111">111</div>
    <div title="222">222</div>
    <div title="333"></div>
</h1>

console.log(Element)
ReactDOM.render(Element, document.getElementById('root'));
