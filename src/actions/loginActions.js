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
      dispatch({type:"GET_CHECK_AUTH_ERROR", payload:null})
    })
  }
}

// Previous URL stored for redirect after login
export function setRedirectUrl(url) {
  return { type:"SET_REDIRECT_URL", url: url };
}

// Logout action
export function logout() {
  return function(dispatch) {
    axios.get("/api/logout")
    .then(function(response){
      dispatch({type:"GET_LOGOUT", user:null})
    })
    .catch(function(err) {
      dispatch({type:"GET_LOGOUT_ERROR", payload:"Unable to logout."})
    })
  }
}

// Logout Modal Actions
export function openLogoutModal() {
  return { type : "OPEN_LOGOUT_MODAL", showLogoutModal : true };
}

export function closeLogoutModal() {
  return { type : "CLOSE_LOGOUT_MODAL", showLogoutModal : false };
}
