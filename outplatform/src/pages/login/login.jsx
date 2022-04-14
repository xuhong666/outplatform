import React,{useState} from 'react'
import { useNavigate  } from "react-router-dom";
import { Form, Input, Button, message,Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin} from '../../api'
import storageUtils from '../../utils/storageUtils';
import  memoryutils from '../../utils/memoryUtils'
import  MobileVerify from '../../components/mobileVerify/mobileVerify'
import './login.less'
import logo from './images/logo192.png'

//登录
export default function Login() {    
     const [isModalVisible, setIsModalVisible] = useState(false);  
     const [login,setlogin] = useState();    
     const loginInfo ={
      account:'',
      passWord:'',
      mobile:'',
      code:'',
      state:0
     };
    const handleOk = () => {
      setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    let Navigate = useNavigate ();
    const onFinish = async(values) => { 
      loginInfo.account =values.username;
      loginInfo.passWord =values.password;
    setlogin(loginInfo);
    const rsp = await reqLogin(loginInfo);   
    if(rsp.IsSuccess)
    {
      const data =rsp.Data;     
      if(data.Verificationmethod === 0)
      {           
        memoryutils.user =rsp;
        storageUtils.saveUser(rsp);
        Navigate('/');
      }else
      {
        setIsModalVisible(true)
      }
    }else{
      message.error(rsp.Msg);
      return;
    }
    
  };
  return (
    <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo" />
        <h1>外联平台管理系统</h1>
      </header>
      <section className="login-content">
        <h2 className="h2">用户登录</h2>
        <Form name="normal_login"  className="login-form" initialValues={{ remember: true, }}
          onFinish={onFinish}>
            
         <Form.Item name="username"
            rules={[
              {
                required: true,
                message: '请输入账号!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          {/* <Form.Item>
            <Form.Item name="remember" valuePropName="checked" defaultChecked="false" noStyle>
              <Checkbox>记住密码</Checkbox>
            </Form.Item>
             <a className="login-form-forgot" href="">
            Forgot password
          </a> 
          </Form.Item> */}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            {/* Or <a href="">register now!</a> */}
          </Form.Item>
        </Form>
        <Modal title="手机验证" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
         footer={null}         
         destroyOnClose="false">
          <MobileVerify  handleOk={handleOk}>{login}</MobileVerify>
       </Modal>
      </section>
    </div>
  )
}
