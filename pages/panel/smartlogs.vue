<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols ="12" md="4">
        <FormSelector />
      </v-col>
      <v-col cols="12" md="8">
        <SmartlogsMetrics />
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <SmartlogsTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FormSelector from '@/components/Smartlogs/FormSelector'
import SmartlogsMetrics from '@/components/Smartlogs/SmartlogsMetrics'
import SmartlogsTable from '@/components/Smartlogs/SmartlogsTable'
  export default {
    components: {
      FormSelector,
      SmartlogsTable,
      SmartlogsMetrics
    },
    middleware: ['auth'],
    computed: {
      smartlogs() {
        return this.$store.state.smartlogs.smartlogs
      },
      tableHeaders() {
        return this.$store.state.smartlogs.tableHeaders
      }
    },
    async fetch({ store}) {
      await store.dispatch('auth/getUserData')
      await store.dispatch('smartlogs/getSmartlogs')
    }
  }
</script>
