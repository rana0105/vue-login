import { createApp } from "vue";
import App from "./App.vue";
axios.defaults.headers.common = {
  "X-Requested-With": "XMLHttpRequest",
  "X-CSRF-TOKEN": window.csrf_token,
  Authorization: window.localStorage.getItem("token"),
  UserCode: window.localStorage.getItem("userCode"),
  "Access-Control-Allow-Origin": "*",
};

import 'bootstrap/scss/bootstrap.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap";
import 'vue-select/dist/vue-select.css';
import "vue-select/src/scss/vue-select.scss";
import router from '@/router';
import config from "./constant/config";
import axios from "axios";
window.axios = require("axios");
import VueAxios from 'vue-axios';
import store from "@/state/store.js";
import vSelect from 'vue-select'
import VCalendar from 'v-calendar';
import moment from 'moment';
createApp(App).component('v-select', vSelect)
axios.defaults.baseURL = config.API_BASE_URL;
let app = createApp(App);

app.config.globalProperties.$filters = {
  timeAgo(date) {
    return moment(date).fromNow()
  },
}
app.config.devtools = true
app.use(store)
app.use(router, config, VueAxios, axios, VCalendar);
app.mount("#app");
