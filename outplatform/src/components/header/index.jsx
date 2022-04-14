import { Modal} from 'antd';
import { NavLink,useNavigate } from 'react-router-dom';
import './index.less'
import storageUtils from '../../utils/storageUtils';
import memoryutils from '../../utils/memoryUtils'
export default function Header() {
  const navigate = useNavigate()  
    const logout=()=>{
        Modal.confirm({
          content:'确定退出吗？',
          onOk:()=>{
            console.log('ok');
            storageUtils.remover();
            memoryutils.user ={}
            navigate('/login')           
          },
           onCancel(){    
             console.log('first')
           }
    
        })      
      }
    return (
        <div className='header' >
          <div className='header-top'>
             <span>欢迎,admin</span>
             {/* <a  href='#'  onClick={logout}>退出</a> */}
             <NavLink to="" onClick={logout} >退出</NavLink>
          </div>
          <div className='header-bottom'>
             <div className='header-bottom-left'>首页</div> 
             {/* <div className='header-bottom-right'></div>  */}
          </div>
        </div>
      );
}
