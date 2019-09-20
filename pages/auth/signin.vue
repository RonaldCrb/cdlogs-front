<template>
  <div>
    <SignIn />
  </div>
</template>

<script>
import SignIn from '@/components/Auth/SignIn.vue'
export default {
  components: {
    SignIn
  },
  async fetch({ store}) {
    await store.dispatch('auth/logout')
  }
}
</script>

<style scoped></style>
