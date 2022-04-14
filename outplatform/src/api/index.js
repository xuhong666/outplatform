import ajax from './ajax'
const Base='https://localhost:7159/api'
//登录
export const reqLogin=(login)=>ajax(Base+'/Login/GetLogin',login,'POST')
//添加用户
// export const reqAddUser=()=>ajax('',{},'POST')
//发送验证码
export const reqSendMobileCode=(login)=>ajax(Base+'/Login/SendMobileCode',login,'POST')
export const reqQcomPany=(ComPanyRequest)=>ajax(Base+'/ComPany/ComPanyQuery',ComPanyRequest,'POST')//查询公司
export const reqAcomPany=(ComPanyRequest)=>ajax(Base+'/ComPany/AddComPany',ComPanyRequest,'POST')   //新增公司
export const reqUcomPany=(ComPanyRequest)=>ajax(Base+'/ComPany/UpdateComPany',ComPanyRequest,'POST') //更新公司
export const reqRComPany=(ComPanyRequest)=>ajax(Base+'/ComPany/RemoveComPany',ComPanyRequest,'POST') //删除公司
export const reqCompanyBasis=()=>ajax(Base+'/ComPany/CompanyBasis','','POST') //获取公司

export const reqQueryUser=(UserRequest)=>ajax(Base+'/User/QueryUser',UserRequest,'POST') //查询用户信息
export const reqAddUser=(UserRequest)=>ajax(Base+'/User/AddUser',UserRequest,'POST') //新增用户信息
export const reqModifyUser=(UserRequest)=>ajax(Base+'/User/ModifyUser',UserRequest,'POST') //修改用户信息
export const reqRemoveUser=(UserRequest)=>ajax(Base+'/User/RemoveUser',UserRequest,'POST') //移除用户信息

