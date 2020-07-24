import Leilao from '@/components/Leilao'
import { mount } from '@vue/test-utils'

const leilao = {
  produto: 'Livro da Casa do Código',
  lanceInicial: 50,
  descricao: 'Livro sobre VueJS'
}

describe('Leilao', () => {
  test('deveria exibir os dados do leilão no card', () => {
    const wrapper = mount(Leilao, {
      propsData: {
        leilao
      }
    })
    expect(wrapper.find('.card-header').element.textContent)
      .toContain(`Estamos leiloando um(a): ${leilao.produto}`)
    expect(wrapper.find('.card-title').element.textContent)
      .toContain(`Lance inicial: R$ ${leilao.lanceInicial}`)
    expect(wrapper.find('.card-text').element.textContent)
      .toContain(leilao.descricao)
  })
})
