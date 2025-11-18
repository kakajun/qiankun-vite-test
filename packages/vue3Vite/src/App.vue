
<template>

  <img alt="Vue logo"
  class="icon"
       :src="imgSrc" />
     <img alt="Vue logo" class="icon" src="/vue2Asset/icon.png"/>
  <div id="nav">
    <router-link to="/">Home</router-link>
    |
    <router-link to="/about">About</router-link>
  </div>
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
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #1f2937;
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
}

 .icon {
  width: 50px;
  height: 50px;
  object-fit: contain;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
 }

#nav {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 0 16px;
  border-bottom: 1px solid #e5e7eb;
}

#nav a {
  font-weight: 600;
  color: #374151;
  text-decoration: none;
}

#nav a:hover {
  color: #111827;
}

#nav a.router-link-exact-active {
  color: #3b82f6;
}
</style>
