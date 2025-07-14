<script setup>
import { ref } from 'vue'
import { getCurrentInstance } from 'vue'
 const { proxy } = getCurrentInstance()
 const user=ref({name:''})

 const getMainInfo = () => {
  console.log( proxy.$getGlobalState()," proxy.$getGlobalState()")
  const globalState = proxy.$getGlobalState()
  user.value=globalState.user
}

const changeGlobState = () => {
  proxy.$setGlobalState({
    user: { name: '张三' }
  })
}


defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>

  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>

 <button type="button" @click="getMainInfo">获取主工程参数</button>
 <div>{{ user.name }}</div>

 <button type="button" @click="changeGlobState">主动修改主工程参数</button>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
