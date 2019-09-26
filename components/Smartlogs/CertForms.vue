<template>
  <div>
  <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
          <v-btn color="accent" class="ma-2" dark v-on="on">Certifications</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="accent">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Certifications</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false"  @click.prevent="createCertification">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <!-- Certification Selectors -->

        <v-subheader>Select certification Agency and Type</v-subheader>
        <v-row row wrap>
          <v-col cols="12" md="4">
            <v-select
              :items="certItems"
              v-model="cert.certification_body"
              item-text="agency"
              label="Certification Body"
              class="ma-2"
              outlined
              clearable
            ></v-select>
          </v-col>

          <v-col cols="12" md="4">
            <v-select
              v-if="cert.certification_body"
              :items="chosenSubset.subsets"
              v-model="cert.certification_subset"
              item-text="subset"
              label="Certification Subset"
              class="ma-2"
              outlined
              clearable
            ></v-select>
          </v-col>

          <v-col cols="12" md="4">
            <v-select
              v-if="cert.certification_body && cert.certification_subset"
              :items="chosenSubset2.type"
              v-model="cert.certification_type"
              label="Certification Type"
              class="ma-2"
              outlined
              clearable
            ></v-select>
          </v-col>
        
        </v-row>
        
        <!-- Certification Details -->

        <v-row v-if="cert.certification_body &&
                     cert.certification_subset &&
                     cert.certification_type">
          
          <!-- ISSUE DATE -->

          <v-col cols="12" sm="6" md="3">
            <v-menu
              v-model="issmenu"
              :close-on-content-click="false"
              max-width="290"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="formatedCertDate"
                  clearable
                  label="Certification Date"
                  outlined
                  prepend-inner-icon="mdi-calendar-search"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="cert.certification_date"
                @change="issmenu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <!-- EXPIRATION DATE -->

          <v-col cols="12" sm="6" md="3">
            <v-menu
              v-model="expmenu"
              :close-on-content-click="false"
              max-width="290"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="formatedExpDate"
                  clearable
                  label="Expiration Date"
                  outlined
                  prepend-inner-icon="mdi-calendar-search"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="cert.expiration_date"
                @change="expmenu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <!-- PROCTOR AND NUMBER -->

          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Issued By"
              v-model="cert.certification_proctor"
              class="ma-2"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Certification Number"
              v-model="cert.certification_code"
              class="ma-2"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row v-if="cert.certification_body &&
                   cert.certification_subset &&
                   cert.certification_type">

          <!-- COMMENTS AND FILE UPLOAD -->

          <v-col cols="12" sm="6" md="9">
            <v-textarea
              label="Remarks"
              v-model="cert.comments"
              class="ma-2"
              outlined
            ></v-textarea>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-file-input outlined label="Upload picture"></v-file-input>
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
        issmenu: false,
        expmenu: false,
        cert: {
          certification_subset: '',
          certification_body: '',
          certification_type: '',
          certification_proctor: '',
          certification_code: '',
          certification_date: '',
          expiration_date: '',
          active: false,
          comments: '',
          image_url: '',
          created_at: '',
          updated_at: '',
        },
      }
    },
    computed: {
      certItems () {
        return this.$store.state.userdata.certItems
      },
      formatedCertDate () {
        return this.cert.certification_date ? moment(this.cert.certification_date).format('dddd, MMMM Do YYYY') : ''
      },
      formatedExpDate () {
        return this.cert.expiration_date ? moment(this.cert.expiration_date).format('dddd, MMMM Do YYYY') : ''
      },
      chosenSubset () {
        const chosenSubset = _.find(this.certItems, item => {
          return item.agency === this.cert.certification_body
        });
        if (chosenSubset) {
          return chosenSubset
        } else {
          return []
        }
      },
      chosenSubset2 () {
        const chosenSubset2 = _.find(this.chosenSubset.subsets, item => {
          return item.subset === this.cert.certification_subset
        });
        if (chosenSubset2) {
          return chosenSubset2
        } else {
          return []
        }
      }
    },

    methods: {
      createCertification() {
        const payload = {
          certification_subset: this.cert.certification_subset,
          certification_body: this.cert.certification_body,
          certification_type: this.cert.certification_type,
          certification_proctor: this.cert.certification_proctor,
          certification_code: this.cert.certification_code,
          certification_date: this.cert.certification_date,
          expiration_date: this.cert.expiration_date,
          active: this.cert.active,
          comments: this.cert.comments,
          image_url: this.cert.image_url,
          created_at: moment(new Date()).format('YYYY-MM-DD'),
          updated_at: moment(new Date()).format('YYYY-MM-DD'),
        }
        this.$store.dispatch('userdata/createCertification', payload)
      }
    }
  }
</script>