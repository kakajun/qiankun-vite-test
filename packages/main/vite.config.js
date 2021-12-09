import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "src"),
      },
    ],
  },
  server: {
    open: true,
    host: "0.0.0.0",
    port: 8080,
    // Load proxy configuration from .env
    // proxy: createProxy(VITE_PROXY),
    proxy: {
       // 字符串简写写法  // 这个有问题
      // '/cnbi': 'http://192.168.2.207:9005',
      // '/api': 'http://192.168.2.207:9008/cnbi',
      // 选项写法
      '/cnbi': {
        target: 'http://192.168.2.207:9005',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cnbi/, '')
      },
        '/api': {
        target: 'http://192.168.2.207:9005',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
});
