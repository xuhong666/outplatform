import React,{useState,useEffect} from 'react'
import { Table,Space,Input,Button,Modal, message} from 'antd';
import {reqQueryUser} from '../../api'
import Permissions from '../../components/permissions/permissions'
import SubUser from '../../components/user/user'
import './index.less'
export default function User() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalGuVisible, setisModalGuVisible] = useState(false);
  const [data,setData]=useState([]);
  const [state,setState]=useState('');
  const [pageHelper,setpageHelper]= useState();
  const [UserTitle, setUserTitle] = useState();
  const [subUsers, setsubUsers] = useState();
  const user ={
    Id:'',
    Account:'',
    PassWord:'',
    UserName:'',
    GuBelongUnitIDid:'',
    Mobile:'',
    UserState:0,
    Verificationmethod:0,
    PageIndex:1,
    PageSize:10,
  }
  const pageHelperInfo={
    PageIndex:1,
    PageSize:10,
    total:0
  }
  const pageChange = (currentPage) => {    
    user.PageSize =currentPage.pageSize;
    user.PageIndex =currentPage.current;
    Query(user);
  } 
 
  useEffect(()=>{        
      Query(user);
    },[])   

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleOk = () => {
    setIsModalVisible(true);
  };

  const handleGuCancel = () => {
    setisModalGuVisible(false);
  };
 
  const Query=async(user)=>{     
       user.UserName=state;
       var resp = await reqQueryUser(user);  
       if(resp.IsSuccess)
       {
          setData(resp.Data);         
          pageHelperInfo.total =resp.Total
          setpageHelper(pageHelperInfo)
       }else{
         message.error(resp.Msg);
         return;
       }     
  }
  const inputChange=(e)=>
  {
      let val=e.target.value;
      setState(val);
  }  
  //查询
  const userQueryClick=()=>{
     Query(user);
  }
  //新增
  const userAddClick=()=>{
    setUserTitle("新增用户");
    setsubUsers({'start':1,'user':''})
    setisModalGuVisible(true);
  }
  //修改
  const reviseUserClick=(values)=>{
    setUserTitle("修改用户");
    setsubUsers({'start':2,'user':values})
    setisModalGuVisible(true);
  }

  const columns = [
    {      
      title: ' 序号 ',
      render: (text, record, index) => `${index + 1}`,  //每一页都从1开始
    }, 
    {      
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      className:"notshow" 
    }, 
    {
      
      title: '用户名',
      dataIndex: 'Account',
      key: 'Account'
    }, 
    {
      title: '用户姓名',
      dataIndex: 'UserName',
      key: 'UserName',
    },
    {
      title: '所属单位',
      key: 'CompanyName',
      dataIndex: 'CompanyName',
    },{
      title: '手机号码',
      key: 'Mobile',
      dataIndex: 'Mobile',
    },{
      title: '用户状态',
      key: 'UserState',
      dataIndex:'UserStateName',
    },{
      title: '认证方式',
      key: 'Verificationmethod',
      dataIndex: 'VerificationmethodName',
    },{
      title: '创建时间',
      key: 'CreateTime',
      dataIndex: 'CreateTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={()=>reviseUserClick(record)}>修改</a>
          <a onClick={handleOk}>分配权限</a>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div className='user'> 
      <Input style={{width:300}} placeholder="请输入姓名" onChange={(e)=>inputChange(e)} />
      <Button style={{marginLeft:10}} onClick={userQueryClick} type="primary">查询</Button>
      <Button style={{marginLeft:10}} onClick={userAddClick}  type="primary">新增</Button>
      </div>
      <Table columns={columns} dataSource={data} onChange={pageChange}  pagination={pageHelper}/>
      <Modal title="分配权限" visible={isModalVisible}  onCancel={handleCancel}
      footer={null}
      destroyOnClose="false">
         <Permissions/>
      </Modal>
      <Modal title={UserTitle} visible={isModalGuVisible} onOk={handleOk}  onCancel={handleGuCancel}
       footer={null}
       destroyOnClose="false">        
         <SubUser>{subUsers}</SubUser>
      </Modal>
    </div>
  )
}
