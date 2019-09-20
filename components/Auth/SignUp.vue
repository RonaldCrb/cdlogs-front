<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="8" lg="5">
        <v-card color="black">
          <v-card-title>
            <v-col cols="10" offset-xs3>
              <img src="@/static/icon.png" class="centroimg" />
            </v-col>
            <v-col cols="12">
              <h2 class="centro">Registro de Usuario</h2>
            </v-col>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                @submit.prevent="register"
              >
                <v-row wrap>
                  <!-- <v-col cols="12">
                    <v-text-field
                      v-model="name"
                      label="Nombre"
                      type="text"
                      hint="Nombre y Apellido"
                      color="red"
                      filled
                      prepend-inner-icon="mdi-account"
                      clearable
                      required
                    />
                  </v-col> -->
                  <v-col cols="12">
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
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
                      :rules="passwordRules"
                      label="Clave"
                      type="password"
                      filled
                      prepend-inner-icon="mdi-fingerprint"
                      color="red"
                      hint="Tu clave"
                      required
                      clearable
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="passwordConfirm"
                      :rules="[comparePasswords]"
                      label="Confirme su clave"
                      type="password"
                      prepend-inner-icon="mdi-fingerprint"
                      hint="Confirma tu clave"
                      required
                      color="red"
                      clearable
                      filled
                      @keyup.enter="signUp"
                    />
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
            <small
              >All fields are required to register a User</small
            >
            <small
              >Todos los campos son requeridos para registrar un usuario</small
            >
          </v-card-text>
          <v-card-actions>
            <v-btn color="red" text ripple to="/"
              ><v-icon left>mdi-arrow-left</v-icon>
              Regresar
            </v-btn>

            <v-spacer></v-spacer>
            <v-btn type="submit" color="red" text ripple @click.exact="signUp"
              ><v-icon left>mdi-account-plus</v-icon>
              Registrar
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
    name: '',
    password: '',
    passwordConfirm: '',
    email: '',
    emailRules: [
      v => !!v || 'El e-mail es requerido',
      v => /.+@.+/.test(v) || 'El e-mail debe ser valido'
    ],
    passwordRules: [
      v => !!v || 'El Password es requerido',
    ]
  }),
  computed: {
    comparePasswords() {
      return this.password === this.passwordConfirm
        ? true
        : 'la Clave no coincide'
    }
  },
  methods: {
    signUp: function() {
      const payload = {
        email: this.email,
        password: this.password,
      }
      this.$store.dispatch('auth/signUp', payload)
    }
  }
}
</script>

<style scoped>
.centro {
  text-align: center;
}
.centroimg {
  height: 100%;
  width: 60%;
}
</style>
