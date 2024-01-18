import '@/assets/styles/index.scss';
import V3ScrollLock from 'v3-scroll-lock';
import { createApp } from 'vue';

import App from './App.vue';

createApp(App).use(V3ScrollLock, { reserveScrollBarGap: true }).mount('#app');
