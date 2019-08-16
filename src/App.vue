<template>
  <v-app app>
    <VueLoad />
    <SnackbarSuccess />
    <SnackbarError />
    <SnackbarWarning />
    <SnackbarInfo />
    <router-view></router-view>
  </v-app>
</template>

<script>
import SnackbarSuccess from "./components/core/SnackbarSucess.vue";
import SnackbarError from "./components/core/SnackbarError.vue";
import SnackbarWarning from "./components/core/SnackbarWarning.vue";
import SnackbarInfo from "./components/core/SnackbarInfo.vue";
import VueLoad from './components/core/VueLoad'

export default {
  name: "App",
  components: {
    SnackbarSuccess,
    SnackbarError,
    VueLoad,
    SnackbarWarning,
    SnackbarInfo
  }
}
</script>

<style>
.meio {
  display: flex;
  width: 100%;
  flex-direction: column;
}
.snack {
  animation-duration: 600ms;
}
.expandeDiv {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
.linhaSemQuebra {
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
  align-items: center;
  height: 50px;
}
</style>
