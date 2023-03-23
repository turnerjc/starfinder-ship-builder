import { createApp } from 'vue';
import App from './App.vue';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';

const vuetify = createVuetify({});

createApp(App).use(vuetify).mount('#app');
