import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import 'antd/dist/antd.less';
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
export default function App() {
  return ( 
   <BrowserRouter>
   <Routes>        
      {/* 如果path 默认不加/* 子页面会跳转空白*/}
      <Route exact path="/*" element={<Admin/>}/>
      <Route path="/Login"  element={<Login/>} />
      <Route path="/Admin"  element={<Admin/>} />      
    </Routes>
    </BrowserRouter>
  )
}