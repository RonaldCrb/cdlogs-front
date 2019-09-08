<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-row justify="center">
            <h2 class="text-xs-center">Air Decompression Planner</h2>
          </v-row>
          <v-row justify="center">
            <h5 class="yellow black--text">PLEASE DO NOT USE THIS CALCULATOR FOR REAL DIVES AS THIS IS STILL IN DEVELOPMENT AND NEEDS TO BE TESTED</h5>
          </v-row>
          <v-card color="secondary">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model.number="depth"
                  clearable
                  class="ma-2"
                  label="Depth"
                  hint="Depth in Feet of Sea Water"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  v-model.number="bottomTime"
                  clearable
                  class="ma-2"
                  label="Bottom Time"
                  hint="Bottom Time in Minutes (Leave Surface to Leave Bottom)"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-card color="deep-orange">
                  <p>Time to First Stop: {{ decoProfile.ttfs }}</p>
                  <p>Total Ascent Time (air): {{ decoProfile.airTAT }}</p>
                  <p>Tota Ascent Time (o2): {{ decoProfile.o2TAT }}</p>
                  <p>{{ decoProfile.ttfs }} Chamber Periods for SurDO2</p>
                  <p>Repetitive Group Letter: {{ decoProfile.repetLetter }}</p>
                  <p v-for="(astop, i) in decoProfile.airDecoStops" :key="i">stop: depth {{ astop.depth }} fsw = time {{ astop.time }}</p>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { diveDeco } from 'diving-decompression'
export default {
  data() {
    return {
      depth: 0,
      bottomTime: 0,
    }
  },
  computed: {
    
    decoProfile() {
      const divePlan = { 
        depth: this.depth, 
        bottomTime: this.bottomTime, 
      }
      return diveDeco(divePlan)
    }
  },
}
</script>