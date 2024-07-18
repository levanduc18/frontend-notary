import { createApp } from 'vue';
import '@/assets/styles/global.scss';
import App from '@/App.vue';
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import '@/assets/styles/tailwind.css';
import router from '@/router';
import MyPreset from '@/helpers/preset.js';
import ToastService from 'primevue/toastservice';

createApp(App)
  .use(PrimeVue, {
    theme: {
      preset: MyPreset,
    },
  })
  .use(router)
  .use(ToastService)
  .mount('#app');
