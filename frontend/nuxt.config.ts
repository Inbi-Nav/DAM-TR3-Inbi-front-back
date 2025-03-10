import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  devServer: {
    port: 3000,  
    host: '0.0.0.0' 
  },
  vite: {
    server: {
      watch: {
        usePolling: true, 
      }
    }
  }
})
