<template>
  <div class="list">
    <article v-for="(pokemon, index) in pokemonList"
    :key="'pokemon'+index"
    @click="navigateToDetails(pokemon.id)">
      <div class="top-panel">
        <div class="left-panel">
          <h3>{{ pokemon.name }}</h3>
          <div>{{ constants.metaData.height }} - {{ pokemon.height / 10 }} {{ constants.metaData.heightUnit }}</div>
          <div>{{ constants.metaData.weight }} - {{ pokemon.weight / 10 }} {{ constants.metaData.weightUnit }}</div>
        </div>
        <div class="right-panel">
          <img :src=pokemon.sprites.other.home.front_default :alt=pokemon.name />
        </div>
      </div>
      <div class="bottom-panel">
        <div class="label">{{ constants.metaData.abilities }}</div>
        <div class="ability" 
          v-for="(value, index) in pokemon.abilities"
          :key="'value'+index">
          {{ value.ability.name }}
        </div>
      </div>
    </article>
  </div>
</template>

<script>
  import { mapActions, mapState, mapMutations } from "vuex";
  import { constants } from "../lib/constants";
  export default {
    data: () => {
      return {
        constants
      }
    },
    computed: {
      ...mapState("PokemonStore", [
        "pokemonList",
        "pokemonLimit",
        "pokemonOffset"
      ])
    },
    methods: {
      navigateToDetails(id) {
        this.setSelectedPokemonId(id);
        this.$router.push({ name: "PokemonDetails" });
      },
      ...mapActions("PokemonStore", ["fetchPokemonList"]),
      ...mapMutations("PokemonStore", ["setSelectedPokemonId"])
    },
    created() {
      const params = { limit: this.pokemonLimit, offset: this.pokemonOffset };
      this.fetchPokemonList(params);
    }
  }
</script>

<style lang="scss" scoped>
  .list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 15px;

    article {
      background-color: #ffffff;
      text-transform: capitalize;
      border-radius: 8px;
      cursor: pointer;
      padding: 15px;
      box-shadow: 0 15px 30px rgba(0,0,0,.1),
                  0 10px 10px rgba(0,0,0,.1);
      .top-panel {
        display: inline-block;
        h3 {
          margin: 0 0 10px 0;
        }
        .left-panel {
          float: left;
          width: 50%;
        }
        .right-panel {
          float:right;
          width: 50%;
          img {
            height: 100%;
            width: 100%;
          }
        }
      }
      .bottom-panel {
        min-height: 20px;
        .label {
          border-bottom: 1px solid #DEE4EA;
        }
        .ability {
          display: inline-block;
          background: #A52620;
          border-radius: 10px;
          padding: 3px 8px;
          margin: 5px 10px 5px 0;
          color: #ffffff;
        }
      }
    }
  }
</style>
