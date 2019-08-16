<template>
  <v-container fluid>
    <div class="linhaSemQuebra">
      <v-toolbar>
        <span class="font-weight-light title">
          Envie sua diligência:
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
        <v-flex xs12 md3 pa-2>
          <v-autocomplete
          label="Serviço:"
          :items="services"
          v-model="serviceSelected"
          item-value="id"
          item-text="service"
          hide-no-data
          placeholder="Serviço que deseja solicitar"
          />

        </v-flex>
        <v-flex xs12 md3 pa-2>
         <v-autocomplete
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
        <v-flex xs12 md2 pa-2>
          <v-text-field
          label="Data:"
          v-model="date"
          placeholder="Em que dia:"
          >

          </v-text-field>
        </v-flex>
        <v-flex xs12 md1 pa-2>
          <v-text-field
          label="Horário:"
          v-model="hour"
          placeholder="Em qual horário?"
          >

          </v-text-field>
        </v-flex>
          <v-flex xs12 md3 pa-2>
          <v-select
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
            v-model="message"
            label="Fale um pouco mais sobre sua diligência:"
          >

          </v-textarea>
        </v-flex>

        <v-flex xs12 md12 pa-2>
          <v-btn
            block
            color="green"
            @click="sendDiligence"
          >
           <span
            class="font-weight-bold white--text"
           >
              Enviar
           </span>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/pt-br'
import { error } from 'util';

export default {
  data() {
    return {
      name: '',
      phone: '',
      email: '',
      semEmail: false,
      disableEmail: false,
      date: '',
      dateFormat: '',
      hour: '',
      message: '',
      cities: [],
      citySelected: '',
      services: [],
      serviceSelected: '',
      partners: [],
      partnersSelected: ''
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
    getServices() {
      axios.get(this.$store.getters.api + '/api/v1/services')
        .then(res => this.services = res.data)
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
    sendDiligence() {
      this.$store.commit('setVueLoad', true)
      const data = {
        name: this.name,
        phone: this.phone,
        email: this.email,
        message: this.semEmail ? '(Entrar em contao exclusicamente por telefone) ' + this.message : this.message,
        service_id: this.serviceSelected,
        city_id: this.citySelected.id,
        partner_id: this.partnersSelected.id,
        time: this.hour,
        date: this.dateFormat,
        //comoSoube: this.comoSoubeSelecionado
      }

      axios.post(`${this.$store.getters.api}/api/v1/diligences`, data)
        .then(() => {
          this.$store.commit('setVueLoad', false)
          this.$store.dispatch('snackbar_success', 'Diligência enviada com sucesso')
        })
        .catch(() => this.$$store.dispatch('snackbar_error', 'Erro, tente novamente'))
    }
  },
  created() {
    this.date = moment().format('DD[/]MM[/]YYYY')
    this.dateFormat = moment().format('YYYY[-]MM[-]DD')
    this.hour = moment().format('HH:mm')
    // pega os serviços e as cidades ao iniciar o componente para carregá-los nos selects
    this.getServices()
    this.getPartners()
    this.getCities()
  }
}
</script>
