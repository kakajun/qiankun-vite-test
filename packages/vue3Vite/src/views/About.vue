<template>
  <div class="about-content">
    <h1>This is about page</h1>
    <test />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  name: 'About',
  components: {
    test: defineAsyncComponent(() =>
      import('./a.vue')
    )
  },
  setup() { },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.about-content {
  color: #7265e6;
}
</style>
