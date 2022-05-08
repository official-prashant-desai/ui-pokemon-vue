import { createLocalVue, shallowMount } from '@vue/test-utils';
import pokemonHome from '@/views/PokemonHome.vue';
import pokemonList from '@/components/PokemonList.vue';
import store from "@/store";
import VueRouter from "vue-router";

describe("App.vue", () => {
  let wrapper;

  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const router = new VueRouter();

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.destroy();
  });

  describe("static components tests", () => {
    beforeEach(() => {
      wrapper = shallowMount(pokemonHome, { localVue, router, store });
    });
  
    it('renders pokemon list view', () => {
      expect(wrapper.find("[data-test='pokemonList']").exists()).toBeTruthy();
    });

    it("checks if the child component 'pokemonList' exists", () => {
      const pokemonListComponent = wrapper.findComponent(pokemonList);
      expect(pokemonListComponent.exists()).toBe(true);
    });
  });

  it("checks if loading message is displayed when 'isPokemonListLoading' state is true", () => {
    store.state.PokemonStore.isPokemonListLoading = true;
    wrapper = shallowMount(pokemonHome, { localVue, router, store });
    expect(wrapper.find("[data-test='pokemonLoading']").exists()).toBeTruthy();
  });

  it("checks if error message is displayed when 'isErrorInPokemonList' state is true", () => {
    store.state.PokemonStore.isErrorInPokemonList = true;
    wrapper = shallowMount(pokemonHome, { localVue, router, store });
    expect(wrapper.find("[data-test='pokemonError']").exists()).toBeTruthy();
  });

  it("checks that loading message should not be displayed when 'isPokemonListLoading' state is false", () => {
    store.state.PokemonStore.isPokemonListLoading = false;
    wrapper = shallowMount(pokemonHome, { localVue, router, store });
    expect(wrapper.find("[data-test='pokemonLoading']").exists()).toBeFalsy();
  });

  it("checks that error should not be displaed when 'isErrorInPokemonList' state is false", () => {
    store.state.PokemonStore.isErrorInPokemonList = false;
    wrapper = shallowMount(pokemonHome, { localVue, router, store });
    expect(wrapper.find("[data-test='pokemonError']").exists()).toBeFalsy();
  });
});
