<template>
  <div id="app">

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="less">
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

  a {
    font-weight: 600;
    color: #374151;
    text-decoration: none;

    &:hover {
      color: #111827;
    }

    &.router-link-exact-active {
      color: #3b82f6;
    }
  }
}
</style>
