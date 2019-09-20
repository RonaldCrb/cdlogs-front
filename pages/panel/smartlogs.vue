<template>
  <div>
    <SmartlogsMetrics />
    <SmartlogsTable />
  </div>
</template>

<script>
import SmartlogsMetrics from '@/components/Smartlogs/SmartlogsMetrics'
import SmartlogsTable from '@/components/Smartlogs/SmartlogsTable'
  export default {
    components: {
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
      await store.dispatch('smartlogs/getSmartlogs')
    }
  }
</script>
