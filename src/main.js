import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSession from 'vue-session'
import VueSweetalert2 from 'vue-sweetalert2';
import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr'
import axios from 'axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import vSelect from 'vue-select'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'sweetalert2/dist/sweetalert2.min.css';
import 'vue-select/dist/vue-select.css';
import './assets/css/estilos.css'

function toast ({title, message, type, timeout, cb}) {
  return miniToastr[type](message, title, timeout, cb)
}

const toastTypes  = {
  success: 'success',
  error: 'error',
  info: 'info',
  warn: 'warn'
}

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}

Vue.use(VueSession)
Vue.use(IconsPlugin)
Vue.use(BootstrapVue)
Vue.use(VueSweetalert2);
Vue.use(VueNotifications, options)

Vue.component('v-select', vSelect)

Vue.config.productionTip = false

miniToastr.init({types: toastTypes})

Vue.prototype.$http = axios;
Vue.prototype.$api = "http://localhost:9090/api/"; 

// import LocalStorageService from "./services/LocalStorageService";
// const token = LocalStorageService.getAccessToken();

// axios.interceptors.request.use(
//     (config) => {
//       config.headers["Authorization"] = token;
//       //console.info(config);
//       return config;
//     },
//     (error) => {
//       Promise.reject(error);
//     }
// );

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
