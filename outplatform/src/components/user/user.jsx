import React,{useState,useEffect} from 'react'
import { Form, Input, Button, Select, Switch,message } from 'antd';
import {reqAddUser,reqModifyUser,reqCompanyBasis} from '../../api'
export default function User(props) {
    console.log('first', props)
    const [Basis,setBasis]=useState([]);
    const {Option} = Select; 
    let resp ={}; 
    function onBelongChange(value) {
        console.log(`selected ${value}`);
    }      
    function onBelongSearch(val) {
        console.log('search:', val);
    }     
    const  CompanyBasis=async()=>{
        let resp =reqCompanyBasis();       
        resp.then(sp=>{            
            if(sp.IsSuccess)
            {
              setBasis(sp.Data);
            }else{
                message.error(sp.Msg)
                return;
            }           
        });    
    }
    useEffect(()=>{        
        CompanyBasis();      
    },[]);
    const user ={
        Id:props.children.user?.id,
        Account:props.children.user?.Account,
        PassWord:props.children.user?.PassWord,
        UserName:props.children.user?.UserName,
        GuBelongUnitIDid:props.children.user?.BelongUnitID,
        CompanyName:props.children.user?.CompanyName,
        Mobile:props.children.user?.Mobile,
        UserState:props.children.user?.UserState,
        UserStateName:props.children.user?.UserStateName,
        Verificationmethod:props.children.user?.Verificationmethod,
        VerificationmethodName:props.children.user?.VerificationmethodName
    }
    const onFinish =async(values) => {       
        user.Id =values.Id;     
        user.Account =values.Account;
        user.PassWord =values.PassWord;
        user.UserName =values.UserName;
        user.GuBelongUnitIDid =values.BelongUnitID;
        user.Mobile =values.Mobile;
        user.UserState =values.UserState===undefined?false:values.UserState;
        user.Verificationmethod =values.Verificationmethod;       
        if(user.Id===undefined ||user.Id==='')
        { 
           resp = await reqAddUser(user);
        }else{
           resp = await reqModifyUser(user);
        }        
        if(resp.IsSuccess)
        {
            message.success(resp.Msg)
        }else{
            message.error(resp.Msg)
        }
    };     

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            name="basic"
            labelCol={{
                span: 5,
            }}
            wrapperCol={{
                span: 15,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Id"
                name="Id"
                hidden
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="用户名"
                name="Account"
                rules={[
                    {
                        required: true,
                        message: '用户名必填!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="密码"
                name="PassWord"
                rules={[
                    {
                        required: true,
                        message: '密码必填!',
                    },
                ]}
            >
             <Input.Password />
            </Form.Item>
            <Form.Item
                label="确认密码"
                name="PassWords"
                dependencies={['PassWord']}                
                rules={[
                {
                    required: true,
                    message: '请确认你的密码!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('PassWord') === value) {
                        return Promise.resolve();                    }

                    return Promise.reject(new Error('二次输入密码不一致!'));
                    },
                }),
                ]}
            >
             <Input.Password />
            </Form.Item>
            <Form.Item
                label="用户姓名"
                name="UserName"
                rules={[
                    {
                        required: true,
                        message: '用户姓名必填!',
                    },
                ]}
            >
                <Input />
            </Form.Item><Form.Item
                label="所属单位"
                name="BelongUnitID"
                rules={[
                    {
                        required: true,
                        message: '所属单位必填!',
                    },
                ]}
            >
               <Select
                showSearch
                onChange={onBelongChange}
                onSearch={onBelongSearch}
                filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >  
                {Basis.map(item=> (
                    <Option key={item.ID}>{item.CompanyName}</Option>
                ))}                        
            </Select>
            </Form.Item><Form.Item
                label="手机号码"
                name="Mobile"
                rules={[
                    {
                        required: true,
                        message: '手机号码必填!',
                    },
                ]}
            >
                <Input />
            </Form.Item>           
            <Form.Item
                label="用户状态"
                name="UserState"
                valuePropName="checked"
            >
              <Switch  checkedChildren="开启" unCheckedChildren="关闭"/>
            </Form.Item>
            <Form.Item
                label="认证方式"
                name="Verificationmethod"
                rules={[
                    {
                        required: true,
                        message: '认证方式必填!',
                    },
                ]}
            >
                <Select>
                    <Option value={1}>普通认证</Option>
                    <Option value={2}>手机认证</Option>
                </Select>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                 <Button  htmlType="submit">
                    取消
                </Button>
                <Button  style={{marginLeft:20}} type="primary" htmlType="submit">
                    确定
                </Button>
            </Form.Item>
        </Form>
    );
}
