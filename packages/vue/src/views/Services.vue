<template>
  <div>
    <h1>Services</h1>
    <el-row>
      <el-col :span='12'>
        这里是二级路由菜单
            <ul>
      <li v-for="(service, index) in services" :key="index">
        <router-link :to="{ name: 'sub-service-detail', params: { serviceId: service.id, subServiceId: service.subId }}">
          {{ service.title }}
        </router-link>
      </li>
    </ul>
      </el-col>
        <el-col :span='12'> 
           <router-view></router-view>
           </el-col>


    </el-row>

  </div>
</template>

<script>
export default {
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
