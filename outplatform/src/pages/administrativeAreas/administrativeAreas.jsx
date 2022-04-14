import React,{useState} from 'react'
import { Table,Space,Button,Modal} from 'antd';
import SubAdministrativeAreas from '../../components/administrativemanage/administrativeAreas'
import '../administrativeAreas/index.less'
/* 行政区域*/
export default function AdministrativeAreas() {
     const [isModalVisible,setisModalVisible] =useState(false)
     const [companyTitle,setcompanyTitle] =useState()
     const  upAreasClick =()=>{
        setcompanyTitle('修改区域信息')
        setisModalVisible(true)
    }
    const  addAreasClick=()=>{
        setcompanyTitle('新增区域信息')
        setisModalVisible(true)
    }
    const handleCancel = () => {
        setisModalVisible(false);
    };
     
    const columns = [
        {
          title: '区域编码',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '区域名称',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <a onClick={upAreasClick} >修改</a>
            </Space>
          ),
        },
      ];
      
      const data = [
        {
          key: '1',
          name: 'John Brown',
          age: 32       
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32
        },
      ];
    return (
     <div>
       <div  className='areas'><Button type="primary"  onClick={addAreasClick} >新增</Button></div>
       <Table columns={columns} dataSource={data} />
       <Modal title={companyTitle} visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                destroyOnClose="false">
                 <SubAdministrativeAreas/>
       </Modal>
      

     </div>
     )
   
}
