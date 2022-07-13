import Vue from "vue";
import App from "./App.vue";
import Element from "element-ui";
import * as filters from "./filters"; // global filters
import router from "./router";
import store from "./store";
import "element-ui/lib/theme-chalk/index.css";
import './styles/element-variables.scss'
import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import "@/styles/index.scss"; // global css

import "./icons"; // icon
import "./permission"; // permission control

Vue.use(Element, {
  size: "small", // set element-ui default size
});

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
