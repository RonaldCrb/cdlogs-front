<template>
  <div>
  <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
          <v-btn color="accent" class="ma-2" dark v-on="on">Work Details</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="accent">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Work Details</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false"  @click.prevent="createWork">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <!-- COMPANY NAME -->

        <v-subheader>Work Experience</v-subheader>
        <v-row row wrap>

          <v-col cols="12" sm="6">
            <v-text-field
              label="Company Name"
              v-model="work.company_name"
              class="ma-2"
              outlined
            ></v-text-field>
          </v-col>

          <!-- START DATE -->

          <v-col cols="12" sm="6" md="3">
            <v-menu
              v-model="stamenu"
              :close-on-content-click="false"
              max-width="290"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="formatedStartDate"
                  clearable
                  label="Start Date"
                  outlined
                  prepend-inner-icon="mdi-calendar-search"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="work.start_date"
                @change="stamenu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <!-- END DATE -->

          <v-col cols="12" sm="6" md="3">
            <v-checkbox
              v-model="work.current"
              :label="`Currently work here: ${work.current.toString()}`"
            ></v-checkbox>

            <v-menu
              v-model="endmenu"
              :close-on-content-click="false"
              max-width="290"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="formatedEndDate"
                  :disabled="work.current"
                  clearable
                  label="End Date"
                  outlined
                  prepend-inner-icon="mdi-calendar-search"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="work.end_date"
                @change="endmenu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

        </v-row>
        
        <!-- DESCRIPTION -->
        <v-subheader>Role Description</v-subheader>
        <v-row>

          <v-col cols="12" sm="6" md="9">
            <v-textarea
              label="Description"
              v-model="work.description"
              class="ma-2"
              outlined
            ></v-textarea>
          </v-col>

        </v-row>
      
      </v-card>
    </v-dialog>
  </v-row>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data () {
    return {
      dialog: false,
      stamenu: false,
      endmenu: false,
      work: {
        current: false,
        company_name: '',
        start_date: '',
        end_date: '',
        description: '',
      },
    }
  },
  computed: {
    formatedStartDate () {
      return this.work.start_date ? moment(this.work.start_date).format('dddd, MMMM Do YYYY') : ''
    },
    formatedEndDate () {
      return this.work.end_date ? moment(this.work.end_date).format('dddd, MMMM Do YYYY') : ''
    },
  },
  methods: {
    createWork() {
      this.$store.dispatch('userdata/createWork', this.work)
    }
  }
}
</script>