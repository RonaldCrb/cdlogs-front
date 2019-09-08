<template>
  <v-app dark>
    <v-app-bar
      clipped-right
      fixed
      app
      color="secondary"
    >
      <v-toolbar-title>
        <nuxt-link to="/">
          <v-img
            class="navbarLogo"
            src="https://firebasestorage.googleapis.com/v0/b/ron-alonzo.appspot.com/o/cdlogs%2FCDlogs_logo.png?alt=media&token=2dc8704d-3d97-4dae-b9a5-b7f1662c1d5a">
          </v-img>
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      right
      fixed
      color="secondary"
    >
      <nuxt-link to="/">
        <v-img src="https://firebasestorage.googleapis.com/v0/b/ron-alonzo.appspot.com/o/cdlogs%2Fcdlogs_00.png?alt=media&token=c1eb71e0-f34e-45d9-a53f-aa0ed58ad7ad" contain></v-img>
      </nuxt-link>
      <v-list>
        <v-list-item v-for="(route, i) in routes" :key="i" :to="route.to">
          <v-list-item-action>
            <v-icon color="accent">
              {{ route.icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>{{ route.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :fixed="fixed"
      app
    >
    <v-row justify="center">
      <span>Ron Alonzo &copy; 2019</span>
    </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      routes: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Smartlogs',
          to: '/smartlogs'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Dive Planner',
          to: '/planner'
        },
        {
          icon: 'mdi-code-braces',
          title: 'diving-decompression',
          to: '/decompression'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
<style scoped>
  .navbarLogo {
    height: 100%;
    width: 100px;
  }
</style>
