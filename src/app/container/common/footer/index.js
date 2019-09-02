import React, { memo, } from 'react';
import { Layout, } from 'antd';
import { SystemConfig, } from '@utils';

import './index.less';

const { Footer } = Layout;

function AppFooter() {
  return (
    <Footer className="app-footer">
      <div>{SystemConfig.CopyRight}</div>
    </Footer>
  );
}

export default memo(AppFooter);