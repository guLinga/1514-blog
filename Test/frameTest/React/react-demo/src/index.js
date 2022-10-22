import React from "./react";
import ReactDOM from "./react-dom";

//实现组件的更新
//组件数据来源：1.父组件的数据2.自身的数据

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {num:0};
  }
  handleClick=()=>{
    console.log(111);
    this.setState({num:this.state.num+1});
  }
  render(){
    return <div>
      <h1 className='a' click="1">Hello{this.state.num}</h1>
      <button className='a' onClick={this.handleClick}>点击加1</button>
    </div>
  }
}

let element = <App name="1"></App>
console.log(element);


ReactDOM.render(element,document.getElementById('root'));