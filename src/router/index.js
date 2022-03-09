import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";
import { AUTH_IS_USER_EXIST } from "../store/Constants";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      needAuth: false,
    },
  },
  {
    path: "/operations",
    name: "Operations",
    component: () => import("../views/Operations.vue"),
    meta: {
      needAuth: true,
    },
  },
  { path: "/:pathMatch(.*)*", component: () => import("../views/404.vue") },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  // to.matched.some(path=>path.meta.needAuth) also can used.
  if (
    "needAuth" in to.meta &&
    to.meta.needAuth &&
    !store.getters[`authStore/${AUTH_IS_USER_EXIST}`]
  ) {
    return next("/login");
  } else if (
    "needAuth" in to.meta &&
    !to.meta.needAuth &&
    store.getters[`authStore/${AUTH_IS_USER_EXIST}`]
  ) {
    return next("/");
  } else next();
});
export default router;
