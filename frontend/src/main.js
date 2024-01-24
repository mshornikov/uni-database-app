import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

import DataPage from "./components/DataPage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: DataPage,
            beforeEnter: () => {
                return { path: "/doctors" };
            },
        },
        {
            path: "/doctors",
            component: DataPage,
        },
        {
            path: "/visits",
            component: DataPage,
        },
        {
            path: "/services",
            component: DataPage,
        },
        {
            path: "/patients",
            component: DataPage,
        },
        {
            path: "/rooms",
            component: DataPage,
        },
        {
            path: "/service-lists",
            component: DataPage,
        },
    ],
});

createApp(App).use(router).mount("#app");
