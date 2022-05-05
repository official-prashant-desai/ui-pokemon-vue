import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    component: () => import(/* webpackChunkName: "PokemonList" */ "../views/PokemonList.vue"),
    name: "PokemonList",
    path: "/pokemon-list"
  },
  {
    name: "default",
    path: "*",
    redirect: "/pokemon-list",
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: "history",
  routes,
});

export default router;
