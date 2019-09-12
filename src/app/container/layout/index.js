import React, { Component, } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { inject, observer,} from 'mobx-react';
import { Layout, } from 'antd';
import Sider from '../common/sider';
import Header from '../common/header';
import Crumb from '../common/crumb';
import Footer from '../common/footer';
import { ChildrenRoutes, } from '../route';

import './index.less';

const { Content, } = Layout;

@withRouter
@inject('userState')
@observer
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
                <Switch>
                  {
                    ChildrenRoutes.map((route, index) => (
                      <Route key={index} path={route.path} component={route.component} exact={route.exact} />
                    ))
                  }
                </Switch>
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
