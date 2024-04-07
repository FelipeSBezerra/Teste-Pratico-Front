<template>
  <v-snackbar
    v-model="localSnackbar"
    :color="localCor"
    :timeout="localTimeout"
    absolute
    top
    right
    persistent
    class="snack-container">
    <div class="snack-conteudo">
      <span>{{ localMensagem }}</span>
      <v-btn color="white" text @click="localSnackbar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
  </v-snackbar>
</template>
<style>
  .snack-container {
    z-index: 9999; 
    position: fixed; 
    margin-top: 2.3rem; 
    margin-right: 1rem;
    padding-left: 1rem;
  }
  
  .snack-conteudo {
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    width: 100%;
  }
  </style>
  
  <script>
  export default {
    name: 'ToastComponent',
    props: ['snackbar', 'mensagem', 'timeout', 'cor'],

    data() {
    return {
        localSnackbar: this.snackbar,
        localMensagem: this.mensagem,
        localTimeout: this.timeout,
        localCor: this.cor,
        };
    },

    watch: {
    snackbar(novoValor) {
      this.localSnackbar = novoValor;
    },
    message(novoValor) {
      this.localMensagem = novoValor;
    },
    timeout(novoValor) {
      this.localTimeout = novoValor;
    },
    color(novoValor) {
      this.localCor = novoValor;
    },
  },

    methods: {
      showToast(mensagem, cor = 'success', timeout = 2000) {
        this.localMensagem = mensagem;
        this.localCor = cor;
        this.localSnackbar = true;
        this.localTimeout = timeout;
      },
    },
  };
  </script>