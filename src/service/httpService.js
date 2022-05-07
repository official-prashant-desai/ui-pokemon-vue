import { constants } from "@/lib/constants";
import axios from "axios";

const POKEMON_LIST_API = constants.pokemonURL;

export default {
  axios,
  fetchPokemonList(params) {
    return axios.get(POKEMON_LIST_API, { params });
  },

  fetchPokemonDetails(url) {
    return axios.get(url);
  }
};
