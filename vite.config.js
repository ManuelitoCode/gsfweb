import { defineConfig } from 'vite';
import { resolve } from 'path'; // Import 'resolve' from the 'path' module

export default defineConfig({
  root: '.',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Configure Rollup options for multiple entry points
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'), // Main entry point
        about: resolve(__dirname, 'about.html'),   // Add about.html
        contact: resolve(__dirname, 'contact.html'), // Add contact.html
        // Assuming tournaments/index.html is also a separate page
        tournaments: resolve(__dirname, 'tournaments/index.html'),
      },
    },
  },
});