import Vue from 'vue'
import App from './App.vue'
import store from './store'
import {BootstrapVue} from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import myPlugin from './plugins/my-plugin'
import router from './router'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(myPlugin)


// Vue.mixin({
//   data(){
//     return{
//       wellcome : "Hi Hamid Darani"
//     }
//   },
//   created(){
//     console.log(this.wellcome)
//   }
// })


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
