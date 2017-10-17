// IMPORT AXIOS
import axios from 'axios';

// LOAD AN USER
export function getUser() {
  return function getUserAction(dispatch) {
    axios.get('/api/user')
      .then(function getUserSuccess(response) {
        dispatch({type: 'GET_USER', payload: response.data});
      })
      .catch(function getUserError() {
        dispatch({type: 'GET_USER_REJECTED', msg: 'Error when getting the USER.'});
      });
  };
}

// CREATE AN USER
export function postUser(user) {
  return function postUserAction(dispatch) {
    axios.post('/api/user', user)
      .then(function postUserSuccess(response) {
        dispatch({type: 'POST_USER', payload: response.data});
      })
      .catch(function postUserError() {
        dispatch({type: 'POST_USER_REJECTED', payload: 'There was an error creating a new USER.'});
      });
  };
}

// DELETE AN USER
export function deleteUser(id) {
  return function deleteUserAction(dispatch) {
    axios.delete('/api/user/' + id)
      .then(function deleteUserSuccess() {
        dispatch({type: 'DELETE_USER', payload: id });
      })
      .catch(function deleteUserError() {
        dispatch({type: 'DELETE_USER_REJECTED', payload: 'There was an error while deleting an USER.'});
      });
  };
}

// RESET SAVE USERS FORM BUTTON
export function resetSaveButtonForm() {
  return { type: 'RESET_USER_BUTTON' };
}
