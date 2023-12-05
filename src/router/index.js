import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import("../views/AboutView.vue"),
  },
  {
    path: "/drag",
    name: "drag-drop",
    component: () =>
      import("../views/DragDrop.vue"),
  },
  {
    path: "/drag1",
    name: "drag1",
    component: () =>
      import("../views/DragTest.vue"),
  },
  {
    path: "/drag2",
    name: "drag2",
    component: () =>
      import("../views/DragTest2.vue"),
  },
  {
    path: "/drag3",
    name: "drag3",
    component: () =>
      import("../views/DragTest3.vue"),
  },
  {
    path: "/drag4",
    name: "drag4",
    component: () =>
      import("../views/DragTest4.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
