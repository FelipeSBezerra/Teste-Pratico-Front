<template>
  <v-app>
    <MenuBarComponent/>
    <v-main class="ma-10">
      <router-view></router-view>
    </v-main>
    <FooterComponent/>
  </v-app>
</template>

<script>
import FooterComponent from './components/FooterComponent.vue';
import MenuBarComponent from './components/MenuBarComponent.vue';


export default {
  name: 'App',

  components: {
    FooterComponent,
    MenuBarComponent
  },

  data: () => ({
    //
  }),
};
</script>
