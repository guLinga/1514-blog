import MyReact from "./my_react";
import MyReactDOM from "./react-dom";

//实现类组件

class App extends MyReact.Component{
  constructor(props){
    super(props);
  }
  render(){
    return <h1>Hello{this.props.name}</h1>
  }
}

let element = <App name="1"></App>
console.log(element);

MyReactDOM.render(element,document.getElementById('root'));