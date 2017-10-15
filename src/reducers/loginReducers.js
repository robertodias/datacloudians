const initialState = {
  user: null,
  redirectUrl: '/', // default url to redirect after login
};

export function loginReducers(state = initialState, action) {
  switch (action.type) {
  case 'POST_LOGIN':
    return {
      ...state,
      user: action.user,
      msg: 'Welcome!',
      style: 'success',
      validation: 'success',
    };

  case 'POST_LOGIN_REJECTED':
    return {
      ...state,
      msg: 'Invalid Email or Password!',
      style: 'danger',
      validation: 'error',
    };

  case 'RESET_LOGIN_BUTTON':
    return {
      ...state,
      msg: null,
      style: 'primary',
      validation: null,
      redirectUrl: action.url,
    };

  case 'GET_LOGOUT':
    return  {
      ...state,
      user: null,
    };

  case 'GET_CHECK_AUTH_ERROR':
    return {
      ...state,
      user: null,
      msg: null,
      style: 'primary',
      validation: null,
    };

  case 'OPEN_LOGOUT_MODAL':
    return {
      ...state,
      showLogoutModal: true,
    };

  case 'CLOSE_LOGOUT_MODAL':
    return {
      ...state,
      showLogoutModal: false,
      redirectUrl: '/',
    };

  default:
    break;
  }

  return state;
}
