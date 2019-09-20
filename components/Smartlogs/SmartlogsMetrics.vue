<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-card color="secondary" class="pa-4" flat>
        <h1 class="text-center">Your Career in Numbers</h1>
        <v-row justify="center" align="center">
          <v-col v-for="(metric, i) in metrics" :key="i" class="mt-2 pa-2" cols="12" sm="6">
            <v-card color="primary" hover min-height="100%">
              <h3 class="text-center black--text">{{ metric.title }}</h3>
              <p class="text-center black--text">{{ metric.value }}</p>
            </v-card>
          </v-col>
        </v-row>  
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      metrics: [
        {
          title: 'Total bottom time',
          value: 500
        },
        {
          title: 'Total number of dives',
          value: 100
        },
        {
          title: 'Years in the industry',
          value: 20
        },
        {
          title: 'Projects you worked on',
          value: 26
        },
        {
          title: 'Companies you worked for',
          value: 500
        },
        {
          title: 'Total gas breathed',
          value: 500
        },
      ]
    }
  }
}
</script>

<style>
.tarjetas {
  height: 200%;
}
</style>