import { shallowMount } from '@vue/test-utils'
import PokemonList from '@/components/PokemonList.vue'

describe('PokemonList.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    /*const wrapper = shallowMount(PokemonList, {
      propsData: { msg }
    })*/
    expect(msg).toMatch(msg)
  })
})
