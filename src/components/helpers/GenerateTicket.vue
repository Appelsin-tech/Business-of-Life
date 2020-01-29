<template>
  <div>
    <button class="test-btn" @click="generateTicket">Создать билет</button>
  </div>
</template>

<script>
import API from '@/api/index'
export default {
  name: 'GenerateTicket',
  props: ['id'],
  methods: {
    generateTicket() {
      API.tickets.issue({id: this.id}).then(response => {
        console.log(response.data.hash)
      })
    }
  }
}
</script>

<style scoped>

</style>
