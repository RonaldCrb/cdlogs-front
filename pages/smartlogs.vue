<template>
  <div>
    <SmartlogsTable />
  </div>
</template>

<script>
import SmartlogsTable from '@/components/Smartlogs/SmartlogsTable'
import SmartlogsForm from '@/components/Smartlogs/SmartlogsForm'
  export default {
    components: {
      SmartlogsTable,
      SmartlogsForm
    },
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
