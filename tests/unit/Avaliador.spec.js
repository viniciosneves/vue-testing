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

describe('Um Avaliador, que conseguiu conectar com a API', () => {
  test('mostra todos os leilões retornados pela API', async () => {
    getLeiloes.mockResolvedValueOnce(leiloes)
    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    await flushPromises()
    expect(getLeiloes).toHaveBeenCalled()
    const totalLeiloes = wrapper.findAll('.leilao').length
    expect(totalLeiloes).toBe(leiloes.length)
  })

  test('não há leilões abertos nesse momento', async () => {
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
