import React from 'react'
import { Tree } from 'antd';
export default function Permissions() {

          
      
    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
      };
    
      const onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
      };
    
    const treeData = [
        {
          title: '全部',
          key: '0-0',
          children: [
            {
              title: '公司目录',
              key: '0-0-0',              
              children: [
                {
                  title: '新增',
                  key: '0-0-0-0',
                //   disableCheckbox: true,
                },
                {
                  title: '修改',
                  key: '0-0-0-1',
                },
              ],
            },
            {
              title: '行政管理',
              key: '0-0-1',
              children: [
                {
                  title:'行政区域',
                  key: '0-0-1-0',
                  children: [
                    {
                      title: '新增',
                      key: '0-0-0-3',
                    //   disableCheckbox: true,
                    },
                    {
                      title: '修改',
                      key: '0-0-0-4',
                    },
                  ]
                },{
                  title:'行政档案',
                  key: '0-0-1-04',
                  children: [
                    {
                      title: '新增',
                      key: '0-0-0-13',
                    //   disableCheckbox: true,
                    },
                    {
                      title: '修改',
                      key: '0-0-0-24',
                    },
                  ]
                },
              ],
            },
          ],
        },
      ];

        return (
          <Tree
            checkable
            defaultExpandedKeys={['0-0-0', '0-0-1']}
            defaultSelectedKeys={['0-0-0', '0-0-1']}
            defaultCheckedKeys={['0-0-0', '0-0-1']}
            onSelect={onSelect}
            onCheck={onCheck}
            treeData={treeData}
          />
        );
}
