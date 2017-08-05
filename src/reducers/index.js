"use strict"
import {combineReducers} from 'redux';

//HERE WE IMPORT OUR REDUCERS TO BE COMBINED
import {userReducers} from './userReducers';
import {transactionReducers} from './transactionReducers';

//HERE WE COMBINE THE REDUCERS
export default combineReducers({
  user: userReducers,
  transaction: transactionReducers
})
