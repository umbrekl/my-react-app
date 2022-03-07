import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import './index.css'
import { withRouter } from 'react-router-dom';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import axios from 'axios';
const { Sider } = Layout;
const { SubMenu } = Menu;

const iconList = {
  '/home': <UserOutlined/>,
  '/user-manage': <VideoCameraOutlined/>,
  '/right-manage': <UserOutlined/>,
}
function SideMenu(props) {
  const [menu, setMenu] = useState([])
  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then(res => {
      // console.log(res.data)
      setMenu(res.data)
    })
  }, [])
  const renderMenu = (menuList) => {
    return menuList.map(item => {
      if (item.children?.length && checkPagePermisson(item)) {
        return <SubMenu key={item.key} icon={iconList[item.key]} title={item.title}>
          {
            renderMenu(item.children)
          }
        </SubMenu>
      }
      return checkPagePermisson(item) && <Menu.Item key={item.key} icon={item.icon} onClick={() => {
        props.history.push(item.key)
      }}>{item.title}</Menu.Item>
    })
  }
  const checkPagePermisson = (item) => {
    return item.pagepermisson === 1
  }
  const selectKeys = [props.location.pathname]
  const openKeys = ['/' + props.location.pathname.split('/')[1]]
  return (
    <Sider trigger={null} collapsible>
      <div style={{display: 'flex',height: '100%','flexDirection': 'column'}}>
        <div className="logo">全球新闻发布系统</div>
        <div style={{flex: 1, 'overflow': 'auto'}}>
          <Menu defaultOpenKeys={openKeys} theme="dark" mode="inline" selectedKeys={selectKeys}>
            {
              renderMenu(menu)
            }
          </Menu>
        </div>
      </div>
      
    </Sider>
  )
}

export default withRouter(SideMenu)
