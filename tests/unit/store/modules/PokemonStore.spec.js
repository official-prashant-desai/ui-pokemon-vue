import pokemonStore from "@/store/modules/PokemonStore";
import service from "@/service/httpService";
import { pokemonListRaw, pokemonDataObj } from "@./../../tests/mockData/pokemonList.js";

describe("pokemon Store", () => {
  let state;
  const commit = jest.fn();
  const dispatch = jest.fn();
  beforeEach(() => {
    state = { ...pokemonStore.state };
    jest.clearAllMocks();
  });
  describe("verify default values of state", () => {
    test.each`
      stateName                 | expected    
      ${"pokemonListRaw"}       | ${[]} 
      ${"pokemonList"}          | ${[]}
      ${"pokemonLimit"}         | ${20}
      ${"pokemonOffset"}        | ${0}
      ${"isPokemonListLoading"} | ${false}
      ${"isErrorInPokemonList"} | ${false}
      ${"selectedPokemonId"}    | ${0}
      ${"nextUrl"}              | ${null}
      ${"prevUrl"}              | ${null}
      ${"totalRecordCount"}     | ${0}
    `(
      "verify that $stateName state has default value $expected",
      ({ stateName, expected }) => {
        expect(pokemonStore.state[stateName]).toStrictEqual(expected);
      }
    );
  });

  describe("verify getters", () => {
    it("getPokemonDetailsById - if selectedId is found in pokemonList", () => {
      state.pokemonList = [
        {
          id: 1,
          name: "bulbasaur"
        },
        {
          id: 2,
          name: "abra"
        }
      ];
      state.selectedPokemonId = 2;
      const expected = state.pokemonList[1];
      expect(pokemonStore.getters.getPokemonDetailsById(state)).toStrictEqual(expected);
    });
    it("getPokemonDetailsById - if selectedId is not found in pokemonList than return undefined", () => {
      state.pokemonList = [
        {
          id: 1,
          name: "bulbasaur"
        }
      ];
      state.selectedPokemonId = 2;
      expect(pokemonStore.getters.getPokemonDetailsById(state)).toStrictEqual(undefined);
    });
  });

  describe("verify mutations", () => {
    test.each`
      mutationName                 | inputParam                           | stateName
      ${"setPokemonListRaw"}       | ${[{ name: "abc", url: "abc.com" }]} | ${"pokemonListRaw"}
      ${"setPokemonList"}          | ${[{ name: "bulbasaur", id: 1 }]}    | ${"pokemonList"}
      ${"setIsErrorInPokemonList"} | ${true}                              | ${"isErrorInPokemonList"}
      ${"setIsPokemonListLoading"} | ${false}                             | ${"isPokemonListLoading"}
      ${"setSelectedPokemonId"}    | ${20}                                | ${"selectedPokemonId"}
      ${"setPokemonLimit"}         | ${10}                                | ${"pokemonLimit"}
      ${"setPokemonOffset"}        | ${50}                                | ${"pokemonOffset"}
      ${"setPrevUrl"}              | ${"https://pokemon-prev.com"}        | ${"prevUrl"}
      ${"setNextUrl"}              | ${"https://pokemon-next.com"}        | ${"nextUrl"}
      ${"setTotalRecordCount"}     | ${1200}                              | ${"totalRecordCount"}
    `(
      "verify that by calling $mutationName mutation with $inputParam than $stateName sets as $inputParam",
      ({ mutationName, inputParam, stateName }) => {
        pokemonStore.mutations[mutationName](pokemonStore.state, inputParam);
        expect(pokemonStore.state[stateName]).toStrictEqual(inputParam);
      }
    );
  });

  describe("verify actions", () => {
    describe("fetchPokemonList", () => {
      const params = { limit: 10, offset: 10 };
      it("fetchPokemonList - API call success", async () => {
        service.fetchPokemonList = jest.fn().mockReturnValue(Promise.resolve({ data: pokemonListRaw }));
        await pokemonStore.actions.fetchPokemonList({ commit, dispatch }, params);
        expect(service.fetchPokemonList).toHaveBeenCalledWith(params);
        expect(commit).toHaveBeenCalledTimes(6);
        expect(commit).toHaveBeenNthCalledWith(1, "setIsPokemonListLoading", true);
        expect(commit).toHaveBeenNthCalledWith(2, "setPokemonListRaw", pokemonListRaw.results);
        expect(commit).toHaveBeenNthCalledWith(3, "setIsErrorInPokemonList", false);
        expect(commit).toHaveBeenNthCalledWith(4, "setPrevUrl",  pokemonListRaw.previous);
        expect(commit).toHaveBeenNthCalledWith(5, "setNextUrl",  pokemonListRaw.next);
        expect(commit).toHaveBeenNthCalledWith(6, "setTotalRecordCount",  pokemonListRaw.count);
        expect(dispatch).toHaveBeenCalledWith("fetchPokemonDetails");
      });
      it("fetchPokemonList - API fails", async () => {
        service.fetchPokemonList = jest.fn().mockReturnValue(Promise.reject({ status: 500 }));
        try {
          await pokemonStore.actions.fetchPokemonList({ commit, dispatch }, params);
          // if it comes here, it means something is wrong and test should fail.
          expect(true).toEqual(false);
        } catch(error) {
          expect(commit).toHaveBeenCalledTimes(2);
          expect(commit).toHaveBeenNthCalledWith(1, "setIsPokemonListLoading", true);
          expect(commit).toHaveBeenNthCalledWith(2, "setIsErrorInPokemonList", true);
        }
      });
    });

    describe("fetchPokemonDetails", () => {
      it("fetchPokemonDetails - verify each loop", async () => {
        service.fetchPokemonDetails = jest.fn().mockReturnValue(Promise.resolve({ data: pokemonDataObj }));
        state.pokemonListRaw = pokemonListRaw.results;
        await pokemonStore.actions.fetchPokemonDetails({ state, commit });
        expect(service.fetchPokemonDetails).toHaveBeenCalledTimes(10);
      });
      it("fetchPokemonDetails - API call success", async () => {
        service.fetchPokemonDetails = jest.fn().mockReturnValue(Promise.resolve({ data: pokemonDataObj }));
        state.pokemonListRaw = [{ ...pokemonListRaw.results[0] }];
        await pokemonStore.actions.fetchPokemonDetails({ state, commit }, pokemonListRaw.results[0].url);
        expect(service.fetchPokemonDetails).toHaveBeenCalledTimes(1);
        expect(commit).toHaveBeenCalledTimes(2);
        expect(commit).toHaveBeenNthCalledWith(2, "setIsPokemonListLoading", false);
      });
      it("fetchPokemonDetails - API fails", async () => {
        service.fetchPokemonDetails = jest.fn().mockReturnValue(Promise.reject({ status: 500 }));
        state.pokemonListRaw.push(pokemonListRaw.results[0]);
        try {
          await pokemonStore.actions.fetchPokemonDetails({ state, commit }, pokemonListRaw.results[0].url);
          // if it comes here, it means something is wrong and test should fail.
          expect(true).toEqual(false);
        } catch(error) {
          expect(commit).toHaveBeenCalledWith("setIsErrorInPokemonList", true);
        }
      });
    });
  });
});
