<template>
  <div class="detail" data-test="detailsWrapper">
    <div id="go-back" aria-label="go-back" tabindex="1" @click="navigateToList" data-test="goBackBtn">
      <i class="fas fa-arrow-left"></i>
      {{ constants.metaData.detailsPage.goBack }}
    </div>
    <div class="pokemon-details">
      <h2 class="capitalize">{{ pokemon.name }}</h2>
      <div class="image-info-panel">
        <div class="image">
          <img :src=pokemon.sprites.other.dream_world.front_default :alt=pokemon.name>
        </div>
        <div class="info">
          <div class="data-item">
            <div class="left">{{ constants.metaData.detailsPage.name }}</div>
            <div class="right capitalize">{{ pokemon.name }}</div>
          </div>
          <div class="data-item">
            <div class="left">{{ constants.metaData.detailsPage.id }}</div>
            <div class="right">{{ pokemon.id }}</div>
          </div>
          <div class="data-item">
            <div class="left">{{ constants.metaData.detailsPage.order }}</div>
            <div class="right">{{ pokemon.order }}</div>
          </div>
          <div class="data-item">
            <div class="left">{{ constants.metaData.detailsPage.baseExperience }}</div>
            <div class="right">{{ pokemon.base_experience }} {{ constants.metaData.detailsPage.unitBE }}</div>
          </div>
          <div class="data-item">
            <div class="left">{{ constants.metaData.height }}</div>
            <div class="right">{{ pokemon.height / 10 }} {{ constants.metaData.heightUnit }}</div>
          </div>
          <div class="data-item">
            <div class="left">{{ constants.metaData.weight }}</div>
            <div class="right">{{ pokemon.weight / 10 }} {{ constants.metaData.weightUnit }}</div>
          </div>
        </div>
      </div>
      <div class="types-panel">
        <h3>{{ constants.metaData.detailsPage.types }}</h3>        
        <div class="type" 
          v-for="(value, index) in pokemon.types"
          :key="'value'+index">
          {{ value.type.name }}
        </div>
      </div>
      <div class="ability-panel">
        <h3>{{ constants.metaData.detailsPage.abilities }}</h3>        
        <div class="ability" 
          v-for="(value, index) in pokemon.abilities"
          :key="'value'+index">
          {{ value.ability.name }}
        </div>
      </div>
      <div class="moves-panel">
        <h3>{{ constants.metaData.detailsPage.moves }}</h3>        
        <div class="moves" 
          v-for="(value, index) in pokemon.moves"
          :key="'value'+index">
          {{ value.move.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import { constants } from "../lib/constants";
  export default {
    name: "PokemonDetails",
    data: () => {
        return {
          constants,
          pokemon: {}
        }      
    },
    computed: {
        ...mapGetters("PokemonStore", [
            "getPokemonDetailsById"
        ])
    },
    created() {
        this.pokemon = this.getPokemonDetailsById;
        window.scrollTo(0, 0);
    },
    methods: {
      navigateToList() {
        this.$router.push({ name: "PokemonList" });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .detail {
    width: 70%;
    padding: 10px;
    #go-back {
      display: inline-block;
      cursor: pointer;
      color: #0B70D5;
      padding: 5px 0;
      &:hover, &:active {
        color: #195896;
      }
      .fas {
        padding: 0 10px 0 0;
      }
    }
    .pokemon-details {
      background: #ffffff;
      padding: 2% 4%;
      border-radius: 8px;
      box-shadow: 0 15px 30px rgba(0, 0, 0, .2),
                  0 10px 10px rgba(0, 0, 0, .2);
      margin-top: 15px;
      h2 {
        margin: 10px 0 20px;
        font-size: 30px;
        color: #003263;
      }
      > div {
        width: 100%;
        margin-bottom: 15px;
      }
      .image-info-panel {
        display: flex;
        .image {
          padding: 0 8% 0 0;
          img {
            background: #022964;
            border-radius: 5%;
            padding: 10px;
            width: 18em;
            height: 18em;
            box-shadow: 0 15px 30px rgba(0, 0, 0, .2),
                        0 10px 10px rgba(0, 0, 0, .2);
          }
        }
        .info {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          width: inherit;
          .data-item {
            font-size: 18px;
            padding: 2%;
            border-bottom: 1px solid #DEE4EA;
            .left {
              float: left;
            }
            .right {
              float: right;
            }
          }
        }
      }
      .types-panel, .ability-panel, .moves-panel {
        padding: 10px;
        border-radius: 8px;
        background: #FDFDFD;
        box-shadow: 0 0 5px rgba(0, 0, 0, .1),
                    0 3px 10px rgba(0, 0, 0, .1);
        h3 {
          border-bottom: 1px solid #DEE4EA;
          margin: 0 0 15px 0;
          padding: 0 0 10px 0;
        }
        > div {
          display: inline-block;
          padding: 5px 10px;
          margin: 5px 15px 10px 0;
          border-radius: 15px;
          font-size: 18px;
          color: #ffffff;
        }
      }
      .type {
        background: #D6CD33;
      }
      .ability {
        background: #A52620;
      }
      .moves {
        background: #022964;
      }
    }
  }
</style>