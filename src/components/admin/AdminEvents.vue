<template>
  <div class="events-view">
    <div class="container page">
      <app-tabs :data-tabs="dataTabs"></app-tabs>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import AppTabs from '@/components/ui/AppTabs'

export default {
  name: 'AdminEvents',
  components: {
    AppTabs
  },
  data() {
    return {
      dataTabs: [
        {
          id: 'main',
          name: 'Мои мероприятия'
        },
        {
          id: 'relation',
          name: 'События'
        },
      ]
    }
  },
}
</script>

<style scoped lang="less">
  @import "~@/assets/less/_importants";

</style>
