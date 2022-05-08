import { createLocalVue, shallowMount } from '@vue/test-utils';
import pokemonDetails from '@/views/PokemonDetails.vue';
import store from "@/store";
import VueRouter from "vue-router";
import { pokemonDataObj } from "@./../../tests/mockData/pokemonList.js";

describe("PokemonDetails.vue", () => {
  let wrapper;

  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const router = new VueRouter();

  afterEach(() => {
    jest.clearAllMocks();
  });
  window.scrollTo = jest.fn();  
  beforeEach(() => {
    store.state.PokemonStore.selectedPokemonId = 1;
    store.state.PokemonStore.pokemonList = [{ ...pokemonDataObj }];
    wrapper = shallowMount(pokemonDetails, {
      localVue,
      router,
      store
    });
  });

  it('renders pokemon details view', () => {
    expect(wrapper.find("[data-test='detailsWrapper']").exists()).toBeTruthy();
  });

  it('on click of go back navigate to pokemon list page', async () => {
    wrapper.vm.$router.push = jest.fn();
    await wrapper.find("[data-test='goBackBtn']").trigger("click");
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: "PokemonList" });
  });
});
