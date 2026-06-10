import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/register",
      name: "register",
      component: () => import("../views/auth/register.vue"),
      meta: { guest: true },
    },

    {
      path: "/login",
      name: "login",
      component: () => import("../views/auth/login.vue"),
      meta: { guest: true },
    },

    {
      path: "/forgot",
      name: "forgot",
      component: () => import("../views/auth/forgot.vue"),
      meta: { guest: true },
    },

    {
      path: "/",
      name: "home",
      component: () => import("../views/index.vue"),
      meta: { auth: true },
    },

    {
      path: "/products",
      name: "products",
      component: () => import("../views/products/index.vue"),
      meta: { auth: true },
    },

    {
      path: "/products/create",
      name: "products.create",
      component: () => import("../views/products/create.vue"),
      meta: { auth: true },
    },

    {
      path: "/products/:id/edit",
      name: "products.edit",
      component: () => import("../views/products/update.vue"),
      meta: { auth: true },
    },

    {
      path: "/orders",
      name: "orders",
      component: () => import("../views/orders/index.vue"),
      meta: { auth: true },
    },

    {
      path: "/orders/:id",
      name: "orders.show",
      component: () => import("../views/orders/show.vue"),
      meta: { auth: true },
    },

    {
      path: "/customers",
      name: "customers",
      component: () => import("../views/customers/index.vue"),
      meta: { auth: true },
    },


    {
      path: "/notifications",
      name: "notifications",
      component: () => import("../views/notifications/index.vue"),
      meta: { auth: true },
    },

    {
      path: "/settings",
      name: "settings",
      component: () => import("../views/settings/index.vue"),
      meta: { auth: true },
    },
  ],
});


router.beforeEach(async (to) => {
  const auth = useAuthStore();

  if (!auth.user) {
    await auth.getUser();
  }

  if (to.meta.auth && !auth.loggedIn) {
    return { name: "login", query: { redirect: to.fullPath } };
  }

  if (to.meta.guest && auth.loggedIn) {
    return "/";
  }
});

export default router;