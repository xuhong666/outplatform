import { Layout } from 'antd';
import { Route,Routes} from 'react-router-dom';
import  Header from '../../components/header';
import  LeftNav from '../../components/left-nav';
//import  memoryutils from '../../utils/memoryUtils'
import Home from '../home/home'
import User from '../user'
import Role from '../role'
import Company from '../company/company'
import AdministrativeAreas from '../administrativeAreas/administrativeAreas'
import Administrativefiles from '../administrativefiles/administrativefiles'
import Customer  from '../customer/customer'

const {Footer, Sider, Content } = Layout;
export default function admin() {
  //const  user =memoryutils.user;
  return (
    <Layout style={{height:'100%'}} >
    <Sider><LeftNav/></Sider>
    <Layout>
      <Header><Header/>      
      </Header>
      <Content style={{margin:20,backgroundColor:'#fff'}}>  
        <Routes>      
         <Route path='/*' element={<Company/>}/>
          {/* <Route path='/home' element={<Home/>} /> */}
          <Route path='/user'  element={<User/>}/>
          {/* <Route path='/role'  element={<Role/>}/> */}
          <Route path='/company'  element={<Company/>}/>
          <Route path='/administrativeAreas' element={<AdministrativeAreas/>}/>
          <Route path='/administrativefiles' element={<Administrativefiles/>}/>
          <Route path='/customer' element={<Customer/>}/>
       </Routes>
      </Content>
      <Footer style={{textAlign:'center',color:'#cccccc'}} >推荐使用</Footer>
    </Layout>
    </Layout>
  )
}
