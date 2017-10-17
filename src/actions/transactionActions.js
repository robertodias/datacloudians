// IMPORT AXIOS
import axios from 'axios';

// USERS ACTIONS

// LOAD AN TRANSACTION
export function getTransaction() {
  return function getTransactionAction(dispatch) {
    axios.get('/api/transaction')
      .then(function getTransactionSuccess(response) {
        dispatch({type: 'GET_TRANSACTION', payload: response.data});
      })
      .catch(function getTransationError() {
        dispatch({type: 'GET_TRANSACTION_REJECTED', msg: 'Error when getting the TRANSACTION.'});
      });
  };
}

// CREATE AN TRANSACTION
export function postTransaction(transaction) {
  return function postTransactionAction(dispatch) {
    axios.post('/api/transaction', transaction)
      .then(function postTransactionSuccess(response) {
        if (response.data.error) {
          throw new Error(response.data.error);
        }
        dispatch({type: 'POST_TRANSACTION', payload: response.data});
      })
      .catch(function postTransactionError() {
        dispatch({type: 'POST_TRANSACTION_REJECTED', payload: 'There was an error creating a new TRANSACTION.'});
      });
  };
}

// RESET SAVE USERS FORM BUTTON
export function resetSaveButtonForm() {
  return { type: 'RESET_TRANSACTION_BUTTON' };
}
