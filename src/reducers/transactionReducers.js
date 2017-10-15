export function transactionReducers(state = {transaction: []}, action) {
  switch (action.type) {
  case 'GET_TRANSACTION':
    return {
      ...state,
      transaction: [...action.payload],
    };

  case 'POST_TRANSACTION':
    return {
      ...state,
      transaction: [...state.transaction, ...action.payload],
      msg: 'Saved, continue.',
      style: 'success',
      validation: 'success',
    };

  case 'POST_TRANSACTION_REJECTED':
    return {
      ...state,
      msg: 'Please, try again later.',
      style: 'danger',
      validation: 'error',
    };

  case 'RESET_TRANSACTION_BUTTON':
    return {
      ...state,
      msg: null,
      style: 'primary',
      validation: null,
    };

  default:
    break;
  }

  return state;
}
