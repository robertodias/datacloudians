// IMPORT AXIOS
import axios from 'axios';

// LOGIN WITH AN USER
export function postLogin(user) {
  return function postLoginAction(dispatch) {
    axios.post('/api/login', user)
      .then(function postLoginSucess(response) {
        dispatch({type: 'POST_LOGIN', user: response.data});
      })
      .catch(function postLoginError() {
        dispatch({type: 'POST_LOGIN_REJECTED', payload: 'There was an error during the LOGIN.'});
      });
  };
}

// RESET SAVE USERS FORM BUTTON
export function resetLoginButtonForm() {
  return { type: 'RESET_LOGIN_BUTTON' };
}

// LOAD USER FROM COOKIE
export function checkAuth() {
  return function checkAuthAction(dispatch) {
    axios.get('/api/checkAuth')
      .then(function checkAuthSuccess(response) {
        dispatch({type: 'POST_LOGIN', user: response.data});
      })
      .catch(function checkAuthError() {
        dispatch({type: 'GET_CHECK_AUTH_ERROR', payload: null});
      });
  };
}

// Previous URL stored for redirect after login
export function setRedirectUrl(url) {
  return { type: 'SET_REDIRECT_URL', url: url };
}

// Logout action
export function logout() {
  return function logoutAction(dispatch) {
    axios.get('/api/logout')
      .then(function logoutSuccess() {
        dispatch({type: 'GET_LOGOUT', user: null});
      })
      .catch(function logouError() {
        dispatch({type: 'GET_LOGOUT_ERROR', payload: 'Unable to logout.'});
      });
  };
}

// Logout Modal Actions
export function openLogoutModal() {
  return { type: 'OPEN_LOGOUT_MODAL', showLogoutModal: true };
}

export function closeLogoutModal() {
  return { type: 'CLOSE_LOGOUT_MODAL', showLogoutModal: false };
}
