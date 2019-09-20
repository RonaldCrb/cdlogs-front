import { createSmartlog, deleteSmartlog, getSmartlogs } from '../plugins/server'
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
  async getSmartlogs({ commit }) {
    try {
      await commit('resetSmartlogs')
      const smartlogs = await getSmartlogs()
      smartlogs.data.forEach(async smartlog => {
        await commit('setSmartlogs', smartlog)
      })
    } catch (error) {
      console.log(err.message)
    }
  },
  
  async createSmartlog({ dispatch }, smartlog) {
    try {
      await createSmartlog(smartlog)
      await dispatch('getSmartlogs')
      await alert('Smartlog created succesfully')
    } catch (error) {
      alert(err.message)
    }
  },
  
  async deleteSmartlog({ dispatch }, id) {
    try {
      await deleteSmartlog(id)      
      await dispatch('getSmartlogs')
      await alert(`Deleted Smartlog #${id}`)
    } catch (error) {
      alert(error.message)
    }
    
  }
}