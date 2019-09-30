<template>
  <div>
  <v-row row>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="accent" class="mr-5" dark v-on="on">New Smartlog</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="accent">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>New Smartlog</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false"  @click.prevent="createSmartlog">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <!-- Relevant personnel -->

        <v-subheader>Personnel</v-subheader>
        <v-row row wrap>
          <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Diver"
            v-model="smartlog.diver_name"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Supervisor"
            v-model="smartlog.diving_supervisor"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="StandBy Diver"
            v-model="smartlog.standby_diver"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="smartlog.diving_contractor"
            label="Contractor"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-col>
        </v-row>
        
        <!-- Relevant Equipment -->

        <v-subheader>Equipment</v-subheader>
        <v-row row wrap>
        <v-col cols="12" sm="6" md="3" >
          <v-text-field
            v-model.number="smartlog.diver_bailout_pressure"
            label="Diver Bailout Pressure(psi)"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-col>
          <v-col cols="12" sm="6" md="3" >
          <v-text-field
            v-model="smartlog.breathing_gas"
            label="Breathing Gas"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3" >
          <v-text-field
            v-model.number="smartlog.standby_diver_bailout_pressure"
            label="StandBy Bailout Pressure (psi)"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3" >
          <v-text-field
            v-model="smartlog.dive_system_id"
            label="Dive System ID"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-col>
        </v-row>

        <!-- WEATHER -->

        <v-subheader>Weather Conditions</v-subheader>
        <v-row row wrap>
          <v-col cols="12" sm="6" md="3" >
            <v-select
              :items="tItems"
              v-model="smartlog.bottom_temperature"
              label="Bottom Temperature"
              class="ma-2"
              outlined
            ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="3" >
          <v-select
            :items="bcItems"
            v-model="smartlog.bottom_current"
            label="Bottom Current"
            class="ma-2"
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="3" >
          <v-select
            :items="vItems"
            v-model="smartlog.bottom_visibility"
            label="Bottom Visibility"
            class="ma-2"
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="3" >
          <v-select
            :items="ssItems"
            v-model="smartlog.sea_state"
            label="Sea State"
            class="ma-2"
            outlined
          ></v-select>
        </v-col>
        </v-row>

        <!-- Dive Profile -->

        <v-subheader>Dive Profile</v-subheader>
        <v-row row wrap>
        
        <!-- --------------- LEAVE SURFACE --------------- -->

          <v-col cols="12" sm="6" md="3" >
            <v-menu
              ref="lsmenu"
              v-model="lsmenu"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="smartlog.leave_surface"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="smartlog.leave_surface"
                  label="Left Surface"
                  prepend-inner-icon="mdi-clock-in"
                  readonly
                  outlined
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="lsmenu"
                v-model="smartlog.leave_surface"
                @click:minute="$refs.lsmenu.save(smartlog.leave_surface)"
              ></v-time-picker>
            </v-menu>
        </v-col>
        
        <!-- --------------- LEAVE BOTTOM --------------- -->
        
        <v-col cols="12" sm="6" md="3">
          <v-menu
              ref="lbmenu"
              v-model="lbmenu"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="smartlog.leave_bottom"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="smartlog.leave_bottom"
                  label="Left Bottom"
                  prepend-inner-icon="mdi-clock-out"
                  readonly
                  outlined
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="lbmenu"
                v-model="smartlog.leave_bottom"
                @click:minute="$refs.lbmenu.save(smartlog.leave_bottom)"
              ></v-time-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model.number="smartlog.bottom_time"
              :value="bottomTime"
              label="Bottom Time (minutes)"
              prepend-inner-icon="mdi-clock-outline"
              class="ma-2"
              outlined
            ></v-text-field>
          </v-col>

          <!-- --------------- DECOMPRESSION COMPLETED AT --------------- -->

          <v-col cols="12" sm="6" md="3" >
            <v-menu
              ref="dcamenu"
              v-model="dcamenu"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="smartlog.decompression_completed_at"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="smartlog.decompression_completed_at"
                  label="Decompression completed at"
                  prepend-inner-icon="mdi-clock-check-outline"
                  hint="time when the diver has reached surface after the last decompression penalty has been cleared"
                  readonly
                  outlined
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="dcamenu"
                v-model="smartlog.decompression_completed_at"
                @click:minute="$refs.dcamenu.save(smartlog.decompression_completed_at)"
              ></v-time-picker>
            </v-menu>
            
          </v-col>

          <v-col cols="12" sm="6" md="3" >
            <v-text-field
              v-model.number="smartlog.depth"
              label="Depth (feet of sea water)"
              class="ma-2"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- WORK DESCRIPTION -->
        <v-subheader>Work Description</v-subheader>
        <v-row row>
          <v-col cols="12" >
            <v-textarea
              outlined
              v-model="smartlog.work_description"
              name="input-7-4"
              class="ma-2"
              label="Work Description"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row row wrap>
          <v-col cols="12" sm="6" md="3" >
          <v-text-field
            v-model="smartlog.penetration_diving"
            label="Penetration Diving"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-select
            :items="dmItems"
            v-model="smartlog.dive_method"
            label="Dive Method"
            class="ma-2"
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="smartlog.post_dive_assesment"
            label="Post Dive Neurological Examination"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3" >
          <v-text-field
            v-model="smartlog.vessel"
            label="Vessel or Deployment Platform"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3" >
          <v-text-field
            v-model="smartlog.client"
            label="Client"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3" >
          <v-text-field
            v-model="smartlog.location"
            label="Location"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
        <v-menu
          v-model="datemenu"
          :close-on-content-click="false"
          max-width="290"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              :value="formatedDate"
              clearable
              label="Date of the dive"
              outlined
              prepend-inner-icon="mdi-calendar-search"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="smartlog.date"
            @change="datemenu = false"
          ></v-date-picker>
        </v-menu>
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
        notifications: false,
        sound: true,
        widgets: false,
        datemenu: false,
        lsmenu: false,
        lbmenu: false,
        dcamenu: false,
        smartlog: {
          date: '',
          diver_name: '',
          standby_diver: '',
          diving_supervisor: '',
          diving_contractor: '',
          diver_bailout_pressure: 0,
          standby_diver_bailout_pressure: 0,
          breathing_gas: '',
          dive_system_id: '',
          sea_state: '',
          bottom_temperature: '',
          bottom_visibility: '',
          bottom_current: '',
          leave_surface: '',
          leave_bottom: '',
          bottom_time: '',
          depth: 0,
          work_description: '',
          penetration_diving: '',
          post_dive_assesment: '',
          dive_method: '',
          decompression_completed_at: '',
          location: '',
          vessel: '',
          client: '',
        },
      }
    },
    computed: {
      tItems() {
        return this.$store.state.smartlogs.tItems
      },
      bcItems() {
        return this.$store.state.smartlogs.bcItems
      },
      vItems() {
        return this.$store.state.smartlogs.vItems
      },
      ssItems() {
        return this.$store.state.smartlogs.ssItems
      },
      dmItems() {
        return this.$store.state.smartlogs.dmItems
      },
      formatedDate () {
        return this.smartlog.date ? moment(this.smartlog.date).format('dddd, MMMM Do YYYY') : ''
      },
      bottomTime () {
        return this.smartlog.leave_surface && this.smartlog.leave_bottom ? this.calculateBT() : ''
      }
    },

    methods: {
      createSmartlog() {
        this.$store.dispatch('smartlogs/createSmartlog', this.smartlog)
      },
      calculateBT() {
        const ls = moment(this.smartlog.leave_surface, "HH:mm")
        const lb = moment(this.smartlog.leave_bottom, "HH:mm")
        const bt = lb.diff(ls, 'minutes')
        return this.smartlog.bottom_time = bt
      }

    }
  }
</script>