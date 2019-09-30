import { updateUserData, getUserData } from '../plugins/server'
export const state = () => ({
  certItems: [
    {
      agency: 'ADCI',
      subsets: [
        {
          subset: 'diver',
          type: [
            'Entry - level tender / diver',
            'Air diver',
            'Mixed - gas diver',
            'Bell / Saturation diver',
          ]
        },
        {
          subset: 'diving supervisor',
          type: [
            'Air - diving supervisor',
            'Mixed - gas diving supervisor',
            'Bell / Saturation - diving supervisor',
          ]
        },
        {
          subset: 'Life Support',
          type: [
            'Life-support technician',
            'Saturation technician',
          ]
        },
      ]
    },
    { 
      agency:'DCBC',
      subsets: [
        { 
          subset: 'diver',
          type: [
            'Restricted SCUBA Diver',
            'Restricted Surface Supplied Diver',
            'Surface Supplied Mixed Gas Diver',
            'Surface Supplied Tender',
            'Unrestricted SCUBA Diver',
            'Unrestricted Surface Supplied Diver',
            'Closed Bell Diver'
          ]
        },          
        { 
          subset: 'diving supervisor',
          type: [
            'Bell Diving Supervisor',
            'Offshore Air Diving Supervisor',
            'Restricted Surface Supplied Supervisor',
            'SCUBA Supervisor',
            'Surface Supplied Mixed Gas Supervisor',
            'Unrestricted Surface Supplied Supervisor',
          ]
        },
        { 
          subset: 'Diving Safety Specialist',
          type: [
            'Inshore Diving Safety Specialist',
            'Offshore Diving Safety Specialist(Bell Diving)',
            'Offshore Diving Safety Specialist(Surface Supplied)',
          ]
        },
        { 
          subset: 'Chamber Operator',
          type: [
            'Hyperbaric Chamber Operator',
          ]
        },
        { 
          subset: 'Life Support',
          type: [
            'Life Support Supervisor(LSS)',
            'Hyperbaric Life Support Technician(LST)',
          ]
        },
        { 
          subset: 'Remotely Operated Vehicules(ROV)',
          type: [
            'ROV Pilot / technician Level 1',
            'ROV Pilot / technician Level 2',
            'ROV Senior Pilot / technician',
            'ROV Pilot / Technician Supervisor',
          ]
        },
      ]
    }, 
  ],
})

export const actions = {
  
  async createCertification({ rootState }, certification) {
    try {
      await updateUserData({ certification_details: [certification, ...rootState.auth.user.certification_details] })
      await alert('Certification created succesfully')
      // await dispatch('auth/getUserData', null, { root: true })
    } catch (err) {
      alert(err.message)
    }
  },

  async createContact(_ctx, contact) {
    try {
      await updateUserData({ contact_details: contact })
      await alert('Contact Details succesfully saved')
      // await dispatch('auth/getUserData', null, { root: true })
    } catch (err) {
      alert(err.message)
    }
  },

  async createWork({ rootState }, work) {
    try {
      await updateUserData({ work_details: [work, ...rootState.auth.user.work_details] })
      await alert('Job Details succesfully saved')
      // await dispatch('auth/getUserData', null, { root: true })
    } catch (err) {
      alert(err.message)
    }
  },

}