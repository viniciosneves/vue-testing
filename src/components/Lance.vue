<template>
  <form @submit.prevent="darLance()">
    <div class="form-row">
      <div class="col-6">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">$</span>
          </div>
          <input type="number" step="1" class="form-control" v-model="valor" :placeholder="`Lance mínimo: R$${lanceMinimo}`">
          <div class="input-group-append">
            <span class="input-group-text">.00</span>
          </div>
        </div>
      </div>
      <div class="col-6">
        <button class="btn btn-primary btn-block" type="submiy">Dar lance!</button>
      </div>
      <div class="col-12" v-if="lanceInvalido">
        <div class="alert alert-danger" role="alert">
          O valor mínimo para o lance é de <strong>R$ {{ lanceMinimo }}</strong>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    lanceMinimo: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      valor: null,
      lanceInvalido: false
    }
  },
  methods: {
    darLance () {
      if (this.valor < this.lanceMinimo) {
        this.lanceInvalido = true
      } else {
        this.$emit('novo-lance', this.valor)
        this.valor = null
        this.lanceInvalido = false
      }
    }
  }
}
</script>
