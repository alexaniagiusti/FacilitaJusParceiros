<template>
  <!-- SNACK BAR DE WARNING GLOBAL -->
  <v-dialog
    width="300"
    persistent
    style="overflow: hidden"
    v-model="snackbar_warning.mostrar"
  >
    <v-card class="pa-3" style="overflow: hidden; border-radius: 10px;" light width="300">
      <div class="meio">
        <v-flex xs12>
          <div style="display: flex; justify-content: center; width: 100%">
            <v-avatar class="elevation-1 bounceInUp snack" color="yellow darken-3">
              <v-icon class="fadeIn" size="30" color="white">warning</v-icon>
            </v-avatar>
          </div>
        </v-flex>
        <v-flex class="mt-3 mb-3" xs12>
          <div class="linhaSemQuebra">
            <v-spacer></v-spacer>
            <h3 class="text-xs-center">{{ snackbar_warning.mensagem }}</h3>
            <v-spacer></v-spacer>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-btn color="yellow darken-3" block class="white--text" @click="fecha_snackbar">
            ok
          </v-btn>
        </v-flex>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  computed: {
    snackbar_warning() {
      return this.$store.getters.snackbar_warning;
    },
  },
  methods: {
    fecha_snackbar() {
      this.$store.dispatch('desativa_snackbar');
    },
  },
};
</script>
