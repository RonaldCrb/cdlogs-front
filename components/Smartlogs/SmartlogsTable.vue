<template>
  <v-data-table
    :headers="tableHeaders"
    :items="smartlogs"
    :expanded.sync="expanded"
    item-key="_id"
    show-expand
  >
    <template v-slot:top>
      <v-toolbar flat color="secondary">
      <v-row>
      <v-toolbar-title class="mx-5">Smartlogs</v-toolbar-title>
      <v-spacer></v-spacer>
        <SmartlogsForm />
      </v-row>
    </v-toolbar>
    </template>
    <template v-slot:expanded-item="{ item, headers }">
      <td :colspan="headers.length">
        <v-row row wrap>
          <v-col cols="12" md="3">
            <v-card flat class="pa-2 ma-2" color="secondary">
              <h3>Context</h3>
              <p>diver: {{ item.diver_name }}</p>
              <p>diving_supervisor: {{ item.diving_supervisor }}</p>
              <p>location: {{ item.location }}</p>
              <p>vessel: {{ item.vessel }}</p>
              <p>breathing_gas: {{ item.breathing_gas }}</p>
            </v-card>
          </v-col>
          <v-col cols="12" md="3">
            <v-card flat class="pa-2 ma-2" color="secondary">
              <h3>Dive Profile</h3>
              <p>depth: {{ item.depth }}</p>
              <p>leave_surface: {{ item.leave_surface }}</p>
              <p>leave_bottom: {{ item.leave_bottom }}</p>
              <p>bottom_time: {{ item.bottom_time }}</p>
              <p>decompression_completed_at: {{ item.decompression_completed_at }}</p>
            </v-card>
          </v-col>
          <v-col cols="12" md="3">
            <v-card flat class="pa-2 ma-2" color="secondary">
              <h3>Project Description</h3>
              <p>penetration_diving: {{ item.penetration_diving }}</p>
              <p>work_description: {{ item.work_description }}</p>
            </v-card>
          </v-col>
          <v-col cols="12" md="3">
            <v-card flat class="pa-2 ma-2" color="secondary">
              <h3>Weather Conditions</h3>
              <p>sea_state: {{ item.sea_state }}</p>
              <p>bottom_temperature: {{ item.bottom_temperature }}</p>
              <p>bottom_visibility: {{ item.bottom_visibility }}</p>
              <p>bottom_current: {{ item.bottom_current }}</p>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn color="red" @click="deleteSmartlog(item._id)">Delete Smartlog</v-btn>
        </v-row>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import SmartlogsForm from '@/components/Smartlogs/SmartlogsForm'
  export default {
    components: {
      SmartlogsForm
    },
    data() {
      return {
        singleExpand: true,
        expanded: [],
      }
    },
    computed: {
      smartlogs() {
        return this.$store.state.smartlogs.smartlogs
      },
      tableHeaders() {
        return this.$store.state.smartlogs.tableHeaders
      }
    },
    methods: {
      async deleteSmartlog(id) {
        await this.$store.dispatch('smartlogs/deleteSmartlog', id)
      }
    },
    async fetch({ store}) {
      await store.dispatch('smartlogs/getSmartlogs')
    }
  }
</script>
