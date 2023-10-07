import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import './assets/css/ele-override.css'

import App from './App.vue'
import router from './router'

import './assets/css/main.css'
// import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
