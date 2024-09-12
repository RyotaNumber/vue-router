import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify/lib/framework.mjs'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import "vuetify/dist/vuetify.min.css";
import '@mdi/font/css/materialdesignicons.css' // この行を追加

const vuetify = createVuetify({
    components,
    directives,
})



const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')
