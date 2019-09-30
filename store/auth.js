import Cookie from 'js-cookie' // libreria para manejo de cookies
import { signIn, signUp, verifyAuth, getUserData } from '../plugins/server'
// estado de la aplicacion
export const state = () => ({
  user: null,
  token: null
})

export const getters = {
  currentUser: state => state.user
}

// mutaciones de el estado (cambios de estado sincronos invocados por acciones)
export const mutations = {
  setToken: (state, token) => (state.token = token),
  clearToken: state => (state.token = null),
  setUser: (state, user) => (state.user = user),
  clearUser: state => (state.user = null)
}

// acciones para ejecutar codigo asyncrono e invocar mutaciones de estado
export const actions = {
  // Inicializando la autenticacion, verificamos existencia de token no caducado
  async initAuth({ commit }, req) {
    // se inician las variables vacias para que el compilador no se queje
    let token
    let userId
    // se verifica si la accion esta corriendo en el servidor o en el cliente
    if (req) {
      // se verifica si no hay headers con cookies
      if (!req.headers.cookie) {
        return // en el caso que no hayan cookies, la funcion termina
      }
      // en caso que hayan cookies en los headers, asignarlos a jwtCookie
      const jwtCookie = req.headers.cookie
        .split(`;`)
        .find(c => c.trim().startsWith('idToken='))
      if (!jwtCookie) {
        return // si jwtCookie es null o undefined la funcion termina
      }
      // asignar el tiempo de expiracion
      // tomar el token desde el cookie
      token = jwtCookie.split('=')[1]
      userId = req.headers.cookie
        .split(`;`)
        .find(c => c.trim().startsWith('idUser='))
        .split(`=`)[1]
    } else {
      // tomar el token del storage del navegador
      token = localStorage.getItem('idToken')
      userId = localStorage.getItem('idUser')
    }
    verifyAuth(`${userId}`)
      commit('setUser', newUser)
      commit('setToken', token)
  },
  // registro de usuarios
  async signUp(ctx, payload) {
    const newUser = await signUp(payload)
    this.$router.push('/')
  },
  async signIn({ commit }, payload) {
    const loggedUser = await signIn(payload)
    // Guardamos JWT token en vuex
    commit('setToken', loggedUser.data.token)
    commit('setUser', loggedUser.data.user)
    this.$router.push('/panel/smartlogs')
    // guardamos el JWT token y user ID en local storage
    localStorage.setItem('idToken', loggedUser.data.token)
    localStorage.setItem('idUser', loggedUser.data.user._id)
    // guardamos JWT token y user ID en cookies
    Cookie.set('idToken', loggedUser.data.token)
    Cookie.set('idUser', loggedUser.data.user._id)
    alert(`Welcome ${loggedUser.data.user.email}`)
  },

  async getUserData({ commit }) {
    try {
      const userdata = await getUserData()
      commit('setUser', userdata.data)
    } catch (err) {
      alert(err.message)
    }
  },

  logout({ commit }) {
    commit('smartlogs/resetSmartlogs', null, { root: true })
    this.$router.push('/')
    commit('clearToken')
    commit('clearUser')
    Cookie.remove('idToken')
    Cookie.remove('idUser')
    if (process.client) {
      localStorage.removeItem('idToken')
      localStorage.removeItem('idUser')
    }
  }
}
