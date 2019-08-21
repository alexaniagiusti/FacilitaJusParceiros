<template>
  <v-container fluid>
    <div class="linhaSemQuebra">
      <v-toolbar class="toolbarForm">
        <span class="font-weight-light title">
          Envie sua dúvida jurídica:
        </span>
      </v-toolbar>
    </div>
    <v-card class="pa-3">
      <v-form ref="formCase">
        <v-layout row>
          <v-flex xs12 md4 pa-2>
            <v-text-field
            :rules="nameRules"
            autocomplete="new-name"
            label="Nome:"
            v-model="dataLegalCase.name"
            placeholder="Qual o seu nome?"
            >
            </v-text-field>
          </v-flex>
    
          <v-flex xs12 md3 pa-2>
            <v-text-field
            :rules="telefoneRules"
            label="Celular:"
            v-model="dataLegalCase.phone"
            placeholder="Qual o seu celular?"
            v-mask="masktelefone"
            >

          </v-text-field>
        </v-flex>
          <v-flex xs12 md3 pa-2>
            <v-text-field
            :rules="emailRules"
            autocomplete="new-email"
            label="E-mail:"
            v-model="dataLegalCase.email"
            :disabled="disableEmail"
            placeholder="Qual o seu e-mail?"
            >
            </v-text-field>
          </v-flex>
          <v-flex xs12 md2>
            <v-checkbox v-model="semEmail" label="Não tenho E-mail" ></v-checkbox>
          </v-flex>
        </v-layout>

        <v-layout row>

          <v-flex xs12 md4 pa-2>
            <v-autocomplete
            :rules="duvidaRules"
            autocomplete="new-duvida"
            return-object
            label="Tipo de dúvida:"
            :items="actuations"
            v-model="actuationsSelected"
            item-value="id"
            item-text="actuation"
            hide-no-data
            placeholder="Qual a sua dúvida?"
            />

          </v-flex>
          <v-flex xs12 md4 pa-2>
          <v-autocomplete
                autocomplete="new-city"
                :rules="cityRules"
                v-model="citySelected"
                :items="cities"
                hide-no-data
                return-object
                label="Cidade"
                placeholder="Cidade"
                item-text="city"
                item-value="id"
              >
                <template v-slot:selection="data">
                    {{ data.item.city }} - {{ data.item.state }}
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content v-text="data.item.city"></v-list-item-content>
                  </template>
                  <template v-else>
                    <v-list-item-avatar class="elevation-1">
                      <v-icon>place</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-html="data.item.city"></v-list-item-title>
                      <v-list-item-subtitle v-html="data.item.state"></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
          </v-flex>
          <v-flex xs12 md4 pa-2>
            <v-select
              :rules="partnersRules"
              :items="partners"
              hide-no-data
              return-object
              item-text="name"
              v-model="partnersSelected"
              label="Como nos conheceu?"
            ></v-select>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 md12 pa-2>
            <v-textarea
              :rules="mensagemRules"
              v-model="dataLegalCase.message"
              label="Explique melhor a sua dúvida:"
            >

            </v-textarea>
          </v-flex>


          <v-flex xs12 md12 pa-2>
            <v-btn
              block
              color="green"
              @click="sendCase"
            >
              <span class="font-weight-bold white--text">Enviar</span>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import DisableAutocomplete from 'vue-disable-autocomplete';
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/pt-br'
import { mask } from 'vue-the-mask'

export default {
  directives: {
    mask
  },
  data() {
    return {
      dataLegalCase: {
          name: '',
          phone: '',
          email: '',
          message: '',
      },
      
      semEmail: false,
      disableEmail: false,
      cities: [],
      masktelefone: '(##) # #### ####',
      citySelected: '',
      actuations: [],
      actuationsSelected: '',
      partners: [],
      partnersSelected: '',
        nameRules: [
        v => !!v || 'Informe o seu nome por favor' ],
        telefoneRules: [
        v => !!v || 'Informe o seu telefone por favor' ],
        emailRules: [
        v => !!v || 'Informe o seu E-mail por favor' ],
        duvidaRules: [
        v => !!v || 'Selecione uma dúvida' ],
        partnersRules: [
        v => !!v || 'Selecione um parceiro' ],
        mensagemRules: [
        v => !!v || 'É necessário escrever uma mensagem' ],
        cityRules: [
        v => !!v || 'Selecione uma cidade' ],
    }
  },
  watch: {
    semEmail() {
      if(this.semEmail) {
        this.dataLegalCase.email = "diligencias@facilitajus.com"
        this.disableEmail = true
      } else {
        this.dataLegalCase.email = ""
        this.disableEmail = false
      }
    }
  },
  methods: {
    getActuations() {
      axios.get(this.$store.getters.api + '/api/v1/actuations')
        .then(res => this.actuations = res.data)
    },
    getCities() {
      this.$store.commit('setVueLoad', true)
      axios.get(this.$store.getters.api + '/api/v1/cities')
        .then(res => this.cities = res.data)
        .then( () => this.$store.commit('setVueLoad', false) )
    },
    getPartners() {
      axios.get(this.$store.getters.api + '/api/v1/partners')
      .then(res => this.partners = res.data)
      .catch(() => console.log('erro:', 'erro'))
    },
    sendCase() {
      if (this.$refs.formCase.validate())
      this.$store.commit('setVueLoad', true)
      this.dataLegalCase.city_id = this.citySelected.id
      this.dataLegalCase.actuation_id = this.actuationsSelected.id
      this.dataLegalCase.partner_id = this.partnersSelected.id

      axios.post(`${this.$store.getters.api}/api/v1/legal-case`, this.dataLegalCase)
        .then((res) => {
          this.$store.commit('setVueLoad', false)
          this.$store.dispatch('snackbar_success', 'Caso enviado com sucesso')
        })
        .catch(() => this.$$store.dispatch('snackbar_error', 'Erro, tente novamente'))
    }
  },
  created() {
    // pega os serviços e as cidades ao iniciar o componente para carregá-los nos selects
    this.getActuations()
    this.getPartners()
    this.getCities()
  }
}
</script>