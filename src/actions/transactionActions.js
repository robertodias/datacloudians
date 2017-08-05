"use strict"

//IMPORT AXIOS
import axios from 'axios';

//USERS ACTIONS

//LOAD AN TRANSACTION
export function getTransaction() {
  return function(dispatch) {
    axios.get("/api/transaction")
      .then(function(response) {
        dispatch({type:"GET_TRANSACTION", payload:response.data})
      })
      .catch(function(err){
        dispatch({type:"GET_TRANSACTION_REJECTED", msg:'Error when getting the TRANSACTION.'})
      })
  }
}

//CREATE AN TRANSACTION
export function postTransaction(transaction) {
  return function(dispatch) {
    axios.post("/api/transaction", transaction)
    .then(function(response){
      if(response.data.error) {
        throw new Error (response.data.error);
      };
      dispatch({type:"POST_TRANSACTION", payload:response.data})
    })
    .catch(function(err) {
      dispatch({type:"POST_TRANSACTION_REJECTED", payload:"There was an error creating a new TRANSACTION."})
    })
  }
}

//RESET SAVE USERS FORM BUTTON
export function resetSaveButtonForm() {
  return { type:"RESET_TRANSACTION_BUTTON" }
}
