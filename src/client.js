// IMPORT React
import React from 'react';
import {render} from 'react-dom';

// IMPORT provider to connect React and redux
import {Provider} from 'react-redux';

// IMPORT redux
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// IMPORT CUSTOM REDUCERS
import reducers from './reducers/index';

// Import SERVER SIDE ROUTES
import routes from './routes';

// STEP 0 when Using Middleware to enhance Console log
const middleware = applyMiddleware(thunk, logger);

// STEP 1 Create the Store
// window.INITIAL_STATE is a global variable to capture initial state from REDUX_STORE
const initialState = window.INITIAL_STATE;

// LOAD STATE FROM THE SERVER
const store = createStore(reducers, initialState, middleware);

const Routes = (
  <Provider store={store}>
    {routes}
  </Provider>
);

render(
  Routes, document.getElementById('app')
);
