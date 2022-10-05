import { Button } from 'antd';
import { Button as V2Button } from 'antd-mobile-v2';//v2版本
import { Button as V5Button } from 'antd-mobile';//默认v5版本
import { request,useRequest } from 'umi';
import './index.less';
import styles from './index.less'


export default function IndexPage() {
  function fn(){
    console.log(111);
  }
  // const getGood = async () => {
  //   let res = await fetch('/umi/good');
  //   let data = await res.json();
  //   console.log(data);
  // }
  // const getGood = async () => {
  //   let res = await request('/umi/good');
  //   console.log(res);
  // }


  // const {data,error,loading,run} = useRequest('/umi/good',{
  //   manual:true,
  //   pollingInterval: 1000,//每一秒轮询一次
  //   pollingWhenHidden: false,//屏幕不可见时，暂停轮询
  // });

  const {data,error,loading} = useRequest('/umi/good');
  if(error){
    return <div>错误信息</div>
  }
  if(loading){
    return <div>加载</div>
  }
  if(data){
    console.log(data)
    return <div>加载</div>
  }


  return (
    <div>
      <div>111</div>
      <div>{JSON.stringify(String(data))}</div>
      <Button type='primary' onClick={fn}>按钮</Button>
      <Button type='primary'>获取数据</Button>
      <V2Button type='primary' size='small' inline>按钮v2</V2Button>
      <V5Button color='primary'>按钮v5</V5Button>
      <V5Button color='primary'>获取数据</V5Button>
      <img src={require('../assets/images/favicon.ico')} alt="" />
      <img src="/favicon.ico" alt="" />
      <div className='box box1'></div>
      <div className='box box2'></div>
      <div className='box box3'></div>

      <div className='myLink'>全局变量</div>
      <div className={styles.title}>局部变量</div>

      <div className={styles.bar_right}>局部变量作用于全局
        <button className='btn'>我是局部样式作用域全局</button>
      </div>
    </div>
  );
}
