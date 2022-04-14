import React from 'react'
import {Form, Input, Button,Select,Checkbox,DatePicker} from 'antd';
import '../../components/customer/customer.less'
export default function SubCustomer() {
    const layout = {       
        labelCol: { span: 5 },
        wrapperCol: { span:10 },
    };
    const onFinish = (values) => {
        console.log(values);
    };
    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        }
    };
    /* eslint-enable no-template-curly-in-string */
    return (             
        <Form size ="small" {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item  className='formitemcustomer'  name={['user', 'name']} label="行政区域" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item className='formitemcustomer' name={['user', 'email']} label="单位" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item className='formitemcustomer' name={['user', 'age']} label="姓名" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item className='formitemcustomer' name={['user', 'website']} label="性别" rules={[{ required: true }]}>
                <Select>
                <Select.Option value="1">男</Select.Option>
                <Select.Option value="1">女</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item className='formitemcustomer' name={['user', 'website']} label="职务" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item className='formitemcustomer' name={['user', 'website']} label="职级" rules={[{ required: true }]}>
            <Select>
                <Select.Option value="省部级">省部级</Select.Option>
                <Select.Option value="厅局级">厅局级</Select.Option>
                <Select.Option value="处级">处级</Select.Option>
                <Select.Option value="科级">科级</Select.Option>
                <Select.Option value="其他">其他</Select.Option>
            </Select>
            </Form.Item>
            <Form.Item className='formitemcustomer' name={['user', 'website']} label="对接单位" rules={[{ required: true }]}>
                <Select>
                <Select.Option value="1">正泰电器</Select.Option>
                <Select.Option value="2">正泰集团</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item className='formitemcustomer' name={['user', 'website']} label="对接人姓名" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item  className='formitemcustomer' name={['user', 'website']} label="联系电话">
                <Input />
            </Form.Item>
            <Form.Item  name={['user', 'website']} label="主管业务">
                <Input.TextArea  showCount maxLength={200}/>
            </Form.Item>
            <Form.Item  name={['user', 'website']} label="备注">
                <Input.TextArea showCount maxLength={200} />
            </Form.Item>
            <Form.Item className='formitemcustomer' name={['user', 'website']} label="传真">
                <Input />
            </Form.Item>
            <Form.Item className='formitemcustomer' name={['user', 'website']} label="邮箱" rules={[{ type: 'email' }]}>
                <Input />
            </Form.Item>
            <Form.Item className='formitemcustomer'label="生日">
            <DatePicker  placeholder="请选择日期" />
            </Form.Item>
            <Form.Item className='formitemcustomer' name={['user', 'website']} label="封存标识">
            <Checkbox>封存</Checkbox>
            </Form.Item>                 
            <Form.Item  style={{marginTop:20}}  wrapperCol={{ ...layout.wrapperCol, offset: 8}}>
                <Button type="primary" htmlType="submit">
                    确认
                </Button>
                <Button  style={{marginLeft:30}} type="primary" htmlType="submit">
                    取消
                </Button>
            </Form.Item>
        </Form>
       
    )
}
