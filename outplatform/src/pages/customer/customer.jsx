import React,{useState} from 'react'
import { Input,Button,Table,Space,Modal} from 'antd';
import SubCustomer from  '../../components/customer/customer'
import '../customer/customer.less'

export default function Customer() {
    const [companyTitle, setcompanyTitle] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleCancel = () => {       
        setIsModalVisible(false);
    };
    const addCustomer =()=>{
        setcompanyTitle('新增客户信息')
        setIsModalVisible(true);
    }
    const getCustomer =()=>{
        setcompanyTitle('查询客户信息')
        setIsModalVisible(true);
    }
    const columns = [
        {
          title: '行政区域',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '单位',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '姓名',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '性别',
          key: 'tags',
          dataIndex: 'tags',
        },
        {
            title: '职务',
            key: 'tags',
            dataIndex: 'tags',
        },
        {
            title: '对接单位',
            key: 'tags',
            dataIndex: 'tags',
        },{
            title: '对接人姓名',
            key: 'tags',
            dataIndex: 'tags',
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <a onClick={getCustomer}>查看详情</a>
              <a>修改</a>
              <a>封存</a>
              <a>分配</a>
              <a>删除</a>
            </Space>
          ),
        },
      ];
      
      const data = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ];
  return (
    <div>
       <div className='customer' >
           <Input  className='custharder'  placeholder="请输入姓名" />
           <Input className='custharder' placeholder="请输入公司" />
           <Button className='adcustomer' type="primary">查询</Button>
           <Button className='adcustomer'  onClick={addCustomer}  type="primary">新增</Button>
      </div>
         <Table columns={columns} dataSource={data} />
         <Modal title={companyTitle} visible={isModalVisible}  onCancel={handleCancel}
                footer={null}                
                destroyOnClose="false"
                width={800}>
         <SubCustomer/></Modal>
    </div>
  )
}
