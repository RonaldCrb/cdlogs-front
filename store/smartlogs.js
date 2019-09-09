import Axios from "axios";

const dev = false
const baseUrl = 'https://afternoon-sea-22983.herokuapp.com/api/v1'
const localUrl = 'http://localhost:3001/api/v1'

const theUrl = dev ? localUrl : baseUrl

export const state = () => ({
  smartlogs: [],
  tItems: ['Cold, (below 55ºF)', 'Normal, (55ºF to 75ºF)', 'Warm, (above 75ºF)'],
  bcItems: ['Weak (0 to 0.5kt)', 'Moderate (0.5kt to 2kt)', 'Strong (+2kt)'], 
  vItems: [`Poor (0' to 5')`, `Moderate (5' to 20')`, `Good (+20')`],
  ssItems: ['Calm', 'Fair', 'Moderate', 'Heavy'],
  dmItems: ['Surface Supplied', 'Saturation', 'Scuba'],
  tableHeaders: [
    { text: 'Date', align: 'center', value: 'date' },
    { text: 'Diver', align: 'center', value: 'diver_name' },
    { text: 'Contractor', align: 'center', value: 'diving_contractor' },
    { text: 'Max Depth', align: 'center', value: 'depth' },
    { text: 'Bottom Time', align: 'center', value: 'bottom_time' }
  ],
})

export const mutations = {
  setSmartlogs(state, smartlog) {
    state.smartlogs.push(smartlog)
  },
  resetSmartlogs(state) {
    state.smartlogs = []
  }
}

export const actions = {
  getSmartlogs({ commit }) {
    commit('resetSmartlogs')
    Axios.get(`${theUrl}/smartlogs`)
      .then(smartlogs => {
        smartlogs.data.forEach(smartlog => {
          commit('setSmartlogs', smartlog)
        })
      })
      .catch(err => {
        console.log(err.message)
      })    
  },
  createSmartlog({ dispatch }, smartlog) {
    Axios.post(`${theUrl}/smartlogs`, smartlog)
      .then(smartlog => {
        dispatch('getSmartlogs')
        alert('Smartlog created succesfully')
      })
      .catch(err => {
        alert(err.message)
      })  
  },
  async deleteSmartlog({ dispatch }, id) {
    await Axios.delete(`${theUrl}/smartlogs/${id}`)
    await dispatch('getSmartlogs')
    await alert(`Deleted Smartlog #${id}`)
  }
}