<template>
  <div class="main">
    <v-flex text-xs-center>
      <v-img src="../../assets/logo.jpg"  class="mx-auto mb-12" max-width="400px"></v-img>
      <h1>Felipe S. Bezerra</h1>
      <h4>Teste Desenvolvedor Java Jr</h4>
    </v-flex>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
}
</script>

<style scoped>
h1, h4 {
  text-align: center;
}
.main {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>