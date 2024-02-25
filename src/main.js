import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import router from './router'

createApp(App)
    .use(createPinia())
    .use(router)
    .mount('#app')
