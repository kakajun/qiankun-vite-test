
<template>
  <img alt="Vue logo"
  class="img-wrapper"
       :src="imgSrc" />
  <router-link to="/">Home</router-link> |
  <router-link to="/about">About</router-link>
  <router-view />
  <HelloWorld msg="Hello Vue 3 + Vite" />
</template>
<script>
import HelloWorld from './components/HelloWorld.vue'
  export default {
    name: 'About',
    components: {
      HelloWorld
    },
    computed:{
      imgSrc(){
        return  window.ORIGIN+"/assets/logo.png"
      }
    }
  }
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.img-wrapper{
  border: 1px solid #ccc;
}
</style>
