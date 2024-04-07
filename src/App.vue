<template>
  <v-app>
    <ToastComponent ref="toast" :snackbar="snackbar" :mensagem="mensagem" :timeout="timeout" :cor="cor"/>
    <MenuBarComponent/>
    <v-main class="ma-10">
      <router-view @mensagemToast="mensagemToast"></router-view>
    </v-main>
    <FooterComponent/>
  </v-app>
</template>

<script>
import FooterComponent from './components/FooterComponent.vue';
import MenuBarComponent from './components/MenuBarComponent.vue';
import ToastComponent from './components/ToastComponent.vue'


export default {
  name: 'App',

  components: {
    FooterComponent,
    MenuBarComponent,
    ToastComponent
  },

  data() {
    return {
        cor: 'success',
        snackbar: false,
        timeout: -1,
        mensagem: ''
    }
  },
  methods: {
    mensagemToast(mensagem, cor, time) {
        this.$refs.toast.showToast(mensagem, cor, time);
    }
    },
};
</script>
