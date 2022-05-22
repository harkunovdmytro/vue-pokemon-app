import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import './../index.scss'

createApp(App).use(store).mount('#app')
