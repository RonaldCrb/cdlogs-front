<template>
  <div>
    <SmartlogDocs />
    <h3>Welcome {{ this.$store.state.auth.user.email}}</h3>
    <SmartlogsTable />
  </div>
</template>

<script>
import SmartlogDocs from '@/components/Smartlogs/SmartlogDocs'
import SmartlogsTable from '@/components/Smartlogs/SmartlogsTable'
import SmartlogsForm from '@/components/Smartlogs/SmartlogsForm'
  export default {
    components: {
      SmartlogDocs,
      SmartlogsTable,
      SmartlogsForm
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
      await store.dispatch('smartlogs/getSmartlogs')
    }
  }
</script>
