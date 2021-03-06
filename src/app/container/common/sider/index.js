import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link, } from 'react-router-dom';

import './index.less';

const { Sider } = Layout;

class AppSider extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Sider className="sider-wrapper" collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          className="left-menu"
        >
          <Menu.Item key="1">
            <Icon type="user" />
            <span>nav 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span>nav 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload" />
            <Link to="/video">Video</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default AppSider;
