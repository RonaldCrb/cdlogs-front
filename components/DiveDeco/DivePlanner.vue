<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-row justify="center">
            <h2 class="text-xs-center">Dive Planner Air No Deco</h2>
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
              <v-col cols="6">
                <v-text-field
                    v-model.number="sit"
                    clearable
                    class="ma-2"
                    label="Surface Interval Time"
                    hint="Surface Interval in Minutes"
                    outlined
                  ></v-text-field>
                </v-col>

               <v-col cols="6">
                <v-text-field
                  v-model.number="nextDepth"
                  clearable
                  class="ma-2"
                  label="Second Dive Depth"
                  hint="Depth in Feet of Sea Water"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-card color="deep-orange">
                  <h3>No Decompression Limit: {{ ndl }}</h3>
                </v-card>
              </v-col>

              <v-col cols="6">
                <v-card color="deep-orange">
                  <h3>Group Letter: {{ gl }}</h3>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-card color="deep-orange">
                  <h3>Repetitive Group Letter: {{ rl }}</h3>
                </v-card>
              </v-col>

              <v-col cols="6">
                <v-card color="deep-orange">
                  <h3>Residual Nitrogen Time: {{ rnt }}</h3>
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
import { noDecompressionLimit, groupLetter, repetLetter, residualNitrogenTime } from 'diving-decompression'
export default {
  data() {
    return {
      depth: 0,
      bottomTime: 0,
      sit: 0,
      nextDepth: 0,
      nextTime: 0,
    }
  },
  computed: {
    ndl() {
      const dive = { depth: this.depth, bottomTime: this.bottomTime }
      const result = noDecompressionLimit(dive)
      if (!result) {
        return ''
      } else {
        return `${result} minutes`
      }
    },
    gl() {
      const dive = { depth: this.depth, bottomTime: this.bottomTime }
      const result = groupLetter(dive)
       if (!result) {
          return ''
        } else {
          return result
        }
    },
    rl() {
      const divePlan = { 
        depth: this.depth, 
        bottomTime: this.bottomTime, 
        sit: this.sit, 
        nextTime: this.nextTime, 
        nextDepth: this.nextDepth
      }
        const result = repetLetter(divePlan)
        if (!result) {
          return ''
        } else {
          return result
        }
    },
    rnt() {
      const divePlan = { 
        depth: this.depth, 
        bottomTime: this.bottomTime, 
        sit: this.sit, 
        nextTime: this.nextTime, 
        nextDepth: this.nextDepth
      }
      const result = residualNitrogenTime(divePlan)
      if(!result) {
        return ''
      } else {
        return `${result} minutes`
      }
    }
  },
}
</script>