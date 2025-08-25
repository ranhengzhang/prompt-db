import {createApp} from "vue";
import App from "./App.vue";
import router from "./router.ts";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import pinia from "./store";

const app = createApp(App)
app.use(router)
    .use(ElementPlus)
    .use(pinia)
    .mount("#app");
