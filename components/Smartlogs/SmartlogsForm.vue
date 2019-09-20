<template>
  <div>
  <v-layout row>
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
        <v-layout row wrap>
          <v-flex xs12 sm6 md3>
          <v-text-field
            label="Diver"
            v-model="smartlog.diver_name"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <v-text-field
            label="Supervisor"
            v-model="smartlog.diving_supervisor"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <v-text-field
            label="StandBy Diver"
            v-model="smartlog.standby_diver"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <v-text-field
            v-model="smartlog.diving_contractor"
            label="Contractor"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-flex>
        </v-layout>
        
        <!-- Relevant Equipment -->

        <v-subheader>Equipment</v-subheader>
        <v-layout row wrap>
        <v-flex xs12 sm6 md3 >
          <v-text-field
            v-model.number="smartlog.diver_bailout_pressure"
            label="Diver Bailout Pressure(psi)"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-flex>
          <v-flex xs12 sm6 md3 >
          <v-text-field
            v-model="smartlog.breathing_gas"
            label="Breathing Gas"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md3 >
          <v-text-field
            v-model.number="smartlog.standby_diver_bailout_pressure"
            label="StandBy Bailout Pressure (psi)"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md3 >
          <v-text-field
            v-model="smartlog.dive_system_id"
            label="Dive System ID"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-flex>
        </v-layout>

        <!-- WEATHER -->

        <v-subheader>Weather Conditions</v-subheader>
        <v-layout row wrap>
          <v-flex xs12 sm6 md3 >
            <v-select
              :items="tItems"
              v-model="smartlog.bottom_temperature"
              label="Bottom Temperature"
              class="ma-2"
              outlined
            ></v-select>
        </v-flex>
        <v-flex xs12 sm6 md3 >
          <v-select
            :items="bcItems"
            v-model="smartlog.bottom_current"
            label="Bottom Current"
            class="ma-2"
            outlined
          ></v-select>
        </v-flex>
        <v-flex xs12 sm6 md3 >
          <v-select
            :items="vItems"
            v-model="smartlog.bottom_visibility"
            label="Bottom Visibility"
            class="ma-2"
            outlined
          ></v-select>
        </v-flex>
        <v-flex xs12 sm6 md3 >
          <v-select
            :items="ssItems"
            v-model="smartlog.sea_state"
            label="Sea State"
            class="ma-2"
            outlined
          ></v-select>
        </v-flex>
        </v-layout>

        <!-- Dive Profile -->

        <v-subheader>Dive Profile</v-subheader>
        <v-layout row wrap>
          <v-flex xs12 sm6 md3 >
          <v-text-field
            v-model="smartlog.leave_surface"
            label="Leave Surface"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md3 >
          <v-text-field
            v-model="smartlog.leave_bottom"
            label="Leave Bottom"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md3 >
          <v-text-field
            v-model.number="smartlog.bottom_time"
            label="Bottom Time (minutes)"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md3 >
          <v-text-field
            v-model.number="smartlog.depth"
            label="Depth (feet of sea water)"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md3 >
          <v-text-field
            v-model.number="smartlog.decompression_completed_at"
            label="Decompression completed at"
            hint="time when the diver has reached surface after the last decompression penalty has been cleared"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-flex>
        </v-layout>

        <!-- WORK DESCRIPTION -->
        <v-subheader>Work Description</v-subheader>
        <v-layout row>
          <v-flex xs12 >
            <v-textarea
              outlined
              v-model="smartlog.work_description"
              name="input-7-4"
              class="ma-2"
              label="Work Description"
            ></v-textarea>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm6 md3 >
          <v-text-field
            v-model="smartlog.penetration_diving"
            label="Penetration Diving"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <v-select
            :items="dmItems"
            v-model="smartlog.dive_method"
            label="Dive Method"
            class="ma-2"
            outlined
          ></v-select>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <v-text-field
            v-model="smartlog.post_dive_assesment"
            label="Post Dive Neurological Examination"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md3 >
          <v-text-field
            v-model="smartlog.vessel"
            label="Vessel or Deployment Platform"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md3 >
          <v-text-field
            v-model="smartlog.client"
            label="Client"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md3 >
          <v-text-field
            v-model="smartlog.location"
            label="Location"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md3 >
          <v-text-field
            v-model="smartlog.date"
            label="date"
            class="ma-2"
            outlined
          ></v-text-field>
        </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-layout>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
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
          bottom_time: 0,
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
    },
    methods: {
      createSmartlog() {
        this.$store.dispatch('smartlogs/createSmartlog', this.smartlog)
      }
    }
  }
</script>