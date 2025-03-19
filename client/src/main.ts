import { createApp } from 'vue'
import { createPinia } from "pinia";

import './assets/main.css'
import '@/services/AxiosInterceptorSetup'
// นำเข้า Font Awesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import router from './router'
import 'nprogress/nprogress.css'

const pinia = createPinia();
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(pinia);
app.use(router) // ใช้ router
app.mount('#app')
