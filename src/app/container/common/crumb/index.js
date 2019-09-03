import React, { PureComponent } from 'react';
import { Breadcrumb } from 'antd';

import './index.less';

class Crumb extends PureComponent {
  render() {
    return <Breadcrumb className="app-crumb">
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>List</Breadcrumb.Item>
      <Breadcrumb.Item>App</Breadcrumb.Item>
    </Breadcrumb>;
  }

}

export default Crumb;