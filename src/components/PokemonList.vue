<template>
  <div class="pokemon-list">
    <div class="search-filter-panel">
      <div class="top-left-wrapper">
        <span>{{ constants.metaData.sortby }}</span>
        <select class="filter-field capitalize" v-model="sortBy">
          <option v-for="(item, index) in sortByList" :key="'sortBy'+index" :value=item>
            {{ item }}
          </option>
        </select>
        <input class="search-field" type="text" v-model="pokemonSearchQuery" :placeholder=constants.metaData.search />
      </div>
      <div class="top-right-wrapper">
        <span class="pagination-wrapper">
          <button name="prev" class="nextPrevbutton" :disabled="prevUrl === null" @click="paginationFetchPokemonList">
            <i class="fas fa-angle-left"></i>
            {{ constants.metaData.prev }}
          </button>
          <button name="next" class="nextPrevbutton" :disabled="nextUrl === null" @click="paginationFetchPokemonList">
            {{ constants.metaData.next }}
            <i class="fas fa-angle-right"></i>
          </button>
        </span>
        <span class="records-count">
          <span>{{ constants.metaData.showing }}</span>
            {{ pokemonOffset + 1 }}
          <span>{{ constants.metaData.to }}</span>
            {{ pokemonOffset + pokemonLimit }}
          <span>{{ constants.metaData.of }}</span>
            {{ totalRecordCount }}
          <span>{{ constants.metaData.records }}</span>
        </span>
        <span class="showing-records">
          <span>{{ constants.metaData.show }}</span>
            <select class="record-field" v-model="recordBy" @change="recordByFetchPokemonList">
              <option v-for="(item, index) in recordList" :key="'recordBy'+index" :value=item>
                {{ item }}
              </option>
            </select>
          <span>{{ constants.metaData.cards }}</span>
        </span>
      </div>
    </div> 
    <div class="list">
      <article v-for="(pokemon, index) in filteredPokemonList"
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
    <div class="search-filter-panel">
      <div class="top-right-wrapper width-100">
        <span class="pagination-wrapper">
          <button name="prev" class="nextPrevbutton" :disabled="prevUrl === null" @click="paginationFetchPokemonList">
            <i class="fas fa-angle-left"></i>
            {{ constants.metaData.prev }}
          </button>
          <button name="next" class="nextPrevbutton" :disabled="nextUrl === null" @click="paginationFetchPokemonList">
            {{ constants.metaData.next }}
            <i class="fas fa-angle-right"></i>
          </button>
        </span>
        <span class="records-count">
          <span>{{ constants.metaData.showing }}</span>
            {{ pokemonOffset + 1 }}
          <span>{{ constants.metaData.to }}</span>
            {{ pokemonOffset + pokemonLimit }}
          <span>{{ constants.metaData.of }}</span>
            {{ totalRecordCount }}
          <span>{{ constants.metaData.records }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState, mapMutations } from "vuex";
  import { constants } from "../lib/constants";
  export default {
    data: () => {
      return {
        constants,
        recordList: constants.recordList,
        sortByList: constants.sortByList,
        pokemonSearchQuery: null,
        sortBy: "name",
        recordBy: 20,
        previousBtnDisabled: true,
        nextBtnDisabled: null
      }
    },
    computed: {
      filteredPokemonList() {
        let filterPokemonList = this.pokemonList;

        // search pokemon by name or abilities
        if (this.pokemonSearchQuery) {
          filterPokemonList = filterPokemonList.filter((pokemon) => {
            let abilities = pokemon.abilities.filter((ability) => {
              return ability.ability.name.toLowerCase().includes(this.pokemonSearchQuery.toLowerCase());
            })
            return pokemon.name.toLowerCase().includes(this.pokemonSearchQuery.toLowerCase()) ||
                  abilities.length > 0;
          });
        }

        // filter pokemon by name, height and weight
        filterPokemonList = filterPokemonList.sort((currentItem, nextItem) => {
          if (this.sortBy === 'name') {
            // sort by name
            let currentItemName = currentItem.name.toLowerCase(),
                nextItemName = nextItem.name.toLowerCase();
            if (currentItemName < nextItemName) {
              return -1;
            }
            if (currentItemName > nextItemName) {
              return 1;
            }
            return 0;
          } else if (this.sortBy === 'height') {
            // sort by height
            return currentItem.height - nextItem.height;
          } else if (this.sortBy === "weight") {
            // sort by weight
            return currentItem.weight - nextItem.weight;
          }
        });

        return filterPokemonList;
      },
      ...mapState("PokemonStore", [
        "pokemonList",
        "pokemonLimit",
        "pokemonOffset",
        "nextUrl",
        "prevUrl",
        "totalRecordCount",
      ])
    },
    methods: {
      navigateToDetails(id) {
        this.setSelectedPokemonId(id);
        this.$router.push({ name: "PokemonDetails" });
      },
      recordByFetchPokemonList(event) {
        this.setPokemonLimit(parseInt(event.target.value));
        const params = { limit: this.pokemonLimit, offset: this.pokemonOffset };
        this.fetchPokemonList(params);
      },
      paginationFetchPokemonList(event) {
        const url = event.target.name === "prev" ? this.prevUrl : this.nextUrl;
        // TODO: modify this logic to be more robust
        const paramExtracted = url.split("?")[1].split("&");
        this.setPokemonOffset(parseInt(paramExtracted[0].split("=")[1]));
        const params = { limit: this.pokemonLimit, offset: this.pokemonOffset };
        this.fetchPokemonList(params);
      },
      ...mapActions("PokemonStore", ["fetchPokemonList"]),
      ...mapMutations("PokemonStore", [
        "setSelectedPokemonId",
        "setPokemonLimit",
        "setPokemonOffset",
      ])
    },
    created() {
      const params = { limit: this.pokemonLimit, offset: this.pokemonOffset };
      this.fetchPokemonList(params);
    }
  }
</script>

<style lang="scss" scoped>
  .pokemon-list {
    .search-filter-panel {
      padding: 20px 0;
      display: flex;
      flex-direction: row;
      .top-left-wrapper {
        width: 40%;
        > span {
          padding-right: 2%;
        }
        .filter-field {
          padding: 10px 15px;
          border: 1px solid #D1D1D1;
          font-size: 17px;
          border-radius: 7px;
          font-family: 'Acme', arial;
          width: 23%;
          box-shadow: 0 5px 10px rgba(0,0,0,.2),
                    0 5px 10px rgba(0,0,0,.2);
        }
        .search-field {
          padding: 10px 15px;
          border: 1px solid #D1D1D1;
          font-size: 17px;
          border-radius: 7px;
          font-family: 'Acme', arial;
          width: 50%;
          margin-left: 2%;
          box-shadow: 0 5px 10px rgba(0,0,0,.2),
                      0 5px 10px rgba(0,0,0,.2);
        }
      }
      .top-right-wrapper {
        width: 60%;
        .showing-records {
          float: right;
          padding-right: 20px;
          border-right: 1px solid #D1D1D1;
          > span {
            padding: 10px;
          }
          .record-field {
            padding: 10px 15px;
            border: 1px solid #D1D1D1;
            font-size: 17px;
            border-radius: 7px;
            font-family: 'Acme', arial;
            box-shadow: 0 5px 10px rgba(0,0,0,.2),
                    0 5px 10px rgba(0,0,0,.2);
          }
        }
        .pagination-wrapper {
          float: right;
          padding-left: 20px;
          .nextPrevbutton {
            border-radius: 7px;
            border: 1px solid #0D1E63;
            font-size: 17px;
            font-family: 'Acme', arial;
            margin: 0 0 0 20px;
            padding: 10px 15px;
            color: #ffffff;
            cursor: pointer;
            background: #122885;
            box-shadow: 0 5px 10px rgba(0,0,0,.2),
                      0 5px 10px rgba(0,0,0,.2);
            &:disabled {
              border: 1px solid #D1D1D1;
              background: #f1f1f1;
              color: #BCB4BE;
              cursor: not-allowed;
            }
            i {
              margin: 5px;
            }
          }
        }
        .records-count {
          float: right;
          padding: 15px 0 15px 30px;
          font-weight: bold;
          > span {
            font-weight: normal;
            margin: 0 3px;
          }
        }
      }
      .width-100 {
        width: 100%;
      }
    }
    .list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
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
  }
</style>
