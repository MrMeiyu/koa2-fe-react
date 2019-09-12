import React, { Component } from 'react';
import { Route, Switch, Redirect, } from 'react-router-dom';
import { loadScript } from '@utils/helpers';
import Cookie from 'js-cookie';

// import Loading from '@components/loading';
import Login from '@app/login';
// import Home from '@app/home';
import Layout from '@app/container/layout';
// import VideoView from '@app/container/page/video-view';

class LayOutRoute extends Component {
  componentDidMount() {
    const localColor = localStorage.getItem('themeColor');
    if(localColor){
      this.onChangeComplete(localColor);
    }
  }

  // 更换主题色函数
  onChangeComplete = (sketchColor) => {
    const changeColor = () => {
      window.less
      .modifyVars({
        '@primary-color': sketchColor,
      })
      .then(() => {
        localStorage.setItem('themeColor',sketchColor);
      });
    };
    window.less = {
      async: true,
      javascriptEnabled: true,
    };
    loadScript('/lib/less.min.js').then(() => {
      changeColor();
    });
  }

  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" render={() => (Cookie.get('token') ? <Layout /> : <Redirect to="/login" />)} />
      </Switch>
    );
  }
}

export default LayOutRoute;