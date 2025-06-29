import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import './assets/main.css'

const app = createApp(App);
app.use(router);
app.use(createPinia());

// @ts-ignore
app.config.devtools = false;
app.mount('#app');