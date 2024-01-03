import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import AppLayout from "../layouts/AppLayout.vue";
import { getAuth } from "firebase/auth";

const authGuard = async (to, from, next) => {
  const auth = getAuth();

  // Check if the user is authenticated 
  if (to.name !== "dashboard" && !auth.currentUser) {
    // User is not authenticated and not on the "/dashboard" route, redirect to the login page
    next("/");
  } else {
    // User is authenticated or on the "/dashboard" route, proceed to the requested route
    next();
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashBoard.vue"),
      beforeEnter: authGuard,
      meta: { layout: AppLayout },
    },
    {
      path: "/dashboard/board/:id",
      name: "board",
      component: () => import("../views/BoardView.vue"),
      meta: { layout: AppLayout },
    },
  ],
});

export default router;
