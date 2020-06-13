<template>
  <div class="container">
    <h1>Leiloeiro</h1>
    <div class="row">
      <div class="col-8">
        <Leilao :leilao="leilao" />
        <Lance :lanceMinimo="valorMinimoDoLance" v-on:novo-lance="onNovoLance"/>
        <div class="row mb-4" v-if="existemLances">
          <div class="col-6">
            <div class="shadow p-3 bg-white rounded">Menor lance: <strong>R$ {{ menorLance }}</strong></div>
          </div>
          <div class="col-6">
            <div class="shadow p-3 bg-white rounded">Maior lance: <strong>R$ {{ maiorLance }}</strong></div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <h4>Histórico</h4>
        <div class="alert alert-dark" role="alert" v-if="!existemLances">
          Ainda não existem lances para esse leilão!
        </div>
        <div class="shadow p-3 mb-5 bg-white rounded" v-for="lance in lances" :key="lance.id">
          <ul class="list-inline m-0">
            <li class="list-inline-item">Data: <strong>{{ lance.data.toLocaleString() }}</strong></li>
            <li class="list-inline-item">Valor: <strong>R$ {{ lance.valor }}</strong></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Leilao from '@/components/Leilao'
import Lance from '@/components/Lance'
import axios from 'axios'

export default {
  props: ['id'],
  components: {
    Leilao,
    Lance
  },
  computed: {
    existemLances () {
      return this.lances.length > 0
    },
    maiorLance () {
      return Math.max(...this.lances.map(l => l.valor)) || 0
    },
    menorLance () {
      return Math.min(...this.lances.map(l => l.valor)) || 0
    },
    valorMinimoDoLance () {
      if (!this.existemLances) {
        return this.leilao.lanceInicial || 0
      }
      return this.maiorLance
    }
  },
  data () {
    return {
      leilao: {},
      lances: []
    }
  },
  methods: {
    carregarLeilao () {
      axios.get(`http://localhost:3000/leiloes/${this.id}`)
        .then(response => {
          this.leilao = response.data
        })
    },
    carregarLances () {
      axios.get('http://localhost:3000/lances/', { params: { leilao_id: this.id } })
        .then(response => {
          this.lances = response.data.map(
            l => {
              l.data = new Date(l.data)
              return l
            }
          )
        })
    },
    onNovoLance (valor) {
      const lance = {
        valor: parseInt(valor),
        data: new Date(),
        leilao_id: parseInt(this.id)
      }
      axios.post('http://localhost:3000/lances', lance)
        .then(response => {
          lance.id = response.data.id
          this.lances.push(lance)
        })
    }
  },
  mounted () {
    this.carregarLeilao()
    this.carregarLances()
  }
}
</script>
