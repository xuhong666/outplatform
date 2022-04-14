const  menuList =[
  // {
  //   title:'首页',
  //   key:'/home',
  //   icon:'DesktopOutlined',
  // },
  {
    title:'公司目录',
    key:'/company',
    icon:'DesktopOutlined'
  },{
    title:'行政管理',
    key:'/administrativemanage',
    icon:'DesktopOutlined',
    children:[
        {
            title:'行政区域',
            key:'/administrativeAreas',
            icon:'DesktopOutlined', 
        },{
          title:'行政档案',
          key:'/administrativefiles',
          icon:'DesktopOutlined', 
      }
    ]
  },{
    title:'客户基本信息',
    key:'/customer',
    icon:'desktopOutlined',
  },{
    title:'用户管理',
    key:'/user',
    icon:'desktopOutlined',
  },
  // {
  //   title:'权限管理',
  //   key:'/authority',
  //   icon:'DesktopOutlined',
  // }

]
export default menuList;

 