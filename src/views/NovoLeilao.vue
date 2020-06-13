<template>
  <div class="container">
    <h4>Novo leilão</h4>
    <form @submit.prevent="criar">
      <div class="form-group">
        <label>Objeto do leilão</label>
        <input v-model="leilao.produto" type="text" class="form-control" required>
      </div>
      <div class="form-group">
        <label>Descrição</label>
        <textarea v-model="leilao.descricao" class="form-control" required></textarea>
      </div>
      <div class="form-group">
        <label>Lance inicial</label>
        <input v-model="leilao.lanceInicial" type="number" step="1" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-lg btn-block btn-outline-primary">Criar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      leilao: {}
    }
  },
  methods: {
    criar () {
      axios.post('http://localhost:3000/leiloes', this.leilao)
        .then(response => {
          this.$router.push('/')
        })
    }
  }
}
</script>
