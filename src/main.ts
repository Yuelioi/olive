import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueVideoPlayer from '@videojs-player/vue'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueVideoPlayer)
app.mount('#app')
