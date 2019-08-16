<template>
  <!-- SNACK BAR DE INFO GLOBAL -->
  <v-dialog
    width="300"
    persistent
    style="overflow: hidden"
    v-model="snackbar_info.mostrar"
  >
    <v-card class="pa-3" style="overflow: hidden; border-radius: 10px;" light width="300">
      <div class="meio">
        <v-flex xs12>
          <div style="display: flex; justify-content: center; width: 100%">
            <v-avatar class="elevation-1 bounceInUp snack" color="blue">
              <v-icon class="fadeIn" size="30" color="white">info</v-icon>
            </v-avatar>
          </div>
        </v-flex>
        <v-flex class="mt-3 mb-3" xs12>
          <div class="linhaSemQuebra">
            <v-spacer></v-spacer>
            <h3 class="text-xs-center">{{ snackbar_info.mensagem }}</h3>
            <v-spacer></v-spacer>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-btn color="blue" block class="white--text" @click="fecha_snackbar">
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
    snackbar_info() {
      return this.$store.getters.snackbar_info;
    },
  },
  methods: {
    fecha_snackbar() {
      this.$store.dispatch('desativa_snackbar');
    },
  },
};
</script>
