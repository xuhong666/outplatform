import React, { useState,useEffect} from 'react';
import { Table, Space, Input, Button, Modal,message} from 'antd';
import SubCompany from '../../components/company/company';
import {reqQcomPany,reqRComPany} from '../../api'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './index.less';
const { confirm } = Modal;
/* 公司目录 */
export default function Company() {   
    const [companyTitle, setcompanyTitle] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [Start,SetStart] =useState(); 
    const [data,setdata] =useState();
    const [state,setState] =useState();   
    const pageHelper ={'current':1,'pageSize':10,'total':0}
   const pany={
    Id:'',
    CompanyCode:'',
    CompanyName:'',
    IsArchive:false,
    PageSize:10,
    PageIndex:1
   } 
    const pageChange = (currentPage) => {    
                    pany.Id =state.company;                   
                    pany.CompanyName =state.company;
                    pany.IsArchive =true;
                    pany.PageSize =currentPage.pageSize;
                    pany.PageIndex =currentPage.current;
                    comPany(pany);
    } 
    useEffect(()=>{        
        pany.Id='';
        pany.CompanyCode='';
        pany.CompanyName='';        
        comPany(pany);
    },[])     
    const  queryClick =()=>{      
        pany.CompanyName=state?.company===undefined?'':state?.company;  
        comPany(pany);
    }    
    const  inputChange=(e)=>
    {
        let val=e.target.value;
        setState({
            company:val
        })
    }
     const comPany =async(pany)=>{
        var  resp =await reqQcomPany(pany);        
        if(resp.IsSuccess)
        {
            setdata(resp.Data);
        }else{
            message.success(resp.Msg)
            return;
        }
     };
    const showModal = (values) => {      
        setcompanyTitle('修改公司信息')
        SetStart({'start':2,'comPany':values});        
        setIsModalVisible(true);
    };
    var subComPany =()=>{        
        comPany(pany);   
        setIsModalVisible(false);
        return Start;
    }
    var handleOk = () => {       
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const AddShowModel =()=>{
        setcompanyTitle('新增公司信息')
        SetStart({'start':1});
        setIsModalVisible(true);
    };
    const showDeleteConfirm =(key) => {
        confirm({
            title: '确定要删除这一条数据？',
            icon: <ExclamationCircleOutlined />,
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {                
                pany.Id=key;
                let resp =reqRComPany(pany);
                resp.then(res=>{                    
                    message.success(res.Msg)                    
                    if(res.IsSuccess)
                    {   const dataSource = data;
                        setdata(dataSource.filter((item) => item.ID !== key));
                    }    
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
            className:"notshow",          
        },
        {
            title: '公司编码',
            dataIndex: 'CompanyCode',
            key: 'CompanyCode',            
        },
        {
            title: '公司名称',
            dataIndex: 'CompanyName',
            key: 'CompanyName',
        },
        {
            title: '标识',
            dataIndex: 'IsArchive',
            key: 'IsArchive',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) =>(
                <Space size="middle">
                    <a href="#" onClick={()=>showModal(record)}>修改</a>
                    <a href="#" onClick={()=>showDeleteConfirm(record.ID)} >删除</a>                  
                </Space>
            ),
        },
    ];
    
    return (
        <div>
            <div className='queytop'>
                <Input placeholder="请输入公司名称" style={{ width: 300 }}  onChange={(e)=>inputChange(e)} defaultValue=""/>
                <Button type="primary" style={{ marginLeft: 15 }}  onClick={queryClick}>查询</Button>
                <Button type="primary" onClick={AddShowModel} style={{ marginLeft: 15 }} >新增</Button>
            </div>
            <Table style={{marginTop:20}} columns={columns} dataSource={data} 
                pagination={pageHelper}
                onChange={pageChange} />
            <Modal title={companyTitle} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                footer={null}
                destroyOnClose="false"
            >
                <SubCompany  subComPany={subComPany}>{Start}</SubCompany>
            </Modal>
        </div>

    )
}
