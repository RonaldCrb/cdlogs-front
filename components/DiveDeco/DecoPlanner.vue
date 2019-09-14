<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-row justify="center">
            <h2 class="ma-2 text-center">Air Decompression Planner/Calculadora de descompresion con Aire</h2>
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
              <v-col cols="12">
                <v-card color="deep-orange" class="pa-2 elevation-0 ma-2">
                  <v-row justify="center">
                    <h2 class="text-center pa-3 ma-2 black--text">Decompression Protocol / Protocolo de descompresion</h2>
                    <v-col cols="12">
                      <v-card color="secondary" class="ma-1">
                        <p color="secondary" class="text-center ma-1">Time to First Stop: {{ decoProfile.ttfs }} minutes</p>
                        <p color="secondary" class="text-center ma-1">Total Ascent Time (air): {{ decoProfile.airTAT }} minutes</p>
                        <p color="secondary" class="text-center ma-1">Tota Ascent Time (o2): {{ decoProfile.o2TAT }} minutes</p>
                        <p color="secondary" class="text-center ma-1">{{ decoProfile.o2cp }} Chamber Periods for SurDO2 (25 min + 5 min air brake)</p>
                        <p color="secondary" class="text-center ma-1">Repetitive Group Letter: {{ decoProfile.repetLetter }}</p>
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-row fill-height>
                    <v-col cols="12" md="6" fill-height>
                      <v-card color="secondary" class="ma-1">
                        <h3 class="text-center">In water decompression with Air</h3>
                        <p class="text-center ma-1" v-for="(astop, i) in decoProfile.airDecoStops" :key="i"> - {{ astop.depth }} fsw for {{ astop.time }} minutes</p>
                      </v-card>
                    </v-col>
                    <v-col cols="12" md="6" fill-height>
                      <v-card color="secondary" class="ma-1">
                        <h3 class="text-center">In water decompression with Air and O2</h3>
                        <h3 class="yellow black--text">For 20 and 30 feet stops use 100% O2 (starting from the moment the diver is confirmed to be on O2)</h3>
                        <p class="text-center ma-1" v-for="(o2stop, i) in decoProfile.o2decoStops" :key="i + 1 * 10"> - {{ o2stop.depth }} fsw for {{ o2stop.time }} minutes</p>
                      </v-card>
                    </v-col>
                  </v-row>
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
import { decoDive } from 'diving-decompression'
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
        bottomTime: this.bottomTime,
        depth: this.depth, 
      };
      return decoDive(divePlan);
    }
  },
}
</script>