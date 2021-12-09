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
      "/xxxx": {
        target: "xxxx",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/xxxx/, ""),
      },
    },
  },
});
