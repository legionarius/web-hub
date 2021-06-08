import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/games/alien-abduction",
    name: "AlienAbduction",
    component: () => import("../views/games/AlienAbduction.vue"),
  },
  {
    path: "/games/landlord",
    name: "Landlord",
    component: () => import("../views/games/Landlord.vue"),
  },
  {
    path: "/games/puppets-runner",
    name: "PuppetsRunner",
    component: () => import("../views/games/PuppetsRunner.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
