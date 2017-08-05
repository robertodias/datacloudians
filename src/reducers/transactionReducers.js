"use strict"


export function transactionReducers(state={transaction:[]}, action){
  switch (action.type) {

    case "GET_TRANSACTION":
      return {...state, transaction: [...action.payload]}
      break;

    case "POST_TRANSACTION":
      return {...state,
              transaction: [...state.transaction, ...action.payload],
              msg: 'Saved, continue.',
              style: 'success',
              validation: 'success'}
      break;

    case "POST_TRANSACTION_REJECTED":
        return {...state,
                msg: 'Please, try again later.',
                style: 'danger',
                validation: 'error'}
        break;

    case "RESET_TRANSACTION_BUTTON":
        return {...state,
                msg: null,
                style: 'primary',
                validation: null
              }
        break;

  }
  return state;
}
