<template>
  <v-app>
    <Drawer />
    <v-content>
      <router-view></router-view>
      <v-container v-if="$route.name === 'home'" fluid>
        <EnviarDiligencia/>
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Drawer from '../components/core/Drawer.vue';
import Footer from '../components/core/Footer.vue';
import EnviarDiligencia from '../components/diligencias/Enviar'

export default {
  data() {
    return {

    };
  },
  components: {
    Drawer,
    Footer,
    EnviarDiligencia
  },
};
</script>

<style>
  .v-sheet--offset {
    top: -24px;
    height: 180px;
    position: relative;
  }
  
  .v-minisheet--offset {
    top: -4px;
    position: relative;
  }

  .cards {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
  }
</style>