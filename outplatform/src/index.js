import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import storageUtils from './utils/storageUtils';
import memoryutils from './utils/memoryUtils'
//读取local中保存user,保存到内存中
const user =storageUtils.getUser();
memoryutils.user =user;
const container = document.getElementById('root');
const root =createRoot(container)
root.render(<App />);
