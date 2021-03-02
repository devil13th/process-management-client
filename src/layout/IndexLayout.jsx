import React from 'react'
import { BrowserRouter, Route,Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

import ProcessInstanceList from '@/components/processinstance/ProcessInstanceList'
import TaskList from '@/components/processinstance/TaskList'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class IndexLayout extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" >
            Process Management
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <SubMenu key="sub1" icon={<UserOutlined />} title="Process Defined">
              <Menu.Item key="3">Process Mgmt. </Menu.Item>
              <Menu.Item key="4">Deploy Process</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Process Instance">
              <Menu.Item key="6"><Link to="/processInstanceList">Instance Mgmt.</Link></Menu.Item>
              <Menu.Item key="8"><Link to="/taskList">Task Query</Link></Menu.Item>
              <Menu.Item key="9">Process Var</Menu.Item>
            </SubMenu>

            <Menu.Item key="1" icon={<PieChartOutlined />}>
              dd
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
           
           
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" >
          
          <Content style={{ margin: '16px 16px 0px' }}>
            
            <div className="site-layout-background" style={{ padding:'8px 24px', minHeight: 360 }}>
              <Route path='/processInstanceList' exact component={ProcessInstanceList}></Route>
              <Route path='/taskList' exact component={TaskList}></Route>
              
            </div>

          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}


export default IndexLayout