"use strict"

//IMPORT AXIOS
import axios from 'axios';

//LOGIN ACTIONS

//LOGIN WITH AN USER
export function postLogin(user) {
  return function(dispatch){
    axios.post("/api/login", user)
    .then(function(response){
      dispatch({type:"POST_LOGIN", payload:response.data})
    })
    .catch(function(err) {
      dispatch({type:"POST_LOGIN_REJECTED", payload:"There was an error during the LOGIN."})
    })
  }
}

//RESET SAVE USERS FORM BUTTON
export function resetLoginButtonForm() {
  return { type:"RESET_LOGIN_BUTTON" }
}
