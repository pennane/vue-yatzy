import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
//import './registerServiceWorker';

import VClickOutside from "v-click-outside";
import VScrollLock from "v-scroll-lock";
import VueHotkey from 'v-hotkey'


Vue.config.productionTip = false;

Vue.use(VClickOutside);
Vue.use(VScrollLock)
Vue.use(VueHotkey)

new Vue({
  router,
  store,
  render: h => h(App),
  methods: {
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    playSound(sound) {
      let audio = new Audio(sound);
      audio.play()
    }
  }
}).$mount('#app');