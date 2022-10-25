
## TypaScript

### 常用类型
#### 原始类型
```
let age:number=20;
let myName:string='xsx'
let isLoading:boolean=false;
let a:null=null;
let b:undefined=undefined;
let s:symbol=Symbol();
```
#### 数组类型
```
let numbers:number[]=[1,2,3];
let numbers2:Array<number>=[1,2,3];
```
#### 联合类型
```
let arr:(number|string)[]=['1','2',1,2];
```
#### 函数类型
```
function add(num1:number,num2:number):number{
    return num1+num2;
}
const add2=(num1:number,num2:number):number=>{
    return num1+num2;
}
```
##### 函数的可选参数
```
function mySlice(start?:number,end?:number):void{
    console.log(`起始索引${start},结束索引${end}`);
}

mySlice();
mySlice(1);
mySlice(1,2);
```
#### 对象类型
```
let person:{name:string;age:number;sayHi():void;greet(name:string):void}={
    name:'jack',
    age:19,
    sayHi(){},
    greet(name){},
}
let person2:{
    name:string
    age:number
    sayHi:()=>void
    greet(name:string):void
}={
    name:'jack',
    age:19,
    sayHi(){},
    greet(name){},
}
```
##### 对象的可选属性
```
function myAxios(config:{url:string;method?:string}){
    console.log(config);
}
```
### 高级类型
#### 接口
```
interface IPerson{
    name:string
    age:number
    sayHi():void
}
let person3:IPerson={
    name:'jack',
    age:19,
    sayHi(){}
}
```
##### 接口的继承
```
interface Point2D{
    x:number
    y:number
}
interface Point3D extends Point2D{
    z:number
}
let d2:Point2D={
    x:1,
    y:2
}
let d3:Point3D={
    x:1,
    y:2,
    z:3
}
```
#### 类型别名
```
type TPerson={
    name:string
    age:number
    sayHi():void
}
let person4:TPerson={
    name:'jack',
    age:19,
    sayHi(){}
}
```
#### 类型断言
```
//如果不知道是什么类型的，可以在控制台选中元素，输入console.dir($0)查看。
const aLink = <HTMLAnchorElement>document.getElementById('link')
```
#### 接口与类型别名的对比
```
//接口只能给对象起别名，而类型别名可以给任意类型起别名
type NumStr = number | string;
```
#### 字面量类型
```
const str2:'Hello TS' = 'Hello TS'
let age2:18=18
function changeDirection(direction:'up'|'down'|'left'|'right'){
    console.log(direction);
}
changeDirection('up');
```
#### 数字枚举
```
//对于数字枚举存在自增长行为，如果你不设置数值，则会从0依次增长。
enum Direction{Up,Down,Left,Right}
enum Direction2{Up=10,Down=22,Left=65,Right=1025}
function changeDirection2(direction:Direction){
    console.log(direction);
}
changeDirection2(Direction.Up)
```
#### 字符串枚举
```
enum Direction3{
    Up='Up',
    Down='Down',
    Left='Left',
    Right='Right',
}
```
#### any类型(不推荐使用)
```
/*
    不推荐使用any类型，它会让TypeScript变成AnyScript，会失去TypeScript类型保护的优势。

*/
let objans:any={x:0};
objans();
//上述代码执行错误
```
##### 隐式具有any类型的情况
1. 声明变量不提供类型也不提供默认值
2. 函数参数不加类型
#### TypeScript中的typeof
```
//typeof只能查询变量或属性的类型，无法查询其他形式的类型
let p={x:1,y:2};
function formatPoint(point:{x:number,y:number}){}
formatPoint(p);
function formatPoint2(point:typeof p){}
formatPoint2(p);
```
#### class类
```
class Persons{
    ages!:number
    gender='男'
}
const per=new Persons();
```
##### class类构造函数
```
class Persons{
    ages!:number
    gender='男'
    constructor(ages:number,gender:string){
        this.ages=ages;
        this.gender=gender
    }
}
const per=new Persons(18,'女');
```
##### class类的实例方法
```
class Point{
    x=10
    y=10
    scale(n:number):void{
        this.x*=n;
        this.y*=n;
    }
}
const poi=new Point();
poi.scale(10);
```
##### class类继承父类
```
class Animal{
    move(){
        console.log('移动');
    }
}
class Dog extends Animal{
    bark(){
        console.log('汪');
    }
}
const dog=new Dog();
```
##### class类实现接口
```
interface Singalbe{
    sing():void
}
class Persons2 implements Singalbe{
    sing(): void {
        console.log('sign');
    }
}
```
##### class类可见性修饰符
1. public(公有的，默认为public)
```
class Animal{
    public move(){
        console.log('移动');
    }
}
```
2. protected(受保护的)
```
//仅对声明的所有类和子类中（非实例对象）可见。
class Animal{
    protected move(){
        console.log('移动');
    }
}
class Dog extends Animal{
    bark(){
        console.log('汪');
        this.move();
    }
}
```
3. private(私有的)
```
//只在当前类中可见，对实例对象以及子类都不可见
class Animal{
    private move(){
        console.log('移动');
    }
}
class Dog extends Animal{
    bark(){
        console.log('汪');
        this.move();//报错
    }
}
```
4. readonly(只读，不仅class类中可用)
```
/*
用来防止在构造函数之外对属性进行赋值，可以在声明时和constructor里面进行赋值
只可以修饰属性，不能修饰方法
下面代码中如果:number没有写，则age会变成字面量类型，如果再在constructor中改变值会报错。
接口或{}表示的对象类型，也可以使用readonly
*/
class Persons3{
    readonly age:number=18
    constructor(){
        this.age=age;
    }
    setAge(){
        this.age=20//报错
    }
}
interface readi{
    readonly age:18
}
let obji:{readonly age:number}={
    age:18
}
```
#### 类型兼容性
&ensp;&ensp;&ensp;&ensp;TypeScript采用的是结构化类型系统，也叫做duck typing（鸭子类型），如果两个对象具有相同的形状，则认为它们属于同一类型。
&ensp;&ensp;&ensp;&ensp;在Java、c#中，它们是标明类型系统，不会根据具有相同形状来判度。
```
class Pointl{x!:number;y!:number}
class pointl2D{x!:number;y!:number}
const pl:Pointl=new pointl2D();
//在TypeScript看来Pointl和pointl2D是同一类型
```
##### 对象之间的类型兼容性
&ensp;&ensp;&ensp;&ensp;对于对象类型来说，y的成员至少与x相同，则x兼容y（成员多的可以兼容少的）。
```
class pointl2D{x!:number;y!:number}
class pointl3D{x!:number;y!:number;z!:number}
const ppl:Pointl=new pointl3D();
```
##### 接口之间的类型兼容性
```
interface Int1{
    x:number
    y:number
}
interface Int2{
    x:number
    y:number
}
interface Int3{
    x:number
    y:number
    z:number
}
let inte1:Int1={x:1,y:2};
let inte2:Int2={x:1,y:2};
let inte3:Int3={x:1,y:2,z:3};
inte1=inte2;
inte2=inte1;
inte1=inte3;
inte3=inte1;//报错
```
##### class与interface之间的兼容性
```
interface ic1{
    x:number
    y:number
}
class ic2{
    x!:number
    y!:number
}
let ict:ic1=new ic2();
```
##### 函数之间的兼容性
&ensp;&ensp;&ensp;&ensp;函数之间兼容性要考虑三个方面。
1. 参数个数
&ensp;&ensp;&ensp;&ensp;参数多的兼容参数少的。（参数少的可以赋值给参数多的）
```
type F1=(a:number)=>void
type F2=(a:number,b:number)=>void
let f1:F1=(a)=>{};
let f2:F2=(a,b)=>{};
f2=f1;
f1=f2;//报错
```
2. 参数类型
&ensp;&ensp;&ensp;&ensp;相同位置的参数类型要相同（原始类型）或兼容（对象类型）
```
type F1=(a:number,b:string)=>void
type F2=(a:number,b:number)=>void
let f1:F1=(a,b)=>{};
let f2:F2=(a,b)=>{};
f2=f1;//报错
```
```
interface ic1{
    x:number
    y:number
}
class ic2{
    x!:number
    y!:number
}
type F1=(a:number,b:ic1)=>void
type F2=(a:number,b:ic2)=>void
let f1:F1=(a,b)=>{};
let f2:F2=(a,b)=>{};
f2=f1;
```
3. 返回值类型
    - 如果返回值类型是原始类型，此时两个类型要相同
 ```
type F5=()=>string;
type F6=()=>string;
let f5:F5=()=>'1';
let f6:F6=()=>'1';
f6=f5;
 ```
    - 如果返回值类型是对象类型，此时成员多的可以赋值给成员少的（和对象类型一直）
```
type F7=()=>{name:string}
type F8=()=>{name:string;age:number}
let f7:F7=()=>{return{
    name:'111'
}};
let f8:F8=()=>{return{
    name:'111',
    age:10
}};
f7=f8;
f8=f7;//报错
```
#### 交叉类型(&)
&ensp;&ensp;&ensp;&ensp;交叉类型&功能类似于接口的继承，用于组合多个类型为一个类型（常用于对象类型）
```
interface jio1{name:string}
interface jio2{age:number}
type Jio = jio1&jio2;
let obj:Jio={
    name:'111',
    age:10
}
```
##### 交叉类型于接口继承的对比
1. 相同点
&ensp;&ensp;&ensp;&ensp;都可以实现对象类型的组合。
2. 不同点
&ensp;&ensp;&ensp;&ensp;两种方式实现类型组合时，对于同名属性之间，处理类型冲突的方式不同。
```
interface A{
    fn(a:number):string
}
interface B extends A{//报错，类型不兼容
    fn(a:string):string
}
```
```
interface A{
    fn(a:number):string
}
interface B{
    fn(a:string):string
}
type C = A & B
```
&ensp;&ensp;&ensp;&ensp;对于C我们可以理解为一下代码
```
interface A{
    fn(a:number):string
}
interface B{
    fn(a:string):number
}
type C = A & B

class cc implements C{
    fn(a: number): string;
    fn(a: string): number;
    fn(a: unknown): string | number {
        return ''
    }
}
```
#### 泛型
&ensp;&ensp;&ensp;&ensp;泛型可以在保护类型安全的前提下，让函数等多种类型一起工作，从而实现复用。例：实现一个函数，输入什么数据就返回什么数据。
```
function id<Type>(value:Type):Type{
    return value
}
id<number>(10);
id(10);//如果编译器推断的类型不准确，我们必须在括号前声明类型
id<string>(10);//报错
//Type也可以写成别的合法名称
```
##### 泛型约束
```
function id2<Type>(value:Type):Type{
    return value.length//报错
}
```
&ensp;&ensp;&ensp;&ensp;添加泛型约束
1. 指定更加具体的类型
```
function ida<type>(value:type[]):type[]{
    return value.length
}
```
2. extends添加约束
```
interface ILength{length:number};
function ide<type extends ILength>(value:type):type{
    console.log(value.length);
    return value
}
ide([]);
ide('');
ide({length:0,name:'0'});
```
##### 多个泛型变量的情况
&ensp;&ensp;&ensp;&ensp;keyof关键字接收一个对象类型，生成其键名称（可能是字符串或数字）的联合类型
```
function getProp<Type,Key extends keyof Type>(obj:Type,key:Key){
    return obj[key];
}
let objkey={name:'11'};
getProp(objkey,'name');
getProp(objkey,'age');//报错
getProp([],0);
getProp(0,'toString');
```
##### 泛型接口
```
interface IdFunc<Type>{
    id:(value:Type)=>Type
    ids:()=>Type[]
}
let func1:IdFunc<number>={
    id(value) {
        return value
    },
    ids() {
        return []
    },
}
```
##### 数组就是泛型接口
&ensp;&ensp;&ensp;&ensp;可以点击去数组的forEach源码来查看。
##### 泛型类
&ensp;&ensp;&ensp;&ensp;在React的class组件中的基类Component就是泛型类，不同的组件有不同的props和state。
```
interface IState{count:number}
interface IProps{maxLength:number}
class InputCount extends React.Component<IProps,IState>{
    state:IState{
        const:0
    }
    render(){
        return <div>{this.props.maxLength}</div>
    }
}
```
&ensp;&ensp;&ensp;&ensp;创建泛型类
```
class Generic<NumType>{
    defaultVlaue!:NumType
    add!:(x:NumType,y:NumType)=>NumType
}
const myGen = new Generic<number>()
myGen.defaultVlaue=10
```
##### 泛型工具类型
&ensp;&ensp;&ensp;&ensp;TypaScript内置了一些常用的工具类型，来简化TypeScript中的一些常见操作。
1. Partial<Type>
&ensp;&ensp;&ensp;&ensp;用来构造（创建）一个类型，将Type的所有属性设置为可选。
```
interface PropsP{
    id:string
    children:number[]
}
type PartialProps = Partial<PropsP>
class classProps implements PartialProps{
    id!: string;
}
```
2. Readonly<Type>
&ensp;&ensp;&ensp;&ensp;用来构造一个类型，将Type的所用属性都设置为readonly（只读）
```
interface PropsR{
    id:string
    children:number[]
}
type ReadonlyProps = Readonly<PropsP>
let rp:ReadonlyProps={
    id:'1',
    children:[]
}
rp.id='2'//报错
```
3. Pick<Type>
&ensp;&ensp;&ensp;&ensp;从Type中选择一组属性来构造新类型。
```
interface PropsPi{
    id:string
    children:number[]
}
type PickProps = Pick<PropsPi,'id'>
let pp:PickProps={
    id:'1',
    children:[]//报错
}
//PickProps类型中只有id，所以会报错。
```
4. Record<Keys,Type>
&ensp;&ensp;&ensp;&ensp;构造一个对象类型，属性键为Keys，属性类型为Type。Record传入两个类型变量，第一个表示对象有哪些属性，第二个表示对象属性的类型。
```
type RecordObj=Record<'a'|'b'|'c',string[]>
let objRec:RecordObj={
    a:['1'],
    b:['1'],
    c:['1']
}
```
##### 索引签名类型
&ensp;&ensp;&ensp;&ensp;当无法确认对象中有哪些属性或者说对象中可以出现任意多个属性，此时就用到索引签名类型了。
```
interface AnyObject{
    [Key:string]:number
}
let anyobj:AnyObject={
    a:1,
    'b':2,
}
//Key只是一个占位符，可以换成任意合法的变量名称。
```
#### 映射类型
```
type PropKeys='x'|'y'|'z'
type Type1={x:number;y:number;z:number}
type Type2={[Key in PropKeys]:number}//映射
//Key只是一个占位符，可以换成任意合法的变量名称
```
```
type Props={a:number,b:string,c:boolean}
type Type3={[Key in keyof Props]:number}
```
##### 分析泛型工具类型Partial的实现
```
type Partials<T>={
    [P in keyof T]?:T[P]
}
type ParText={a:number;b:string;c:boolean}
type part=Partials<ParText>
```
#### 索引查询类型
1. 基本使用
```
type Propsi={a:number;b:number;c:number}
type Tyepi=Propsi['a'];
```
2. 查询多个
```
type Propsi={a:number;b:number;c:number}
type Tyepi2=Propsi['a'|'b'];
type Tyepi3=Propsi[keyof Propsi];
```
### 类型声明文件
#### TypeScript中的两种文件类型
&ensp;&ensp;&ensp;&ensp;今天几乎所有的JavaScript应用都会引入许多第三方库来完成任务需求。这些第三方库不管是否是用TS编写的，最终都要编译成JS代码,才能发布给开发者使用。我们知道是TS提供了类型，才有了代码提示和类型保护等机制。但在项目开发中使用第三方库时，你会发现它们几乎都有相应的TS类型，这些类型是怎么来的呢?类型声明文件:用来为已存在的JS库提供类型信息。这样在TS项目中使用这些库时，就像用TS-样，都会有代码提示、类型保护等机制了。
1. TS的两种文件类型
    - .ts文件
        1. 既包含类型信息又可执行代码
        2. 可以被编译为.js文件，然后执行代码
        3. 用途：编写程序代码的地方
2. 类型声明文件的使用说明
    - .d.ts文件
        1. 只包含类型信息的类型声明文件
        2. 不会生成.js文件，仅用于提供类型信息
        3. 用途：为js提供类型信息
※.ts事代码实现文件；.d.ts事类型声明文件
#### 第三方库的类型声明文件
1. 库自带的类型声明文件
2. [由DefinitelyTyped提供](https://www.typescriptlang.org/dt/search?search=)
#### 创建自己的类型说明文件
1. 项目内共享类型
&ensp;&ensp;&ensp;&ensp;如果多个.ts文件中都用到同一个类型，此时可以创建.d.ts文件提供该类型，实现类型共享。
- 操作步骤
    1. 创建index.d.ts事类型声明文件
    2. 创建需要共享的类型，并使用export导出（TypeScript中的类型也可以使用import/export实现模块化功能）
    3. 在需要使用共享类型的.ts文件中，通过import导入即可（.d.ts后缀导入时，直接省略）
2. 为已有JS文件提供类型声明
    1. 在将JS项目迁移到TS项目时，为了让已有的js文件有类型声明。
    2. 成为库作者， 创建库给其他人使用。
    - 说明：TypeScript项目中也可以使用.js文件，在导入.js文件时，TypeScript会自动加载与.js同名的.d.ts文件，以提供类型声明。declare关键字：用于类型声明，为其他地方（比如.js文件）已存在的变量声明类型，而不是创建一个新的类型。
        1. 对于type. interface 等这些明确就是TS类型的(只能在TS中使用的)，可以省略declare关键字。
        2. 对于let. function等具有双重含义(在JS、TS中都能用)，应该使用declare关键字，明确指定此处用于类型声明。
### 在React中使用TypeScript
#### 使用CRA创建支持TypeScript的项目
&ensp;&ensp;&ensp;&ensp;创建支持TypeScript的项目的命令：npx create-react-app 项目名。[在已有项目中使用TypeScript](https://create-react-app.dev/docs/adding-typescript)
&ensp;&ensp;&ensp;&ensp;相对于非TypeScript项目，目录结构主要由以下三个变化。
1. 项目根目录中增加了tsconfig.json 配置文件:指定TS的编译选项(比如，编译时是否移除注释)。
2. React 组件的文件扩展名变为: *.tsx。
3. src目录中增加了react-app-env.d.ts: React项目默认的类型声明文件。
4. react-app-env.d.ts文件中三斜线指令，指定依赖的其他类型声明文件，types表示依赖的类型声明文件包的名称。
#### TypeScript配置文件tsconfig.json
```
{
  "compilerOptions": {
    "target": "es6",//生成代码的语言版本
    "lib": [//指定要包含在编译中的library
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,//允许ts编译器编译js文件
    "skipLibCheck": true,//跳过声明文件的类型检查
    "esModuleInterop": true,//es模块互操作，屏蔽ESModule和CommonJS之间的差异
    "allowSyntheticDefaultImports": true,//允许使用import
    "strict": true,//开启严格模式
    "forceConsistentCasingInFileNames": true,//对文件名称强制区分大小写
    "noFallthroughCasesInSwitch": true,//为switch语句启用报错报告
    "module": "esnext",//生成代码的模块化标准
    "moduleResolution": "node",//模块解析（查找）策略
    "resolveJsonModule": true,//允许导入扩展名为.json的模块
    "isolatedModules": true,//是否将没有import/export的文件规为旧（全局而非模块化）脚本文件
    "noEmit": true,//编译时不生产任何文件（只进行类型检查）
    "jsx": "react-jsx"//将指定jsx编译成什么形式
  },
  "include": [//指定允许ts处理的目录
    "src"
  ]
}
```
#### React中常用的类型
&ensp;&ensp;&ensp;&ensp;在不使用TypeScript时，可以使用prop-types库，为React组件提供类型检查。在TypeScript项目中，推荐使用TypeScript或Flow实现组件类型校验（代替prop-types）
##### 函数组件
1. 组件和属性类型
```
//组件和属性类型
import React,{FC} from 'react';
type Props={name:string;age?:number}
const Hello:FC<Props>=({name,age})=>(
  <div>你好，我叫：{name}，我{age}岁了</div>
)
const Hello2=({name,age}:Props)=>(
  <div>你好，我叫：{name}，我{age}岁了</div>
)
```
2. 组件属性的默认值(defaultProps)
```
//属性默认值
import React,{FC} from 'react';
const Hello:FC<Props>=({name,age})=>(
  <div>你好，我叫：{name}，我{age}岁了</div>
)
Hello.defaultProps={
  age:18
}
const Hello2=({name,age=18}:Props)=>(
  <div>你好，我叫：{name}，我{age}岁了</div>
)
```
3. 事件绑定和事件对象
```
//事件与事件对象
import React from 'react'

export default function Test() {
  function onclick(e:React.MouseEvent<HTMLButtonElement>){
    console.log(e.currentTarget);
  }
  function onchange(e:React.ChangeEvent<HTMLInputElement>){
    console.log(e.target);
    
  }
  return (
    <div>
      <button onClick={onclick}>你点我一下</button>
      <input type="text" onChange={onchange} />
    </div>
  )
}
```
##### 类组件
1. 组件和类型
```
type State = { count: number }
type Props = { message? :string }
class C1 extends React.Component }// 无props、state
class C2 extends React.Component<Props> {}//有props,无state
class C3 extends React.Component<{}, State> }//无props, 有state
class C4 extends React.Component<Props, State> 年} //有props、state
```
2. 组件属性和默认值
```
import React, { Component } from 'react'
type Props = { name:string;age?:number }
export default class TestClass extends Component<Props> {
  static defaultProps:Partial<Props>={
    age:14
  }
  render() {
    const {name,age=18} = this.props
    return (
      <div>
        你好，我叫：{name}，我{age}岁了
      </div>
    )
  }
}
```
3. 状态与事件
```
import React, { Component } from 'react'
type State = { count:number }
export default class TestClass extends Component<{},State> {
  state:State={
    count:0
  }
  add=()=>{
    this.setState({
        count:this.state.count+1
    })
  }
  render() {
    return (
      <div>
        {this.state.count}
        <button onClick={this.add}>+1</button>
      </div>
    )
  }
}
```
