<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-row justify="center">
            <h2 class="ma-2 text-center">Dive Planner Air No Deco / Calculadora de buceo con aire, no descompresion</h2>
          </v-row>
          <v-row justify="center">
            <h5 class="ma-3 pa-1 yellow black--text">PLEASE DO NOT USE THIS CALCULATOR FOR REAL DIVES AS THIS IS STILL IN DEVELOPMENT AND NEEDS TO BE TESTED</h5>
            <h5 class="ma-3 pa-1 yellow black--text">POR FAVOR NO USES ESTA CALCULADORA PARA INMERSIONES REALES, AUN ESTA EN DESARROLLO Y NECESITA SER PROBADA</h5>
          </v-row>
          <v-card color="secondary">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model.number="depth"
                  clearable
                  class="ma-2"
                  label="Depth/Profundidad"
                  hint="Depth in Feet of Sea Water/Profundidad en pies de agua salada"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model.number="bottomTime"
                  clearable
                  class="ma-2"
                  label="Bottom Time/Tiempo de fondo"
                  hint="Bottom Time in Minutes (Leave Surface to Leave Bottom)/Tiempo de fondo en minutos(desde que deja la superficie hasta que deja el fondo)"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                    v-model.number="sit"
                    clearable
                    class="ma-2"
                    label="Surface Interval Time/Intervalo de superficie"
                    hint="Surface Interval in Minutes/Intervalo de superficie en Minutos"
                    outlined
                  ></v-text-field>
                </v-col>

               <v-col cols="12" md="6">
                <v-text-field
                  v-model.number="nextDepth"
                  clearable
                  class="ma-2"
                  label="Second Dive Depth/Profundidad de la segunda inmersion"
                  hint="Depth in Feet of Sea Water/Profundidad en pies de agua salada"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-card color="deep-orange" class="ma-2 pa-1">
                  <h3 class="text-center">No Decompression Limit/Limite de no descompresion: {{ ndl }}</h3>
                </v-card>
              </v-col>

              <v-col cols="12" md="6">
                <v-card color="deep-orange" class="ma-2 pa-1">
                  <h3 class="text-center">Group Letter/Letra de grupo: {{ gl }}</h3>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-card color="deep-orange" class="ma-2 pa-1">
                  <h3 class="text-center">Repetitive Group Letter/Letra repetitiva de grupo: {{ rl }}</h3>
                </v-card>
              </v-col>

              <v-col cols="12" md="6">
                <v-card color="deep-orange" class="ma-2 pa-1">
                  <h3 class="text-center">Residual Nitrogen Time/Tiempo residual de nitrogeno: {{ rnt }}</h3>
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
        return `${result} min`
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
        return `${result} min`
      }
    }
  },
}
</script>