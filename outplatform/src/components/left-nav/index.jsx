import React from 'react'
import { Link} from 'react-router-dom'
import { Menu} from 'antd';
import {
  DesktopOutlined
} from '@ant-design/icons';
import menuList from '../../config/menuConfig'
import './index.less'
import logo from  '../../assets/images/logo192.png'
const {SubMenu} = Menu;
export default function LeftNav(props) {   
  const  path =window.location.pathname;
  const getMenuNodes =(menuList)=>{
     return menuList.map(item=>{
        if(!item.children)
         {
            return(
              <Menu.Item key={item.key}  icon={<DesktopOutlined />}>
              <Link  to={item.key}>                 
                 <span>{item.title}</span>
              </Link >
            </Menu.Item>       
            )
         }else{
            return(
              <SubMenu key={item.key} icon={<DesktopOutlined/>} title={item.title}>
                {getMenuNodes(item.children)}                
              </SubMenu>              
            )
         }
     })
  }

  return (    
    <div className='left-nav'>
      <Link to='/' className='left-nav-header' >
         <img  src={logo}  alt='logo'/>
         <h1>外联平台</h1>
      </Link>
      <Menu
          defaultOpenKeys={['home']}
          selectedKeys={[path]}                      
          mode="inline"
          theme="dark"          
        >         
        {getMenuNodes(menuList)}
        </Menu>
    </div>
  )
}
