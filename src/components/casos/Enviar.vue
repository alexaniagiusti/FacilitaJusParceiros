<template>
  <v-container fluid>
    <div class="linhaSemQuebra">
      <v-toolbar class="toolbarForm">
        <span class="font-weight-light title">
          Envie seu caso jurídico:
        </span>
      </v-toolbar>
    </div>
    <v-card class="pa-3">
      <v-layout row>
        <v-flex xs12 md4 pa-2>
          <v-text-field
          label="Nome:"
          v-model="name"
          placeholder="Qual o seu nome?"
          >
          </v-text-field>
        </v-flex>
  
        <v-flex xs12 md3 pa-2>
          <v-text-field
          label="Celular:"
          v-model="phone"
          placeholder="Qual o seu celular?"
          >

        </v-text-field>
      </v-flex>
        <v-flex xs12 md3 pa-2>
          <v-text-field
          label="E-mail:"
          v-model="email"
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
							v-model="citySelected"
							:items="cities"
							hide-no-data
							return-object
							label="Cidade"
              placeholder="Cidade"
							item-text="city"
							item-value="id"
              auto-complete="off"
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
        <v-flex pa-2 xs12 md4>
          <v-select
            :items="comoSoubeItens"
            v-model="comoSoubeSelecionado"
            label="Como nos conheceu?"
          ></v-select>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 md12 pa-2>
          <v-textarea
            v-model="message"
            label="Explique melhor a sua dúvida:"
          >

          </v-textarea>
        </v-flex>


        <v-flex xs12 md12 pa-2>
          <v-btn
            block
            color="green"
            @click="sendDiligence"
          >
            <span class="font-weight-bold white--text">Enviar</span>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import DisableAutocomplete from 'vue-disable-autocomplete';
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/pt-br'

export default {
  data() {
    return {
      name: '',
      phone: '',
      email: '',
      message: '',
      semEmail: false,
      disableEmail: false,
      cities: [],
      citySelected: '',
      actuations: [],
      actuationsSelected: '',
      comoSoubeItens: [
        'Teste',
        'Teste2'
      ],
      comoSoubeSelecionado: ''
    }
  },
  watch: {
    semEmail() {
      if(this.semEmail) {
        this.email = "teste@gmail.com"
        this.disableEmail = true
      } else {
        this.email = ""
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
    sendDiligence() {
      this.$store.commit('setVueLoad', true)
      const data = {
        name: this.name,
        phone: this.phone,
        email: this.email,
        message: this.semEmail === true ? '(Entrar em contao exclusicamente por telefone) ' + this.message : this.message,
        actuation_id: this.actuationSelected,
        city_id: this.citySelected.id,
        //comoSoube: this.comoSoubeSelecionado
      }

      axios.post(`${this.$store.getters.api}/api/v1/legal-cases`, data)
        .then(() => {
          this.$store.commit('setVueLoad', false)
          this.$store.dispatch('snackbar_success', 'Caso enviado com sucesso')
        })
        .catch(() => this.$$store.dispatch('snackbar_error', 'Erro, tente novamente'))
    }
  },
  created() {
    // pega os serviços e as cidades ao iniciar o componente para carregá-los nos selects
    this.getActuations()
    this.getCities()
  }
}
</script>