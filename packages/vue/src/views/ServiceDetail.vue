<template>
  <div>
    <h2>Service Detail Page</h2>
    <h3>{{ serviceTitle }}</h3>
    <p>Service ID: {{ serviceId }}</p>
    <ul>
      <li v-for="(subService, index) in subServices" :key="index">
        <router-link :to="{ name: 'sub-service-detail', params: { serviceId, subServiceId: subService.id }}">
          {{ subService.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    serviceId: {
      type: Number,
      required: true
    }
  },
  computed: {
    subServices() {
      const service = this.services.find(s => s.id === this.serviceId)
      return service ? service.subServices : []
    },
    serviceTitle() {
      const service = this.services.find(s => s.id === this.serviceId)
      return service ? service.title : ''
    }
  },
  data() {
    return {
      services: [
        {
          id: 1,
          title: 'Service A',
          subServices: [
            { id: 1, title: 'Sub-Service A1' },
            { id: 2, title: 'Sub-Service A2' },
            { id: 3, title: 'Sub-Service A3' }
          ]
        },
        {
          id: 2,
          title: 'Service B',
          subServices: [
            { id: 1, title: 'Sub-Service B1' },
            { id: 2, title: 'Sub-Service B2' },
            { id: 3, title: 'Sub-Service B3' }
          ]
        },
        {
          id: 3,
          title: 'Service C',
          subServices: [
            { id: 1, title: 'Sub-Service C1' },
            { id: 2, title: 'Sub-Service C2' },
            { id: 3, title: 'Sub-Service C3' }
          ]
        }
      ]
    }
  }
}
</script>
