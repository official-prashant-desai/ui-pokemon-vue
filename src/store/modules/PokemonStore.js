import service from "@/service/httpService";

const state = {
  pokemonListRaw: [],
  pokemonList: [],
  pokemonLimit: 20,
  pokemonOffset: 0,
  isPokemonListLoading: false,
  isErrorInPokemonList: false,
  selectedPokemonId: 0,
  nextUrl: null,
  prevUrl: null,
  totalRecordCount: 0,
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
  },
  setPokemonLimit(state, pokemonLimit) {
    state.pokemonLimit = pokemonLimit;
  },
  setPokemonOffset(state, pokemonOffset) {
    state.pokemonOffset = pokemonOffset;
  },
  setPrevUrl(state, prevUrl) {
    state.prevUrl = prevUrl;
  },
  setNextUrl(state, nextUrl) {
    state.nextUrl = nextUrl;
  },
  setTotalRecordCount(state, totalRecordCount) {
    state.totalRecordCount = totalRecordCount;
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
        commit("setPrevUrl", resp.data.previous);
        commit("setNextUrl", resp.data.next);
        commit("setTotalRecordCount", resp.data.count);
      })
      .catch(() => {
        commit("setIsErrorInPokemonList", true);
      })
      .finally(() => {
        dispatch("fetchPokemonDetails");
      });
  },
  fetchPokemonDetails({ state, commit }) {
    let pokemonList = [];
    state.pokemonListRaw.forEach(item => {
      service.fetchPokemonDetails(item.url)
      .then((resp) => {
        pokemonList.push(resp.data);
      })
      .catch(() => {
        commit("setIsErrorInPokemonList", true);
      })
      .finally(() => {
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
