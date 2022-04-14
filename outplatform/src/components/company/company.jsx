import React from 'react'
import { Form, Input, Button,Checkbox, message} from 'antd';
import {reqAcomPany,reqUcomPany} from '../../api'
export default function SubCompany(props) { 
   var companyingo={
      Start:props.children.start,
      ID: props.children?.comPany?.ID,
      CompanyCode:props.children?.comPany?.CompanyCode,
      CompanyName:props.children?.comPany?.CompanyName,
      IsArchive:props.children?.comPany?.IsArchive
  }  
   const onFinish = async(values) => {  
      if(companyingo.Start===1)
      { 
         values.ID ='';         
         var resp = await reqAcomPany(values);
         if(resp.IsSuccess)
         {
           message.success(resp.Msg)
           props.subComPany()
         }else{
            message.error(resp.Msg)
            return;
         }
      }
      if(companyingo.Start===2)
      { 
         resp = await reqUcomPany(values);
         if(resp.IsSuccess)
         {
           message.success(resp.Msg)
           props.subComPany()
         }else{
            message.error(resp.Msg)
            return;
         }
      }  
   };
   return (
      <Form  className=''
         name="basic"
         labelCol={{ span: 8 }}
         wrapperCol={{ span: 10 }}
         initialValues={{ remember: true }}
         onFinish={onFinish}
         autoComplete="off"
      >
          <Form.Item
            label="ID"
            name="ID"
            hidden='true'
            initialValue={companyingo.Start === 1 ?'': companyingo?.ID}          
         >
            <Input />
         </Form.Item>
         <Form.Item
            label="公司编码"
            name="CompanyCode"
            initialValue={companyingo.Start === 1 ?'': companyingo?.CompanyCode}
            rules={[{ required: true, message: '公司编码必填!' }]}
         >
            <Input />
         </Form.Item>
         <Form.Item
            label="公司名称"
            name="CompanyName"
            initialValue={companyingo.Start === 1?'':companyingo?.CompanyName}
            rules={[{ required: true, message: '公司名称必填!' }]}
         >
          <Input/>
         </Form.Item>        
         <Form.Item label="封存标识" name="IsArchive"  valuePropName='checked'
          initialValue={companyingo.Start === 1? true :
            companyingo.IsArchive==='N'?true:false}
         >            
           <Checkbox>封存</Checkbox>
         </Form.Item>      
         <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">确定</Button>
            <Button type="primary"  style={{marginLeft:20}}  htmlType="submit">取消</Button>
         </Form.Item>
      </Form>
   );

}

