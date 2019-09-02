import React, { Component, } from 'react';
// import { Switch } from 'react-router-dom';
import { Layout, } from 'antd';
import Sider from '../common/sider';
import Header from '../common/header';
import Crumb from '../common/crumb';
import Footer from '../common/footer';

const { Content, } = Layout;

class Container extends Component {
  render() {
    return (
      <Layout className="app-container">
        <Sider />
        <Layout className="app-container-box">
          <Header />
          <Content className="app-content">
            <Crumb />
            <div className="app-content-box">
              <div className="app-content-main">
                111
              </div>
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    )
  }
}

export default Container;
