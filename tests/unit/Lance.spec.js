import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'

describe('Lance', () => {
  test('deveria dar o primeiro lance maior do que 0', () => {
    const wrapper = mount(Lance)
    const input = wrapper.find('input')
    input.setValue(100)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    expect(lancesEmitidos).toHaveLength(1)
    const lance = parseInt(wrapper.emitted('novo-lance')[0][0])
    expect(lance).toBe(100)
  })

  test('deveria dar lance menor do que o lance mínimo esperado', async () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    })
    const input = wrapper.find('input')
    input.setValue(400)
    wrapper.trigger('submit')
    await wrapper.vm.$nextTick()
    const lancesEmitidos = wrapper.emitted('novo-lance')
    expect(lancesEmitidos).toHaveLength(1)
    const lance = parseInt(wrapper.emitted('novo-lance')[0][0])
    expect(lance).toBe(400)
  })
  test('não deveria dar lance menor do que o lance mínimo esperado', async () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    })
    const input = wrapper.find('input')
    input.setValue(100)
    wrapper.trigger('submit')
    await wrapper.vm.$nextTick()
    const lancesEmitidos = wrapper.emitted('novo-lance')
    expect(lancesEmitidos).toBeUndefined()
    const msgErro = wrapper.find('p.alert').element.textContent
    expect(msgErro).toContain('O valor mínimo para o lance é de R$ 300')
  })
})
