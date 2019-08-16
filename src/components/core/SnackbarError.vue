<template>
  <!-- SNACKBAR DE ERRO GLOBAL -->
  <v-dialog
    width="300"
    persistent
    style="overflow: hidden"
    v-model="snackbar_error.mostrar"
  >
    <v-card class="pa-3" style="overflow: hidden; border-radius: 10px;" light width="300">
      <div class="meio">
        <v-flex xs12>
          <div style="display: flex; justify-content: center; width: 100%">
            <v-avatar style="position: relative" class="elevation-1 bounceInUp snack" color="red">
              <v-icon class=" " size="40" color="white">close</v-icon>
            </v-avatar>
          </div>
        </v-flex>
        <v-flex class="mt-3 mb-3" xs12>
          <h3 class="text-center">{{ snackbar_error.mensagem }}</h3>
        </v-flex>
        <v-flex xs12>
          <v-btn color="red" block class="white--text" @click="fecha_snackbar">
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
    snackbar_error() {
      return this.$store.getters.snackbar_error;
    },
  },
  methods: {
    fecha_snackbar() {
      this.$store.dispatch('desativa_snackbar');
    },
  },
};
</script>
