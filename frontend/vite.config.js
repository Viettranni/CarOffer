import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    host: true, // This will allow Vite to listen on all addresses
    port: process.env.PORT || 5173, 
  },
});

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
