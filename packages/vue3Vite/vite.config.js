import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun';
import { resolve } from "path";
import { loadEnv } from 'vite'
const { name } = require('./package');
// useDevMode 开启时与热更新插件冲突
const useDevMode = true     // 如果是在主应用中加载子应用vite,必须打开这个,否则vite加载不成功, 单独运行没影响

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  let config = {
        plugins: [vue(),qiankun('vue3Vite', {useDevMode })],
        resolve: {
          extensions: ['.js', '.vue', '.json'],
            alias: {
              '@': resolve('src'),
              },
          },
        server: {
        host: '0.0.0.0' ,// 暴露内网ip
        port: 7316,
        cors: true,
        },
      define: {
        'process.env': env
      }
    }
  return config
})
