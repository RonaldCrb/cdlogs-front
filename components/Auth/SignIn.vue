<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="8" lg="5">
        <v-card color="black">
          <v-card-title>
            <v-row class="ma-1" justify="center" align="center">
                <img src="@/static/icon.png" class="centroimg" />
            </v-row>
            <v-row class="ma-1" justify="center" align="center">
              <h2 class="centro">User Login</h2>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-container class="pad2" grid-list-md>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                @submit.prevent="signIn"
              >
                <v-row>
                  <v-col cols="12" class="text-center">
                    <v-text-field
                      v-model="email"
                      label="Email"
                      type="email"
                      filled
                      prepend-inner-icon="mdi-contact-mail"
                      color="red"
                      clearable
                      hint="Tu correo electronico"
                      required
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="password"
                      label="Clave"
                      type="password"
                      filled
                      prepend-inner-icon="mdi-fingerprint"
                      color="red"
                      hint="Tu clave"
                      required
                      clearable
                      @keydown.enter="signIn"
                    />
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
            <small>All fields are required to log in</small>
            <small>Todos los campos son requeridos para ingresar</small>
          </v-card-text>
          <v-card-actions>
            <v-btn class="black--text" color="primary" ripple to="/"
              ><v-icon left>mdi-arrow-left</v-icon>
              Back
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              type="submit"
              color="primary"
              class="black--text"
              ripple
              @click.exact="signIn"
              @click.native="dialog = false"
              ><v-icon left>mdi-account-check</v-icon>
              Sign In
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    valid: false,
    password: '',
    email: '',
    emailRules: [
      v => !!v || 'El email es necesario para enviar una remesa',
      v => /.+@.+/.test(v) || 'El email debe ser valido'
    ]
  }),
  methods: {
    signIn: function() {
      const payload = {
        email: this.email,
        password: this.password,
        returnSecureToken: true
      }
      this.$store.dispatch('auth/signIn', payload)
    }
  }
}
</script>

<style scoped>
.centro {
  text-align: center;
}
.centroimg {
  height: 50%;
  width: 50%;
}
.pad2 {
  margin-top: -10%;
}
</style>
