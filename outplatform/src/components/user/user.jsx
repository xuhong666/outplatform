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
                label="?????????"
                name="Account"
                rules={[
                    {
                        required: true,
                        message: '???????????????!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="??????"
                name="PassWord"
                rules={[
                    {
                        required: true,
                        message: '????????????!',
                    },
                ]}
            >
             <Input.Password />
            </Form.Item>
            <Form.Item
                label="????????????"
                name="PassWords"
                dependencies={['PassWord']}                
                rules={[
                {
                    required: true,
                    message: '?????????????????????!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('PassWord') === value) {
                        return Promise.resolve();                    }

                    return Promise.reject(new Error('???????????????????????????!'));
                    },
                }),
                ]}
            >
             <Input.Password />
            </Form.Item>
            <Form.Item
                label="????????????"
                name="UserName"
                rules={[
                    {
                        required: true,
                        message: '??????????????????!',
                    },
                ]}
            >
                <Input />
            </Form.Item><Form.Item
                label="????????????"
                name="BelongUnitID"
                rules={[
                    {
                        required: true,
                        message: '??????????????????!',
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
                label="????????????"
                name="Mobile"
                rules={[
                    {
                        required: true,
                        message: '??????????????????!',
                    },
                ]}
            >
                <Input />
            </Form.Item>           
            <Form.Item
                label="????????????"
                name="UserState"
                valuePropName="checked"
            >
              <Switch  checkedChildren="??????" unCheckedChildren="??????"/>
            </Form.Item>
            <Form.Item
                label="????????????"
                name="Verificationmethod"
                rules={[
                    {
                        required: true,
                        message: '??????????????????!',
                    },
                ]}
            >
                <Select>
                    <Option value={1}>????????????</Option>
                    <Option value={2}>????????????</Option>
                </Select>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                 <Button  htmlType="submit">
                    ??????
                </Button>
                <Button  style={{marginLeft:20}} type="primary" htmlType="submit">
                    ??????
                </Button>
            </Form.Item>
        </Form>
    );
}
