<template>
  <img alt="Vue logo" class="icon" src="../assets/logo.png" />
  <HelloWorld msg="Vue.js Demo" @close="close"> </HelloWorld>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  created() {
    console.log('vue3home来了');
  },
  mounted() {
    console.log(this.$route);
  },
  methods: {
    close() {
      console.log('close');
    },
  },
};
</script>

<style scoped>
.icon {
  width: 50px;
  height: 50px;
  object-fit: contain;
}
</style>
