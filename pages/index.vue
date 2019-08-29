<template>
    <nuxt-link to="/planner">
      <vflex justify-center>
        <p text-xs-center>hola</p>
      <v-img
        class="logo"
        src="https://firebasestorage.googleapis.com/v0/b/ron-alonzo.appspot.com/o/cdlogs%2Fcdlogs_00.png?alt=media&token=c1eb71e0-f34e-45d9-a53f-aa0ed58ad7ad">
      </v-img>
    </vflex>
  </nuxt-link>
</template>

<script>
export default {
  layout: 'entrada',
}
</script>

<style absolute>
  .logo {
    left: 50%;
    width: 60%;
    height: 60%;
    transform: translateX(-50%);
    border-radius: 50%;
    /* background-color: blue; */
}
</style>
