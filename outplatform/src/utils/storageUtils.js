import store from 'store'
const USER_KEY ='user_Key';
// eslint-disable-next-line import/no-anonymous-default-export
export default{
  //保存user
  saveUser(user){
     //localStorage.setItem(USER_KEY,JSON.stringify(user))
     store.set(USER_KEY,user)
  },
  //读取user
  getUser(){
      //return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
      return store.get((USER_KEY)||'{}')
  },
  //删除user
  remover()
  {
     //localStorage.removeItem(USER_KEY);
     store.remove(USER_KEY)
  }

}