import React, { useState } from 'react'
import { useNavigate  } from "react-router-dom";
import { Form, Input, message, Button} from 'antd'
import { reqSendMobileCode,reqLogin} from '../../api'
import storageUtils from '../../utils/storageUtils';
import  memoryutils from '../../utils/memoryUtils'
export default function MobileVerify(props) {
    const [time, setTime] = useState(60)
    const [isShowCode, setIsShowCode] = useState(false)
    let Navigate = useNavigate ();
    const layout = {       
        labelCol: { span: 5 },
        wrapperCol: { span:15 },
    };
    const onFinish = async(values) => {   
      var logins =props.children;
      logins.code =values.user.code;
      logins.State =1;
      const rsp = await reqLogin(logins);
      if(rsp.IsSuccess)
      {
        memoryutils.user =rsp;
        storageUtils.saveUser(rsp);
        Navigate('/');
      }else
      {
        message.error(rsp.Msg);
        return;
      }      
    };
    const validateMessages = {
        required: '请输入手机验证码！'
    };

    const onReset = () => {
        props.handleOk();
    }

    // 发送邮箱验证码
    const sendCode = async(values) => {       
        if (isShowCode) { // 倒计时未结束,不能重复点击
            return
        }
        setIsShowCode(true)
        // 倒计时
        const active = setInterval(() => {
            setTime((preSecond) => {
                if (preSecond <= 1) {
                    setIsShowCode(false)
                    clearInterval(active)
                    // 重置秒数
                    return 60
                }
                return preSecond - 1
            })
        }, 1000)
        const res =await reqSendMobileCode(props.children)           
        message.success(res.Msg);
    }
    return (
        <div>
            <Form size ="small" {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item
                    name={['user', 'code']}
                    label="验证码"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        placeholder='请输入手机验证码'
                        maxLength={6}
                        suffix={<a onClick={sendCode}>{isShowCode ? `${time}秒后重新发送` : '发送验证码'} </a>}
                    />
                </Form.Item>
                <Form.Item>
                    <div style={{marginTop:20,float:'right'}}>
                     <Button  htmlType="button" onClick={onReset}>
                        取消
                    </Button>
                    <Button style={{marginLeft:15}} type="primary" htmlType="submit">
                        确认
                    </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}
