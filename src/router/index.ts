import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/games",
    name: "Games",
    component: () => import("../layout/Layout.vue"),
    children: [
      {
        path: "alien-abduction",
        name: "AlienAbduction",
        component: () => import("../views/games/AlienAbduction.vue"),
      },
      {
        path: "landlord",
        name: "Landlord",
        component: () => import("../views/games/Landlord.vue"),
      },
      {
        path: "puppets-runner",
        name: "PuppetsRunner",
        component: () => import("../views/games/PuppetsRunner.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
