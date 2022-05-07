import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    component: () => import(/* webpackChunkName: "PokemonList" */ "../views/PokemonHome.vue"),
    name: "PokemonList",
    path: "/pokemon-list"
  },
  {
    component: () =>
      import(/* webpackChunkName: "PokemonDetails" */ "../views/PokemonDetails.vue"),
    name: "PokemonDetails",
    path: "/pokemon-details"
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
