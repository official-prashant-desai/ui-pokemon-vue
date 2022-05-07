<template>
  <div class="pokemon-list-wrapper">
    <div v-if="isErrorInPokemonList" class="pokemon-warnings warning">
      {{ constants.errorInFetchingPokemonList }}
    </div>
    <div v-if="isPokemonListLoading" class="pokemon-warnings">
      <i class="fas fa-spinner fa-spin"></i> {{ constants.pokemonListLoadingMsg }}
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
    max-width: calc(100% - 100px);
    .pokemon-warnings {
      border-radius: 8px;
      padding: 50px 20px;
      background: #ffffff;
      font-size: 18px;
      text-align: center;
      box-shadow: 0 15px 30px rgba(0,0,0,.2),
                  0 10px 10px rgba(0,0,0,.2);
    }
    .warning {
      color: #B4401B;
    }
  }
</style>
