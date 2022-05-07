import service from "@/service/httpService";

const state = {
  pokemonListRaw: [],
  pokemonList: [],
  pokemonLimit: 20,
  pokemonOffset: 0,
  isPokemonListLoading: false,
  isErrorInPokemonList: false,
  selectedPokemonId: 0
};
const getters = {
  getPokemonDetailsById(state) {
    return state.pokemonList.find((pokemon) => pokemon.id === state.selectedPokemonId);
  }
};
const mutations = {
  setPokemonListRaw(state, pokemonListRaw) {
    state.pokemonListRaw = pokemonListRaw;
  },
  setPokemonList(state, pokemonList) {
    state.pokemonList = pokemonList;
  },
  setIsErrorInPokemonList(state, isErrorInPokemonList) {
    state.isErrorInPokemonList = isErrorInPokemonList;
  },
  setIsPokemonListLoading(state, isPokemonListLoading) {
    state.isPokemonListLoading = isPokemonListLoading;
  },
  setSelectedPokemonId(state, selectedPokemonId) {
    state.selectedPokemonId = selectedPokemonId;
  }
};
const actions = {
  fetchPokemonList({ commit, dispatch }, params) {
    commit("setIsPokemonListLoading", true);
    service
      .fetchPokemonList(params)
      .then((resp) => {
        commit("setPokemonListRaw", resp.data.results);
        commit("setIsErrorInPokemonList", false);
      })
      .catch(() => {
        commit("setIsErrorInPokemonList", true);
      })
      .finally(() => {
        dispatch("fetchPokemonDetails");
      });
  },
  fetchPokemonDetails({ state, commit }) {
    let pokemonList = state.pokemonList;
    state.pokemonListRaw.forEach(item => {
      service.fetchPokemonDetails(item.url)
      .then((resp) => {
        pokemonList.push(resp.data);
      })
      .catch(() => {
        commit("setIsErrorInPokemonList", true);
      })
      .finally(() => {
        pokemonList.sort((a, b) => a.id - b.id);
        commit("setPokemonList", pokemonList);
        commit("setIsPokemonListLoading", false);
      });
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
