import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import Cookie from 'js-cookie';
import Loading from '@components/loading';

const AsyncLogin = Loadable({
  loader: () => import('@app/login'),
  loading: Loading,
  delay: 300,
})

const AsyncHome = Loadable({
  loader: () => import('@app/home'),
  loading: Loading,
  delay: 300,
})

class LayOutRoute extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => (Cookie.get('SystemToken') ? <AsyncHome /> : <Redirect to="/login" />)} />
        <Route exact path="/login" component={AsyncLogin} />
        <Route
          path="/"
          render={() => (Cookie.get('SystemToken') ? <AsyncHome /> : <Redirect to="/login" />)}
        />
      </Switch>
    );
  }
}

export default LayOutRoute;