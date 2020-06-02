import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue} from 'bootstrap-vue'
import x5GMaps from 'x5-gmaps'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(x5GMaps, 'AIzaSyBW8UG23-aiyr-7MlU_xzoYoKq8KFXcLeA')

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
