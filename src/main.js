import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axiosSetup from "@/helpers/axios";
// import axios from "axios";
// import VueAxios from 'vue-axios'

// call the axios setup method here
axiosSetup();
// Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
