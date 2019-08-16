<template>
  <v-container fluid>
    <v-layout align-center justify-center xs12>
      <v-flex x12 md4>
        <v-card class="mt-3 mb-3 pa-3">
          <v-text-field
            label="Atualizar Senha"
            v-model="password"
            placeholder="Digite sua nova senha"
            type="password"
          >
          </v-text-field>
          <v-text-field
            label="Confirmar Senha"
            v-model="verifyPassword"
            placeholder="Confirme sua nova senha"
            type="password"
            :hint="passwordOk ? 'As senhas correspondem' : 'As senhas não correspondem'"
          >
          </v-text-field>
          <v-btn
            block
            :disabled="!passwordOk"
            @click="updatePassword"
            color="green"
          >
            <span class="white--text">Confirmar</span>
            <v-progress-circular indeterminate v-if="chargingSave" color="white" size="18" class="pl-1"></v-progress-circular>
          </v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      password: '',
      verifyPassword: '',
      passwordOk: false,
      chargingSave: false
    }
  },
  watch: {
    verifyPassword() {
      if(this.password === this.verifyPassword) {
        this.passwordOk = true
      } else {
        this.passwordOk = false
      }
    }
  },
  methods: {
    updatePassword() {
      this.chargingSave = true
      const data = {
        password: this.password
      }

      axios.post(`${this.$store.getters.api}/api/v1/user/password/update`, data,  { headers : {Authorization: `Bearer ${this.$store.getters.getUsuario.token}`}})
        .then(() => this.$store.dispatch('snackbar_success', "Senha alterada com sucesso"))
        .catch(() => this.$store.dispatch('snackbar_error', "Erro ao atualizar, tente novamente"))
      
      this.chargingSave = false
    }
  }
}
</script>
