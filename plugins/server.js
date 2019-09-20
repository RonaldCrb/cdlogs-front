import Axios from 'axios'

const dev = false
const prodUrl = 'https://afternoon-sea-22983.herokuapp.com/api/v1'
const localUrl = 'http://localhost:3001/api/v1'
const theUrl = dev ? localUrl : prodUrl

// Authentication Routes
export const signIn = payload => {
  return Axios.post(`${theUrl}/cdAuth/cdSignIn`, payload)
}

export const signUp = payload => {
  return Axios.post(`${theUrl}/cdAuth/cdSignUp`, payload)
}

export const verifyAuth = payload => {
  return Axios.post(`${theUrl}/cdAuth/verifyAuth`, payload)
}
