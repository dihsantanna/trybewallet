import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import NotFound from './pages/NotFound';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={ (props) => (<Login { ...props } />) } />
        <Route path="/carteira" component={ Wallet } />
        <Route component={ NotFound } />
      </Switch>
    );
  }
}

export default Routes;
