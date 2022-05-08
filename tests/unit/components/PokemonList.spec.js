import { createLocalVue, shallowMount } from '@vue/test-utils';
import pokemonList from '@/components/PokemonList.vue';
import store from "@/store";
import VueRouter from "vue-router";
import { pokemonDataObj } from "@./../../tests/mockData/pokemonList.js";

describe("PokemonList.vue", () => {
  let wrapper;

  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const router = new VueRouter();

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    store.state.PokemonStore.pokemonList = [{ ...pokemonDataObj }];
    wrapper = shallowMount(pokemonList, {
      localVue,
      router,
      store
    });
  });

  it('renders pokemon list view', () => {
    expect(wrapper.find("[data-test='pokemonList']").exists()).toBeTruthy();
  });

  //TODO: write test cases for all methods and computed in future.
});
