export function userReducers(state = {user: []}, action) {
  switch (action.type) {
  case 'GET_USER':
    return {
      ...state,
      user: [...action.payload],
    };

  case 'POST_USER':
    return {
      ...state,
      user: [...state.user, ...action.payload],
      msg: 'Saved, continue.',
      style: 'success',
      validation: 'success',
    };

  case 'POST_USER_REJECTED':
    return {
      ...state,
      msg: 'Please, try again later.',
      style: 'danger',
      validation: 'error',
    };

  case 'RESET_USER_BUTTON':
    return {
      ...state,
      msg: null,
      style: 'primary',
      validation: null,
    };

  case 'DELETE_USER':
    const currentUserToDelete = [...state.user];
    const indexToDelete = currentUserToDelete.findIndex(
      function actionDelete(user) {
        return user._id === action.payload;
      }
    );
    return {
      user: [
        ...currentUserToDelete.slice(0, indexToDelete),
        ...currentUserToDelete.slice(indexToDelete + 1),
      ],
    };

  default:
    break;
  }

  return state;
}
