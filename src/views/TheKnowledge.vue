<template>
  <section class="knowledge">
    <router-view></router-view>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TheKnowledge',
  computed: {
    ...mapGetters('user', [
      'status'
    ])
  },
  mounted() {
    if (this.status > 1) {
      this.$store.dispatch('courses/getMyCourses')
    }
  }
}
</script>

<style scoped>

</style>
