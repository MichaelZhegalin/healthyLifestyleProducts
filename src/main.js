import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router/router'
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'
import { createPinia } from 'pinia'

loadFonts()

createApp(App)
  .use(bootstrap)
  .use(vuetify)
  .use(router)
  .use(createPinia())
  .mount('#app')
