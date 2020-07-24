import Avaliador from '@/views/Avaliador'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { getLeiloes } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const leiloes = [
  {
    produto: 'Livro da Casa do Código',
    lanceInicial: 50,
    descricao: 'Livro sobre VueJS'
  },
  {
    produto: 'Livro da Casa do Código',
    lanceInicial: 50,
    descricao: 'Livro sobre Teste Unitário'
  }
]

describe('Avaliador', () => {
  test('deveria listar dois leilões retornados pela api', async () => {
    getLeiloes.mockResolvedValueOnce(leiloes)
    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    await flushPromises()
    expect(getLeiloes).toHaveBeenCalled()
    const totalLeiloes = wrapper.findAll('.leilao').length
    expect(totalLeiloes).toBe(2)
  })
  test('não deveria listar leilões, caso o retorno seja um array vazio', async () => {
    getLeiloes.mockResolvedValueOnce([])
    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    await flushPromises()
    expect(getLeiloes).toHaveBeenCalled()
    const totalLeiloes = wrapper.findAll('.leilao').length
    expect(totalLeiloes).toBe(0)
  })
})
