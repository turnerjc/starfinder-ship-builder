// vite.config.js
// import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// import vuetify from 'vite-plugin-vuetify';
import { ghPages } from 'vite-plugin-gh-pages';

export default defineConfig({
  base: '/sfshipbuilder/',
  build: {
    chunkSizeWarningLimit: 1000,
  },
  plugins: [
    vue(),
    //  vuetify(),
    ghPages(),
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-browser.js',
    },
  },
});
