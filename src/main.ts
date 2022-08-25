import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/index.css'

import App from "@/App.vue";
import "@/index.css";
import router from "@/router/index.js";
import store from "@/store/index.js"
import EmptyLayout from "@/components/layouts/EmptyLayout.vue";
import NavLayout from "@/components/layouts/NavLayout.vue";

const app = createApp(App).use(createPinia()).use(router).use(store)
app.component("empty-layout", EmptyLayout)
app.component("nav-layout", NavLayout) //before the mount
app.mount("#app");
