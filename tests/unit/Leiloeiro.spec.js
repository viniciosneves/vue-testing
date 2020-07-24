import Leiloeiro from '@/views/Leiloeiro'
import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'

import { getLeilao, getLances, createLance } from '@/http'

jest.mock('@/http')

const leilao = {
  produto: 'Livro da Casa do Código',
  lanceInicial: 50,
  descricao: 'Livro sobre VueJS'
}
const lances = [
  {
    id: 1,
    valor: 1001,
    data: '2020-06-13T18:04:26.826Z',
    leilao_id: 1
  },
  {
    valor: 1005,
    data: '2020-06-13T18:04:26.826Z',
    leilao_id: 1,
    id: 2
  },
  {
    valor: 1099,
    data: '2020-06-13T18:19:44.871Z',
    leilao_id: 1,
    id: 3
  }
]

describe('Leiloeiro', () => {
  test('não deveria exibir lances e deveria avisar que eles não existem', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce([])
    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })
    await flushPromises()
    expect(wrapper.find('.alert-dark').exists()).toBe(true)
    expect(wrapper.find('.lances').exists()).toBe(false)
  })
  test('deveria criar novo lance', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce([])
    createLance.mockResolvedValueOnce(1)
    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })
    await flushPromises()
    wrapper.find({ ref: 'novoLance' }).vm.$emit('novo-lance', 900)
    await wrapper.vm.$nextTick()
    await flushPromises()
    expect(createLance).toHaveBeenCalled()
  })
  test('deveria exibir menor e maior lance', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)
    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })
    await flushPromises()
    expect(wrapper.find('.alert-dark').exists()).toBe(false)
    expect(wrapper.find('.lances').exists()).toBe(true)

    expect(wrapper.find('.menor-lance').element.textContent)
      .toContain('Menor lance: R$ 1001')
    expect(wrapper.find('.maior-lance').element.textContent)
      .toContain('Maior lance: R$ 1099')
  })
})
