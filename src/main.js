import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'
import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(Antd)

app.mount('#app')
