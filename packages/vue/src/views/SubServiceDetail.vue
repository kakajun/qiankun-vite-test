<template>
  <el-row>
     <el-col :span='12'>
        这里是三级路由菜单
          <ul>
      <li v-for="(subService, index) in subServices" :key="index">
        <router-link :to="{ name: 'service-detail', params: { serviceId, subServiceId, id: subService.id }}">
          {{ subService.title }}
        </router-link>
      </li>
    </ul>
     </el-col>
 <h2>Sub-Service Detail Page</h2>
    <h3>{{ serviceTitle }} - {{ subServiceTitle }}</h3>
    <p>Sub-Service ID: {{ subServiceId }}</p>
       <el-col :span='12'>

     </el-col>


  </el-row>
</template>

<script>
export default {
  props: {
    serviceId: {
      type: Number,
      required: true
    },
    subServiceId: {
      type: Number,
      required: true
    }
  },
  computed: {
    subServices() {
      const service = this.services.find(s => s.id === this.serviceId)
      if (service) {
        return service.subServices.filter(s => s.id === this.subServiceId)
      } else {
        return []
      }
    },
    serviceTitle() {
      const service = this.services.find(s => s.id === this.serviceId)
      return service ? service.title : ''
    },
    subServiceTitle() {
      const service = this.services.find(s => s.id === this.serviceId)
      if (service) {
        const subService = service.subServices.find(s => s.id === this.subServiceId)
        return subService ? subService.title : ''
      } else {
        return ''
      }
    }
  },
  data() {
    return {
      services: [
        {
          id: 1,
          subId: 1,
          title: 'Service A',
          subServices: [
            { id: 1, title: 'Sub-Service A1' },
            { id: 2, title: 'Sub-Service A2' },
            { id: 3, title: 'Sub-Service A3' }
          ]
        },
        {
          id: 2,
          subId: 2,
          title: 'Service B',
          subServices: [
            { id: 1, title: 'Sub-Service B1' },
            { id: 2, title: 'Sub-Service B2' },
            { id: 3, title: 'Sub-Service B3' }
          ]
        },
        {
          id: 3,
          subId: 3,
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
