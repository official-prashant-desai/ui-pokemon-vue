import PokemonStore from "./modules/PokemonStore";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    PokemonStore
  },
});
