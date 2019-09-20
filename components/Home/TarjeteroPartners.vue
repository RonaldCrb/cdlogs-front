<template>
  <div>
    <v-row justify="center" align="center" class="my-5">
      <h3>OUR PARTNERS</h3>  
    </v-row>   
    <v-row justify="center" align="center">
      <v-col v-for="(partner, i) in partners" :key="i" cols="12" md="3">
        <v-card
          class="mx-auto"
          max-width="400"
        >
          <v-img
            contain
            class="white--text"
            :src="partner.src"
          >
            <v-card-title class="align-end fill-height"></v-card-title>
          </v-img>

          <v-card-text>
            <span>{{ partner.title }}</span><br>
            <span class="text--primary">
              <span class="text-center">{{ partner.desc }}</span>
            </span>
          </v-card-text>

          <v-card-actions>
           <v-row justify="center" align="center">

           
      <v-btn
        text
        class="ma-2"
        color="primary"
        target="_blank"
        :href="partner.link"
      >
        Visitar
      </v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
  </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      partners: [
        {
          title: 'Buceo Industrial Iberoamericano',
          src: 'https://firebasestorage.googleapis.com/v0/b/ron-alonzo.appspot.com/o/cdlogs%2F70898628_2679832992034984_2031313269498576896_n.png?alt=media&token=dfcf823f-a801-4e3d-a591-3661256b0791',
          desc: 'Medio de contacto, intercambio de información y conocimiento entre buzos industriales de habla hispana.',
          link: 'https://www.facebook.com/buceo.industrial.iberoamericano/?__tn__=kC-R&eid=ARCaAcJ5kd5Y8wPPTBx3dgfzsepmiIEP11RR6UQDrl9DNeCE_xdnw2ooQh6LCDmaTWljGB7CngQUzNlt&hc_ref=ARSbzmxy8uX8UttiolTWjj15uW0EV6fFIqJPSzJfGC-pQxmXr5NTBZiQ7lJ-eIpisLk&fref=nf&__xts__[0]=68.ARD-XcURP7X0SzTN4FdEet7evUL66PDvBg-euIHZyQjg_w1XOlf5bQKWvUQLTX6ecZASWSxSJfuTN42AGBAPOB7bAtsGnqSYf2M5r0Y-lXvfHjuYESRBiI-G0qXgzhWnZVDMherXeFmBeEHm8t8doyshPWhR6ewoQnn7zTa0IDi8JbfeU30ibXSmusm3wiEAna5XGTyj4533R5x9BOJfHb0rYasz6r-bbrCJ7Cm6tBJP2R4v1sjtzy_KdkNmutQw6KvyUWofix0BFYf7R2tyDJF_5xHQcXhGvc1DmTg2__SCz1yZmKJoU9fIBtUuOfZluxM4a-0ytwwGmJpG59ickq1gA528EQ'
        
        }
      ]
    }
  }
}
</script>

<style>
.imagen {
    width: 100%;
    height: auto;
}
</style>