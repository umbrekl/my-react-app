import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import { Layout } from 'antd';

import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'

import Home from '../../views/sandbox/home/Home'
import UserList from '../../views/sandbox/user-manage/UserList'
import RoleList from '../../views/sandbox/right-manage/RoleList'
import RightList from '../../views/sandbox/right-manage/RightList'
import NoPermission from '../../views/sandbox/nopermission/NoPermission'
import './NewsSandBox.css'
const { Content } = Layout

export default function NewsSandBox() {
  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout>
        <TopHeader></TopHeader>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/user-manage/list" component={UserList} />
            <Route path="/right-manage/role/list" component={RoleList} />
            <Route path="/right-manage/right/list" component={RightList} />

            <Redirect from="/" to="/home" exact />
            <Route path="*" component={NoPermission} />
          </Switch>
          </Content> 
      </Layout>
    </Layout>
  )
}
