import { createLocalVue, shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import store from "@/store";
import VueRouter from "vue-router";
import { constants } from "@/lib/CONSTANTS";

describe("App.vue", () => {
  let wrapper;

  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const router = new VueRouter();

  beforeEach(() => {
    wrapper = shallowMount(App, {
      localVue,
      router,
      store
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.destroy();
  });

  it('renders pokemon app', () => {
    expect(wrapper.find("[data-test='pokemonApp']").exists()).toBeTruthy();
  });
  it('renders pokemon header text', () => {
    expect(wrapper.find("[data-test='header']").text()).toBe(constants.metaData.heading);
  });
  it('renders pokemon footer text', () => {
    expect(wrapper.find("[data-test='footer']").text()).toBe(constants.metaData.footer);
  });
});
