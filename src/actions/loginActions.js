"use strict"

//IMPORT AXIOS
import axios from 'axios';

//LOGIN ACTIONS

//LOGIN WITH AN USER
export function postLogin(user) {
  return function(dispatch){
    axios.post("/api/login", user)
    .then(function(response){
      dispatch({type:"POST_LOGIN", user:response.data})
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

// LOAD USER FROM COOKIE
export function checkAuth() {
  return function(dispatch){
    axios.get("/api/checkAuth")
    .then(function(response){
      dispatch({type:"POST_LOGIN", user:response.data})
    })
    .catch(function(err) {
      dispatch({type:"POST_LOGIN_REJECTED", payload:"Authentication error."})
    })
  }
}

export function setRedirectUrl(url) {
  dispatch({ type:"SET_REDIRECT_URL", url: url });
}
