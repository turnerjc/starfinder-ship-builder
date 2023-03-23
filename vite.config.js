import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

export default defineConfig({
  root: 'src',
  base: '/starfinder-ship-builder/',
  plugins: [vue(), vuetify()],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-browser.js',
    },
  },
});
