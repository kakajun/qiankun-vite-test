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
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #1f2937;
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
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
