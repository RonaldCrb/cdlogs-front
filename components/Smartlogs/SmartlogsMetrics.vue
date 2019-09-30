<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-card color="secondary" class="pa-4" flat>
        <h1 class="text-center">Your Career in Numbers</h1>
        <v-row justify="center" align="center">
          <v-col class="mt-2 pa-2" cols="12" sm="6">
            <v-card color="primary" hover min-height="100%">
              <h3 class="text-center black--text">Total Bottom Time (min)</h3>
              <p class="text-center black--text">{{ calculateMetrics.totalBottomTime }}</p>
            </v-card>
          </v-col>

          <v-col class="mt-2 pa-2" cols="12" sm="6">
            <v-card color="primary" hover min-height="100%">
              <h3 class="text-center black--text">Total Number of Dives</h3>
              <p class="text-center black--text">{{ calculateMetrics.totalNumberOfDives }}</p>
            </v-card>
          </v-col>

          <v-col class="mt-2 pa-2" cols="12" sm="6">
            <v-card color="primary" hover min-height="100%">
              <h3 class="text-center black--text">Years in the industry</h3>
              <p class="text-center black--text">{{ calculateMetrics.yearsInIndustry }}</p>
            </v-card>
          </v-col>

          <v-col class="mt-2 pa-2" cols="12" sm="6">
            <v-card color="primary" hover min-height="100%">
              <h3 class="text-center black--text">Companies worked for</h3>
              <p class="text-center black--text">{{ calculateMetrics.companiesWorkedFor }}</p>
            </v-card>
          </v-col>
        </v-row>  
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
export default {
  data() {
    return {
      metrics: [
        {
          title: 'Total bottom time',
          value: 500
        },
        {
          title: 'Total number of dives',
          value: 100
        },
        {
          title: 'Years in the industry',
          value: 20
        },
        {
          title: 'Companies you worked for',
          value: 500
        },
      ]
    }
  },
  computed: {
    smartlogs() {
      return this.$store.state.smartlogs.smartlogs
    },
    currentUser() {
      return this.$store.getters['auth/currentUser']
    },
    calculateMetrics() {
      const totalBottomTime = this.totalBottomTime()
      const totalNumberOfDives = this.smartlogs.length
      const yearsInIndustry = this.yearsInIndustry()
      const companiesWorkedFor = this.companiesWorkedFor()
      return {
        totalBottomTime,
        totalNumberOfDives,
        yearsInIndustry,
        companiesWorkedFor,
      }
      
    }
  },
  methods: {
    totalBottomTime() {
      let tbt = 0
      this.smartlogs.forEach(sl => {
        tbt += sl.bottom_time
      })
      return tbt
    },
    yearsInIndustry() {
      if(this.currentUser.certification_details.length) {
        const workXp = this.currentUser.certification_details
        const sortedWorkXp = _.sortBy(workXp, 'certified_at', 'desc');
        const firstCert = moment(sortedWorkXp[0].certification_date, 'YYYY-MM-DD')
        const currentDate = moment(new Date())
        return currentDate.diff(firstCert, 'years')
      } else {
        return '0 years'
      }
    },
    companiesWorkedFor() {
      let contractors = []
      this.smartlogs.forEach(sl => {
        const check = _.includes(contractors, sl.diving_contractor)
        if (!check) {
          contractors.push(sl.diving_contractor)
        };
      })
      return contractors.length
    }
  }
}
</script>

<style>
.tarjetas {
  height: 200%;
}
</style>