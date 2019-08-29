<template>
  <div>
      <v-row>
        <DiveDecoDocs />
      </v-row>
      <v-row>
        <v-col>
          <DivePlanner />
        </v-col>
        <v-col>
          <DecoPlanner />
        </v-col>
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