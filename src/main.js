import { createApp } from 'vue';
import '@/style.scss';
import App from '@/layouts/app-layout.vue';
import router from '@/router';

createApp(App).use(router).mount('#app');
