import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { ConfigProvider, } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import './api';
import App from './route'
import Store from './store';

import '@assets/css/common.less';

import * as serviceWorker from './serviceWorker';

// 时区的处理
moment.locale('zh-cn');
window.moment = moment;

ReactDOM.render(
  <HashRouter>
    <Store>
      <ConfigProvider locale={zhCN} csp="code">
        <App />
      </ConfigProvider>
    </Store>
  </HashRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
