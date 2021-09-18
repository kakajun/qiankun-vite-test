import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun';
import  { resolve } from "path";
const { name } = require('./package');
// useDevMode 开启时与热更新插件冲突
const useDevMode = true     // 如果是在主应用中加载子应用vite,必须打开这个,否则vite加载不成功, 单独运行没影响

// https://vitejs.dev/config/
export default defineConfig(({ mode }) =>{
    let config={
        plugins: [vue(),qiankun('vue3Vite', {useDevMode })],
        alias: {
        '@': resolve('src'),
        },
        server: {
        port: 7316,
        cors: true,
        },
        output: {
        // 把子应用打包成 umd 库格式
        library: `${name}-[name]`,
        libraryTarget: 'umd',
        jsonpFunction: `webpackJsonp_${name}`,
            },
    }
    // if (mode === 'development') {
    //     config.base = 'http://localhost:7316/'
    //   }
  return config
})
