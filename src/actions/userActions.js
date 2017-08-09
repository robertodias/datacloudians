"use strict"

//IMPORT AXIOS
import axios from 'axios';

//USERS ACTIONS

//LOAD AN USER
export function getUser() {
  return function(dispatch){
    axios.get("/api/user")
      .then(function(response) {
        dispatch({type:"GET_USER", payload:response.data})
      })
      .catch(function(err){
        dispatch({type:"GET_USER_REJECTED", msg:'Error when getting the USER.'})
      })
  }
}

//CREATE AN USER
export function postUser(user) {
  return function(dispatch){
    axios.post("/api/user", user)
    .then(function(response){
      dispatch({type:"POST_USER", payload:response.data})
    })
    .catch(function(err) {
      dispatch({type:"POST_USER_REJECTED", payload:"There was an error creating a new USER."})
    })
  }
}

//DELETE AN USER
export function deleteUser(id) {
  return function(dispatch){
    axios.delete("/api/user/" + id)
    .then(function(response) {
      dispatch({type:"DELETE_USER", payload:id })
    })
    .catch(function(err) {
      dispatch({type:"DELETE_USER_REJECTED", payload:"There was an error while deleting an USER."})
    })
  }
}

//RESET SAVE USERS FORM BUTTON
export function resetSaveButtonForm() {
  return { type:"RESET_USER_BUTTON" }
}
