"use strict"


export function userReducers(state={user:[]}, action){
  switch (action.type) {

    case "GET_USER":
      return {...state, user: [...action.payload]}
      break;

    case "POST_USER":
      return {...state,
              user: [...state.user, ...action.payload],
              msg: 'Saved, continue.',
              style: 'success',
              validation: 'success'}
      break;

    case "POST_USER_REJECTED":
        return {...state,
                msg: 'Please, try again later.',
                style: 'danger',
                validation: 'error'}
        break;

    case "RESET_USER_BUTTON":
        return {...state,
                msg: null,
                style: 'primary',
                validation: null
              }
        break;

    case "DELETE_USER":
      const currentUserToDelete = [...state.user]
      const indexToDelete = currentUserToDelete.findIndex(
        function(user){
          return user._id == action.payload;
        }
      )
      return {user: [...currentUserToDelete.slice(0, indexToDelete),
         ...currentUserToDelete.slice(indexToDelete+1)]}
      break;

  }
  return state;
}
