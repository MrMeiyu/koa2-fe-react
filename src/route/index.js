import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Cookie from 'js-cookie';

// import Loading from '@components/loading';
import Login from '@app/login';
import Home from '@app/home';

class LayOutRoute extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => (Cookie.get('SystemToken') ? <Home /> : <Redirect to="/login" />)} />
        <Route exact path="/login" component={Login} />
        <Route
          path="/"
          render={() => (Cookie.get('SystemToken') ? <Home /> : <Redirect to="/login" />)}
        />
      </Switch>
    );
  }
}

export default LayOutRoute;