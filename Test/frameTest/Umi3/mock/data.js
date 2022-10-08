import { delay } from 'roadhog-api-doc';//模拟延时

export default delay({
  'GET /umi/good':[
    { id:1,name:'name1' },
    { id:2,name:'name2' }
  ],
  'POST /api/users/create': (req,res)=>{
    res.end('OK');
  }
},0)
