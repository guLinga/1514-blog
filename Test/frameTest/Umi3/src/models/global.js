import {request} from "umi";
import key from 'keymaster'

export default {
  // namespace: 'global',//所有的models里面的namespace不能重名
  //初始化全局数据
  state:{
    title: '全局title',
    text: '全局text',
    login: false,
    a: '全局models aaaa'
  },

  //处理同步业务
  reducers: {
    setText(state){
      //copy 更新 并返回
      return {
        ...state,
        text: '全局 设置后的 text' + Math.random().toFixed(2)
      }
    },
    setTitle(state,action){
      console.log('setTitle',action)
      //copy 更新 并返回
      return {
        ...state,
        title: `全局 设置后的 title'/${action.payload}/${Math.random().toFixed(2)}`
      }
    },
    good:(state)=>({
      ...state,
      login:true
    })
  },

  //处理异步任务
  effects: {
    *login(action,{call,put,select}){
      const data = yield call(request,'/umi/good');
      yield put({
        type: 'good',
        payload: data
      })
    }
  },

  subscriptions: {
    //监听路由
    listenRoute({dispatch,history}){
      history.listen(({pathname,query})=>{
        console.log('global subscription',pathname,query)
      })
    },

    //监听按键
    listenKeyBoard({dispatch}){
      key('ctrl+i',()=>{
        console.log('你按下了ctrl+i');
        dispatch({type:'setText'})
      })
    }
  }
}
