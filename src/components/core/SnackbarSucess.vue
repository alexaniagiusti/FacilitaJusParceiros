<template>
  <!-- SNACK BAR DE SUCESSO GLOBAL -->
  <v-dialog
    width="300"
    persistent
    style="overflow: hidden"
    v-model="snackbar_success.mostrar"
  >
    <v-card class="pa-3" style="overflow: hidden; border-radius: 10px;" light width="300">
      <div class="meio">
        <v-flex xs12>
          <div style="display: flex; justify-content: center; width: 100%">
            <v-avatar class="elevation-1 bounceInUp snack" color="green">
              <v-icon class="fadeIn" size="40" color="white">check</v-icon>
            </v-avatar>
          </div>
        </v-flex>
        <v-flex class="mt-3 mb-3" xs12>
          <div class="linhaSemQuebra">
            <v-spacer></v-spacer>
            <h3 class="text-xs-center">{{ snackbar_success.mensagem }}</h3>
            <v-spacer></v-spacer>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-btn color="green" block class="white--text" @click="fecha_snackbar">
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
    snackbar_success() {
      return this.$store.getters.snackbar_success;
    },
  },
  methods: {
    fecha_snackbar() {
      this.$store.dispatch('desativa_snackbar');
    },
  },
};
</script>
