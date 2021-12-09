<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
      <router-link to="/about1">About1</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  mounted() {
    /* 这里假设 */
    console.log(this.$qiankun.getGlobalState(),"8999999")
// 这里主工程改变值后这里会得到响应
  this.$qiankun.onGlobalStateChange &&
    this.$qiankun.onGlobalStateChange(
      (value, prev) =>
        console.log(`[onGlobalStateChange - ${this.$qiankun.name}]:`, value, prev),
      true
    );

    // 这里是主动改变主工程全局变量
     this.$qiankun.setGlobalState &&
    this.$qiankun.setGlobalState({
      ignore: 'hhhhhh',
      user: {
        name: 'cccccccccccc',
      },
    });
  },
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding-bottom: 20px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
