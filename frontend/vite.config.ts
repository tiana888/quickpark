import react from "@vitejs/plugin-react";
import "dotenv/config";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      // 代理所有 /api 开头的请求到后端服务器
      '/api': {
        target: 'http://localhost:8000', // 后端服务器地址和端口
        changeOrigin: true,
        secure: false, // 如果是 https 服务，需要设置为 true
        ws: true, // 如果您想代理 websockets
      },
    },
  },
});
