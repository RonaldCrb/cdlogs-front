import Axios from 'axios'
import Cookie from 'js-cookie'

const theUrl = process.env.CDLOGS_API_URL || 'http://cdlogs-api:3001'

let token;
let userId;

// Authentication Routes
export const signIn = payload => {
  return Axios.post(`${theUrl}/auth/signIn`, payload)
}

export const signUp = payload => {
  return Axios.post(`${theUrl}/auth/signUp`, payload)
}

export const verifyAuth = payload => {
  return Axios.post(`${theUrl}/auth/verifyAuth`, payload)
}

// Smartlogs Routes
export const getSmartlogs = () => {
  token = Cookie.get('idToken')
  userId = Cookie.get('idUser')
  let axiosConfig = {
    headers: {
      Authorization: "Bearer " + token,
      UserId: userId
    }
  }
  return Axios.get(`${theUrl}/smartlogs`, axiosConfig)
}

export const createSmartlog = smartlog => {
  token = Cookie.get('idToken')
  userId = Cookie.get('idUser')
  let axiosConfig = {
    headers: {
      Authorization: "Bearer " + token,
      UserId: userId
    }
  }
  return Axios.post(`${theUrl}/smartlogs`, smartlog, axiosConfig)
}

export const deleteSmartlog = id => {
  token = Cookie.get('idToken')
  userId = Cookie.get('idUser')
  let axiosConfig = {
    headers: {
      Authorization: "Bearer " + token,
      UserId: userId
    }
  }
  return Axios.delete(`${theUrl}/smartlogs/${id}`, axiosConfig)
}

// userdata Routes
export const getUserData = () => {
  token = Cookie.get('idToken')
  userId = Cookie.get('idUser')
  let axiosConfig = {
    headers: {
      Authorization: "Bearer " + token,
      UserId: userId
    }
  }
  return Axios.get(`${theUrl}/users/${userId}`, axiosConfig)
}

// Updates user data in database, work with all forms
export const updateUserData = (certification) => {
  token = Cookie.get('idToken')
  userId = Cookie.get('idUser')
  let axiosConfig = {
    headers: {
      Authorization: "Bearer " + token,
      UserId: userId
    }
  }
  return Axios.put(`${theUrl}/users/${userId}`, certification, axiosConfig)
}
