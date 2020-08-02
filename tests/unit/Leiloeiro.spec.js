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

describe('Leiloeiro inicia um leilão que ainda não possui lances', () => {
  test('avisa quando não existem lances', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce([])
    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })
    await flushPromises()
    expect(wrapper.find('.alert-dark').exists()).toBe(true)
  })

  test('não exibe lances para um leilão novo', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce([])
    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })
    await flushPromises()
    expect(wrapper.find('.lances').exists()).toBe(false)
  })
})

describe('Um leiloeiro comunica os valores de menor e maior lance', () => {
  test("Não mostra o aviso de 'Sem lances'", async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)
    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })
    await flushPromises()
    expect(wrapper.find('.alert-dark').exists()).toBe(false)
  })
  test('Possui uma lista de lances sendo exibidos', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)
    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })
    await flushPromises()
    expect(wrapper.find('.lances').exists()).toBe(true)
  })
  test('Mostra o maior lance daquele leilão', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)
    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })
    await flushPromises()
    expect(wrapper.find('.maior-lance').element.textContent)
      .toContain('Maior lance: R$ 1099')
  })
  test('Mostra o menor lance daquele leilão', async () => {
    getLeilao.mockResolvedValueOnce(leilao)
    getLances.mockResolvedValueOnce(lances)
    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    })
    await flushPromises()
    expect(wrapper.find('.menor-lance').element.textContent)
      .toContain('Menor lance: R$ 1001')
  })
})

describe('Um leiloeiro cria novos lances', () => {
  test('aceita um lance', async () => {
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
})
