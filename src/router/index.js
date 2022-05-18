import { createRouter, createWebHistory } from "vue-router";
import authToken from "@/utils/token";
import authRole from "@/utils/role";
import store from "@/store/index";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresVisitor)) {
    if (authToken.getToken()) {
      next({
        path: "/",
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authToken.getToken()) {
      next({
        path: "/login",
      });
    } else if (store.getters.auth.auth) {
      if (to.name === "skill.index" || to.name === "position.index") {
        if (authRole.getRole() === "2" || authRole.getRole() === "3") {
          next();
        } else {
          next({
            path: "/",
          });
        }
      } else {
        next();
      }
    } else {
      store
        .dispatch("auth/getAuth")
        .then(() => {
          next();
        })
        .catch(() => {
          next("/login");
        });
    }
  } else {
    next();
  }
});

export default router;
