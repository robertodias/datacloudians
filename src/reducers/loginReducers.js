"use strict"

const initialState = {
  user: null,
  redirectURL: '/' // default url to redirect after login
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
  }
  return state;
}
