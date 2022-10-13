import { twoVnode } from "./react-dom";

//更新器
class Updater{
  constructor(classInstance){
    this.classInstance = classInstance;//保存类实例
    this.peddingState = []//保存数据
  }
  addState(partialState){
    this.peddingState.push(partialState);
    //更新
    this.emitUpdata();
  }
  //更新
  emitUpdata(){
    //更新组件
    this.updataComponent();
  }
  updataComponent(){
    let {peddingState,classInstance} = this;
    //获取数据->更新组件
    if(peddingState.length>0){
      sholdUpdata(classInstance,this.getState());
    }
  }
  //获取到最新的数据->把最新的数据变成虚拟DOM
  getState(){
    let {peddingState,classInstance} = this;
    let {state} = classInstance;//获取到旧的数据
    peddingState.forEach(nextState=>{
      state = {...state,nextState};
    })
    //清空数据
    peddingState.length = 0;
    return state;//返回最新的数据
  }
}

//实现组件更新
//1. 初始化的时候会得到h
//2. 更新的时候 获取到新的状态 把新的状态变成vnode render方法 再把虚拟DOM变成真实DOM
//3. 用新的DOM替换旧的DOM
function sholdUpdata(classInstance,nextState){
  classInstance.state = nextState;
  //实现组件更新
  classInstance.forceUpdata();
}

class Component{
  //子类可以继承父类的  实例方法  静态方法  原型方法
  static isReactComponent = true;
  constructor(props){
    this.props = props;
    this.state = {};
    //创建更新器
    this.updater = new Updater(this);
  }
  setState(partialState){
    this.updater.addState(partialState);
  }
  forceUpdata(){
    let newVnode = this.render();
    let oldVnode = this.oldReaderVnode;
    let oldDom = oldVnode.dom;
    //实现组件更新
    console.log(oldDom.parentNode,oldVnode,newVnode);
    twoVnode(oldDom.parentNode,oldVnode,newVnode)//1.旧的真实节点2.旧的虚拟DOM3.新的虚拟DOM
  }
}

export default Component;