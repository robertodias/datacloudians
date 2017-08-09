"use strict"


export function loginReducers(state={user:[]}, action){
  switch (action.type) {

    case "POST_LOGIN":
      return {...state,
              user: [...state.user, ...action.payload],
              msg: 'Welcome!',
              style: 'success',
              validation: 'success'}
      break;

    case "POST_LOGIN_REJECTED":
        return {...state,
                msg: 'Please, try again later.',
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

  }
  return state;
}
