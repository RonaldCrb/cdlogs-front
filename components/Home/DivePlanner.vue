<template>
  <v-form>
    <v-container>
      <v-row justify="center">
        <h1 class="text-xs-center">Plan your Dive and help me test my algorithms!</h1>
      </v-row>
      
      <v-row>
        <v-col cols="6">
        <v-card color="secondary">
          
          <v-col cols="12">
            <v-text-field
              v-model.number="depth"
              clearable
              label="Depth"
              hint="Depth in Feet of Sea Water"
              outlined
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model.number="bottomTime"
              clearable
              label="Bottom Time"
              hint="Bottom Time in Minutes (Leave Surface to Leave Bottom)"
              outlined
            ></v-text-field>
          </v-col>
        
          <v-col cols="12">
            <h1>No Decompression Limit: {{ ndl | minFilter }}</h1>
          </v-col>

          <v-col cols="12">
            <h1>Group Letter: {{ gl }}</h1>
          </v-col>
        </v-card>
        </v-col>

        <v-col cols="6">
        <v-card color="secondary">
          
        <v-col cols="12">
          <v-text-field
              v-model.number="sit"
              clearable
              label="Surface Interval Time"
              hint="Surface Interval in Minutes"
              outlined
            ></v-text-field>
          </v-col>

         <v-col cols="12">
          <v-text-field
            v-model.number="nextDepth"
            clearable
            label="Second Dive Depth"
            hint="Depth in Feet of Sea Water"
            outlined
          ></v-text-field>
        </v-col>

        
        <v-col cols="12">
            <h1>Repetitive Group Letter: {{ rl }}</h1>
          </v-col>

          <v-col cols="12">
            <h1>Residual Nitrogen Time: {{ rnt | minFilter }}</h1>
          </v-col>
        </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { noDecompressionLimit, groupLetter, repetLetter, residualNitrogenTime } from 'diving-decompression'
export default {
  filters: {
    minFilter(value) {
      if (value) {
        return `${value} minutes`
      } else {
        return ''
      }
    }
  },
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
        return 'ERROR'
      } else {
        return result
      }
    },
    gl() {
      const dive = { depth: this.depth, bottomTime: this.bottomTime }
      const result = groupLetter(dive)
       if (!result) {
          return 'ERROR'
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
          return 'ERROR'
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
        return 'ERROR'
      } else {
        return result
      }
    }
  },
}
</script>