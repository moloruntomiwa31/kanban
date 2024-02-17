import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import AppLayout from "../layouts/AppLayout.vue";
import { getAuth } from "firebase/auth";
import { useUser } from "@/stores/user";

const authGuard = async (to, from, next) => {
  const auth = getAuth();
  // Check if the user is authenticated 
  if (!useUser().userIsLoggedIn) {
    if (to.name !== "home") {
      // User is not authenticated and not on the login page, redirect to the login page
      next({ name: "home" });
    } else {
      // User is not authenticated but already on the login page, allow access to avoid infinite loop
      next();
    }
  } else {
    // User is authenticated, proceed to the requested route
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
      component: () => import("../views/Dashboard.vue"),
      beforeEnter: authGuard,
      meta: { layout: AppLayout },
    },
    {
      path: "/dashboard/board/:id",
      name: "board",
      component: () => import("../views/BoardView.vue"),
      beforeEnter: authGuard,
      meta: { layout: AppLayout },
    },
    {
      path: "/pagenotfound",
      name: "Error",
      component: () => import("../views/Error.vue"),
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/pagenotfound"
    }
  ],
});

export default router;
