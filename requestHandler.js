"use strict"
import axios from 'axios';
import React from  'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';

import reducers from './src/reducers/index';
import routes from './src/routes';

function handleRender(req, res) {
  axios
    .get('http://localhost:3001/user')
    .then(response => {


      // STEP-1 CREATE REDUX STORE ON SERVER-SIDE
      const store = createStore(reducers)
      // STEP-2 GET INITIAL STATE FROM STORE
      const initialState = JSON.stringify(store.getState())
                          .replace(/<\/script/g,'<\\/script')
                          .replace(/<!--/g, '<\\!--');
      // STEP-3 REACT-ROUTER ON SERVER TO INTERCEPT CLIENT REQUEST AND DEFINE BEHAVIOR
      const Routes = {
        routes: routes,
        location: req.url
      }
      match(Routes, function(error, redirect, props) {
        if (error) {
          res.status(500).send("Error processing the Request.")
        } else if (redirect) {
          res.status(302, redirect.pathname + redirect.search)
        } else if (props) {
          const reactComponent = renderToString (
              <Provider store={store}>
                <RouterContext {...props} />
              </Provider>
          )
          res.status(200).render('index', {reactComponent, initialState})
        } else {
          res.status(404).send("Page Not Found.")
        }
      })


    })
    .catch(error => console.log('#Initial Server-side rendering error'));
}

module.exports = handleRender;
