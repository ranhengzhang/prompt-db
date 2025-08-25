import {createRouter, createWebHashHistory} from "vue-router";
import TheTemplaterPage from "./pages/TheTemplaterPage.vue";
import TheCommandPage from "./pages/TheCommandPage.vue";
import TheModelPage from "./pages/TheModelPage.vue";
import TheToolPage from "./pages/TheToolPage.vue";

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            redirect: "/templater"
        },
        {
            path: "/templater",
            component: TheTemplaterPage
        },
        {
            path: "/command",
            component: TheCommandPage
        },
        {
            path: "/model",
            component: TheModelPage
        },
        {
            path: "/tool",
            component: TheToolPage
        },
    ]
});