import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./pages";
import routerMiddleware from "./middleware";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(routerMiddleware.checkToken);

export default router;
