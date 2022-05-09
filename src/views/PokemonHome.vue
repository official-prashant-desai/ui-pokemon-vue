<template>
  <div class="pokemon-list-wrapper" data-test="pokemonList">
    <div v-if="isErrorInPokemonList" class="pokemon-warnings" data-test="pokemonError">
      <span>{{ constants.errorInFetchingPokemonList }}</span>
    </div>
    <div v-if="isPokemonListLoading" class="pokemon-warnings" data-test="pokemonLoading">
      <span><i class="fas fa-spinner fa-spin"></i> {{ constants.pokemonListLoadingMsg }}</span>
    </div>
    <PokemonList/>
  </div>
</template>

<script>
  import PokemonList from '../components/PokemonList.vue';
  import { constants } from "../lib/constants";
  import { mapState } from 'vuex';

  export default {
    name: "PokemonHome",
    components: {
      PokemonList
    },
    data: () => {
      return {
        constants
      }
    },
    computed: {
      ...mapState("PokemonStore", [
        "isPokemonListLoading",
        "isErrorInPokemonList"
      ])
    }
  }
</script>

<style lang="scss" scoped>
  .pokemon-list-wrapper {
    width: 100%;
    max-width: calc(100% - 10%);
    .pokemon-warnings {
      background: #000000;
      font-size: 25px;
      text-align: center;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      opacity: 0.7;
      color: #fff;
      > span {
        top: 30%;
        position: relative;
      }
    }
  }
</style>
