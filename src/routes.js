"use strict"
//IMPORT React
import React from 'react';

//IMPORT Router
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

//Import React Pages
import Main from './main';

// Importing Page Components
import Login from './components/pages/login';
import About from './components/pages/about';
import TeamInfo from './components/pages/teamInfo';
import UserAdmin from './components/pages/userAdmin';
import Transaction from './components/pages/transaction';

// Importing Authentiction Check components
import CheckIsLogged from './components/authentication/checkIsLogged';
import Logout from './components/authentication/logout';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={TeamInfo} />
      <Route path="/about" component={About}/>
      <Route path="/login" component={Login} />

      <Route component={CheckIsLogged}>
        <Route path="/admin" component={UserAdmin} />
        <Route path="/transfer" component={Transaction} />
        <Route path="/logout" component={Logout} />
      </Route>

    </Route>
  </Router>
)

export default routes;
