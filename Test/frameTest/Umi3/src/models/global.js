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
      //copy 更新 并返回
      return {
        ...state,
        text: `全局 设置后的 title'/${action.payload}/${Math.random().toFixed(2)}`
      }
    }
  }
}
