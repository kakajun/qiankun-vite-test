<template>
  <div class="about">
    <h1>This is about page</h1>
     <h1>我是一级路由</h1>
    <el-button type="primary" @click='clickTo'>跳转二级路由</el-button>
  </div>
</template>
<script>
export default {
  methods:{
    clickTo(){
      this.$router.push('/about/text')
    }
  }
}
</script>

<style scoped>
.about {
  color: #7265e6;
}
</style>
