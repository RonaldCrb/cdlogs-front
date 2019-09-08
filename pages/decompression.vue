<template>
  <div>
    <v-row>
      <v-col cols="12" md="6">
        <DivePlanner />
      </v-col>
      <v-col cols="12" md="6">
        <DecoPlanner />
      </v-col>
    </v-row>
    <v-row>
      <DiveDecoDocs />
    </v-row>
  </div>
</template>

<script>
import DivePlanner from '@/components/DiveDeco/DivePlanner'
import DecoPlanner from '@/components/DiveDeco/DecoPlanner'
import DiveDecoDocs from '@/components/DiveDeco/DiveDecoDocs'
export default {
  components: {
    DivePlanner,
    DecoPlanner,
    DiveDecoDocs
  }  
}
</script>