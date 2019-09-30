<template>
  <div>
    <v-card color="secondary" class="pa-2" flat height="100%" width="100%">
      <v-row row justify="center" align="center">
        <v-col class="mt-2 pa-2" cols="12" sm="6">
          <ContactForms />
        </v-col>
        <v-col class="mt-2 pa-2" cols="12" sm="6">
          <CertForms />
        </v-col>
        <v-col class="mt-2 pa-2" cols="12" sm="6">
          <JobForms />
        </v-col>
        <v-col class="mt-2 pa-2" cols="12" sm="6">
          <CertForms />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import JobForms from '@/components/Smartlogs/Forms/JobForms'
import CertForms from '@/components/Smartlogs/Forms/CertForms'
import ContactForms from '@/components/Smartlogs/Forms/ContactForms'
export default {
  components: {
    CertForms,
    ContactForms,
    JobForms
  }
}
</script>

<style>

</style>