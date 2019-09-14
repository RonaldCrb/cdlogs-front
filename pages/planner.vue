<template>
  <div>
    <v-row justify="center">
      <DivePlanner />
    </v-row>
    <v-row justify="center">
      <DecoPlanner />
    </v-row>
  </div>
</template>

<script>
import DivePlanner from '@/components/DiveDeco/DivePlanner'
import DecoPlanner from '@/components/DiveDeco/DecoPlanner'
export default {
  components: {
    DivePlanner,
    DecoPlanner,
  }  
}
</script>