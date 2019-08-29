<template>
  <div>
    <Banner />
    <DivePlanner />
  </div>
</template>

<script>
import Banner from '@/components/Home/Banner.vue'
import DivePlanner from '@/components/Home/DivePlanner'
export default {
  components: {
    DivePlanner,
    Banner
  }
}
</script>
