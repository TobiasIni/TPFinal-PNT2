import './assets/main.css'
import { useEventStore } from '../src/stores/eventStore.js'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useAuthStore } from '../src/stores/authStore';


const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')

useAuthStore().checkAuth();

//Inicializo la base de datos
useEventStore().inicializarBaseDatos();