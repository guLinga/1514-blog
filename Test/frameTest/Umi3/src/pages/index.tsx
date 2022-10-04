import { Button } from 'antd';
import { Button as V2Button } from 'antd-mobile-v2';//v2版本
import { Button as V5Button } from 'antd-mobile';//默认v5版本
import './index.less';
import styles from './index.less'
import user from '../assets/images/favicon.ico';


export default function IndexPage() {
  function fn(){
    console.log(111);
  }
  return (
    <div>
      <Button type='primary' onClick={fn}>按钮</Button>
      <V2Button type='primary' size='small' inline>按钮v2</V2Button>
      <V5Button color='primary'>按钮v5</V5Button>
      <img src={user} alt="" />
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
