import React, {useState} from 'react';
import {Breadcrumb, Button, Divider, Layout, Menu} from 'antd';
import './App.less';
import {Content, Footer, Header} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];

function App() {

  return (
      <Layout
          style={{
              minHeight: '100vh',
          }}
      >
          <Sider width={172}>
              <div style={{height: '60px', color:'#fff',padding: '20px'}}>LOGO</div>
              <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} />
          </Sider>
          <Layout className="site-layout">
              <Header/>
              <Content>
                  <div className={'content-layout'}>
                      Bill is a cat.
                  </div>
              </Content>
          </Layout>
      </Layout>
  );
}


export default App;
