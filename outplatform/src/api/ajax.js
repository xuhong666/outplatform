import { message} from 'antd';
import axios from 'axios'
import storageUtils from '../utils/storageUtils';
export default function ajax(url,data={},type='GET') {    

    //拦截器  请求体
    axios.interceptors.request.use(config => {        
        if (storageUtils.getUser('user_Key') != null) {        
         config.headers['Authorization'] = "Bearer " + storageUtils.getUser("user_Key").Data.Token;
        }
        return config;
    });  

   return new Promise((resolve,reject)=>{
    let promise
    if(type==='GET')
    {
      promise = axios.get(url,{ params:data});
    }else{     
        promise = axios.post(url,data);
    } //如果成功了，调用resolve(value)
    promise.then(response=>{       
        resolve(response.data)
    }).catch(error=>{ //如果失败了，不调用
        //reject(error)       
        message.error('请求出错了：'+error.message);
        let status = error.response.status;
        if(status===401){           
            window.location.href='Login';
        }
       
        
    })
   })
   
   


}
