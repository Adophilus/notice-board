import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import AsyncComputed from "vue-async-computed"

createApp(App).use(store).use(router).mount('#app')
