<template>
  <div>
  <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
          <v-btn color="accent" class="ma-2" dark v-on="on">Contact Info</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="accent">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Contact Details</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false"  @click.prevent="createContact">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <!-- Phone and address -->

        <v-subheader>Personal Contact</v-subheader>
        <v-row row wrap>

          <v-col cols="12" sm="6">
            <v-text-field
              label="Address"
              v-model="contact_details.address"
              class="ma-2"
              outlined
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              label="Contact Phone"
              v-model="contact_details.phone"
              class="ma-2"
              outlined
            ></v-text-field>
          </v-col>

        </v-row>
        
        <!-- NEXT OF KIN -->
        <v-subheader>Next Of Kin</v-subheader>
        <v-row>

          <v-col cols="12" sm="6" lg="3">
            <v-text-field
              label="Next of kin"
              v-model="contact_details.next_of_kin"
              class="ma-2"
              outlined
            ></v-text-field>
          </v-col>
          
          <v-col cols="12" sm="6" lg="3">
            <v-text-field
              label="Next of kin phone"
              v-model="contact_details.next_of_kin_phone"
              class="ma-2"
              outlined
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" lg="3">
            <v-text-field
              label="Next of kin email"
              v-model="contact_details.next_of_kin_email"
              class="ma-2"
              outlined
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" lg="3">
            <v-text-field
              label="Next of kin relationship"
              v-model="contact_details.relationship"
              class="ma-2"
              outlined
            ></v-text-field>
          </v-col>

        </v-row>
      
      </v-card>
    </v-dialog>
  </v-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialog: false,
      issmenu: false,
      expmenu: false,
      contact_details: {
        address: '',
        phone: '',
        next_of_kin: '',
        next_of_kin_phone: '',
        next_of_kin_email: '',
        relationship: ''
      },
    }
  },
  methods: {
    createContact() {
      this.$store.dispatch('userdata/createContact', this.contact_details)
    }
  }
}
</script>