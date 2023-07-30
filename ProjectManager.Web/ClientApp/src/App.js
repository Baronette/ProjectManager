import React, { Component } from 'react';
import { Route } from 'react-router';
import Home from './Pages/Home';
import Layout from './components/Layout'
import { AuthorizationContextComponent } from './components/AuthorizationContext';
import Login from './Pages/Login';
import Register from './Pages/Register';
import PrivateRoute from './components/PrivateRoute';
import Logout from './Pages/Logout';
import Completed from './Pages/Completed';
import ViewProjectDetail from './ViewProjectDetail';


export default class App extends Component {

  render() {
    return (
      <AuthorizationContextComponent>
        <Layout>
          <PrivateRoute exact path='/' component={Home} />
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <PrivateRoute exact path='/logout' component={Logout}/>
          <PrivateRoute exact path='/completed' component={Completed}/>
          <PrivateRoute exact path='/viewProjectDetail' component={ViewProjectDetail}/>
        </Layout>
      </AuthorizationContextComponent>
    );
  }
}
