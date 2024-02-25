import { createWebHistory, createRouter } from "vue-router";

const routes =  [
    {
        path: "/login",
        alias: "/login",
        name: "login",
        component: () => import("./components/LoginForm.vue")
    }
];

const authRouter = createRouter({
    history: createWebHistory(),
    routes,
});

export default authRouter;