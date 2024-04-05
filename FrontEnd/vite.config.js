import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': "http://localhost:5000",
       '/socket.io': {
        target: 'http://localhost:5000', // Replace with your server's port
        changeOrigin: true,
      },
    },
  },
});