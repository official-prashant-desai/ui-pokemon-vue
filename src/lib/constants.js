export const constants = {
  pokemonURL: "https://pokeapi.co/api/v2/pokemon/",
  // just add more numbers to below list for more showing records options and you are done -- easy
  recordList: [10, 20, 50],
  sortByList: [ "name", "height", "weight" ],
  metaData: {
    heading: "Welcome to Pokemon's world",
    footer: "This is dummy copyright text - It's fun learning vuejs",
    name: "Name",
    height: "Height",
    heightUnit: "M",
    weight: "Weight",
    weightUnit: "Kg",
    abilities: "Abilities",
    search: "Search by Name or Ability",
    sortby: "Sort by",
    show: "Display",
    cards: "Cards",
    prev: "Prev",
    next: "Next",
    showing: "Showing",
    to: "to",
    of: "of",
    records: "records",
    detailsPage: {
      goBack: "Go back",
      name: "Pokemon Name",
      id: "Pokemon Id#",
      order: "Pokemon Order",
      baseExperience: "Base Experience",
      unitBE: "XP",
      types: "Pokemon Types",
      abilities: "Pokemon Abilities",
      moves: "Pokemon Moves"
    }
  },
  errorInFetchingPokemonList: "There is error occured while fetching Pokemon List. Please try after some time",
  pokemonListLoadingMsg: "Pokemon's List is Loading...",
  noPokemonFound: "The pokemon was not found"
};