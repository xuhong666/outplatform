import React from 'react'
import { Form, Input, Button} from 'antd';
export default function SubAdministrativeAreas() {
    const onFinish = (values) => {
        console.log('Success:', values);
      };
  return (
    <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 10,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}    
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input/>
    </Form.Item>
    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        确认
      </Button>
      <Button style={{marginLeft:20}}  type="primary" htmlType="submit">
        取消
      </Button>
    </Form.Item>
  </Form>
  )
}
