"use strict"

const initialState = {
  user: null,
  redirectUrl: '/' // default url to redirect after login
};

export function loginReducers(state=initialState, action){
  switch (action.type) {

    case "POST_LOGIN":
      return {...state,
              user: action.user,
              msg: 'Welcome!',
              style: 'success',
              validation: 'success'}
      break;

    case "POST_LOGIN_REJECTED":
        return {...state,
                msg: 'Invalid Email or Password!',
                style: 'danger',
                validation: 'error'}
        break;

    case "RESET_LOGIN_BUTTON":
        return {...state,
                msg: null,
                style: 'primary',
                validation: null
              }
        break;

    case "RESET_LOGIN_BUTTON":
        return {...state,
                redirectUrl: action.url,
              }
        break;

    case "GET_LOGOUT":
      return  {...state,
                user: null
              }
      break;

    case "GET_CHECK_AUTH_ERROR":
      return {...state,
            user: null,
            msg: null,
            style: 'primary',
            validation: null}
      break;

    case "OPEN_LOGOUT_MODAL":
      return {...state,
              showLogoutModal: true}
      break;

    case "CLOSE_LOGOUT_MODAL":
      return {...state,
              showLogoutModal: false,
              redirectUrl: "/"}
      break;
  }

  return state;
}
