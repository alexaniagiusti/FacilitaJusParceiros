<template>
  <v-container fluid>
    <div class="linhaSemQuebra">
      <v-toolbar>
        <span class="font-weight-light title">Solicite um serviço:</span>
      </v-toolbar>
    </div>
    <v-card class="pa-3">
      <v-form ref="formDiligencia">
        <v-layout row>
          <v-flex xs12 md4 pa-2>
            <v-text-field
              :rules="nameRules"
              autocomplete="new-name"
              label="Nome:"
              v-model="dataDiligence.name"
              placeholder="Qual o seu nome?"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md3 pa-2>
            <v-text-field
              :rules="telefoneRules"
              v-mask="masktelefone"
              label="Celular:"
              v-model="dataDiligence.phone"
              placeholder="Qual o seu celular?"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md3 pa-2>
            <v-text-field
              :rules="emailRules"
              autocomplete="new-email"
              label="E-mail:"
              v-model="dataDiligence.email"
              :disabled="disableEmail"
              placeholder="Qual o seu e-mail?"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md2>
            <v-checkbox v-model="semEmail" label="Não tenho E-mail"></v-checkbox>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 md3 pa-2>
            <v-autocomplete
              autocomplete="new-service"
              :rules="serviceRules"
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
            <v-text-field
              label="Preço Sugerido:"
              v-model="dataDiligence.price"
              hint="Você mesmo pode colocar um preço"
              prefix="R$"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md3 pa-2>
            <v-autocomplete
              :rules="cityRules"
              autocomplete="new-city"
              v-model="citySelected"
              :items="cities"
              hide-no-data
              return-object
              label="Cidade"
              placeholder="Cidade"
              item-text="city"
              item-value="id"
            >
              <template v-slot:selection="data">{{ data.item.city }} - {{ data.item.state }}</template>
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
            <v-text-field label="Data:" v-model="dataDiligence.date" placeholder="Em que dia:"></v-text-field>
          </v-flex>
          <v-flex xs12 md1 pa-2>
            <v-text-field label="Horário:" v-model="hour" placeholder="Em qual horário?"></v-text-field>
          </v-flex>
          <v-flex xs12 md12 pa-2>
            <v-select
              :items="partners"
              :rules="partner"
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
              :rules="mensagem"
              v-model="dataDiligence.message"
              label="Fale um pouco mais sobre o serviço que deseja solicitar:"
            ></v-textarea>
          </v-flex>

          <v-flex xs12 md12 pa-2>
            <v-btn block color="green" @click="sendDiligence">
              <span class="font-weight-bold white--text">Enviar</span>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import moment from "moment";
import "moment/locale/pt-br";
import { error } from "util";
import { mask } from "vue-the-mask";

export default {
  directives: {
    mask
  },
  data() {
    return {
      dataDiligence: {
        name: "",
        phone: "",
        email: "",
        date: "",
        message: "",
        price: ""
      },
      hour: "",
      masktelefone: "(##) # #### ####",
      citySelected: "",
      serviceSelected: "",
      price: "",
      partnersSelected: "",
      semEmail: false,
      disableEmail: false,
      dateFormat: "",
      cities: [],
      services: [],
      partners: [],
      nameRules: [v => !!v || "Informe o seu nome por favor"],
      telefoneRules: [v => !!v || "Informe o seu telefone por favor"],
      emailRules: [v => !!v || "Informe o seu e-mail por favor"],
      cityRules: [v => !!v || "Selecione uma cidade favor"],
      serviceRules: [v => !!v || "Selecione um serviço por favor"],
      partner: [v => !!v || "Informe o parceiro"],
      mensagem: [v => !!v || "Escreva uma mensagem"]
    };
  },
  watch: {
    semEmail() {
      if (this.semEmail) {
        this.dataDiligence.email = "diligencias@facilitajus.com";
        this.disableEmail = true;
      } else {
        this.dataDiligence.email = "";
        this.disableEmail = false;
      }
    },
    serviceSelected() {
      if (this.serviceSelected !== "") {
        this.$store.commit("setVueLoad", true);
        axios
          .get(
            `${this.$store.getters.api}/api/v1/services-prices/${this.serviceSelected}`
          )
          .then(res => {
            this.dataDiligence.price = `${res.data[0].price}`;
          })
          .then(() => this.$store.commit("setVueLoad", false))
          .catch(err => console.log("erro: " + err));
      }
    }
  },
  methods: {
    getServices() {
      axios
        .get(this.$store.getters.api + "/api/v1/services")
        .then(res => (this.services = res.data));
    },
    getCities() {
      this.$store.commit("setVueLoad", true);
      axios
        .get(this.$store.getters.api + "/api/v1/cities")
        .then(res => (this.cities = res.data))
        .then(() => this.$store.commit("setVueLoad", false));
    },
    getPartners() {
      axios
        .get(this.$store.getters.api + "/api/v1/partners")
        .then(res => (this.partners = res.data))
        .catch(() => console.log("erro:", "erro"));
    },
    semEmailTeste() {
      if (this.email == "" && this.email == false) {
        this.email = "teste@gmail.com";
      }
    },

    sendDiligence() {
      if (this.$refs.formDiligencia.validate()) {
        this.$store.commit("setVueLoad", true);
        this.dataDiligence.partner_id = this.partnersSelected.id;
        this.dataDiligence.service_id = this.serviceSelected;
        this.dataDiligence.city_id = this.citySelected.id;
        this.dataDiligence.time = this.hour;
        this.dataDiligence.date = this.dateFormat;

        axios
          .post(
            `${this.$store.getters.api}/api/v1/diligence`,
            this.dataDiligence
          )
          .then(res => {
            this.$store.commit("setVueLoad", false);
            this.$store.dispatch(
              "snackbar_success",
              "Diligência enviada com sucesso"
            );
          })
          .catch(() =>
            this.$$store.dispatch("snackbar_error", "Erro, tente novamente")
          );
      } else {
        this.$$store.dispatch(
          "snackbar_warning",
          "Erro, Preencha todos os dados"
        );
      }
    }
  },
  created() {
    this.dataDiligence.date = moment().format("DD[/]MM[/]YYYY");
    this.dateFormat = moment().format("YYYY[-]MM[-]DD");
    this.hour = moment().format("HH:mm");
    // pega os serviços e as cidades ao iniciar o componente para carregá-los nos selects
    this.getServices();
    this.getPartners();
    this.getCities();
  }
};
</script>
