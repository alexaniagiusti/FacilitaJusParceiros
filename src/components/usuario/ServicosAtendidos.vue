<template>
	<div class="expandeDiv" style="flex-direction: column">
		<v-layout>
			<v-flex xs12>
				<v-list pa-0 ma-0>
					<template v-for="(servicoAtendido, index) in itemsSelecionados">
						<v-list-item @click="" :key="servicoAtendido.service">
							<v-avatar class="ml-1">
								<v-icon color="green">done</v-icon>
							</v-avatar>
							<v-list-item-content>
								<v-list-item-title>
									{{ servicoAtendido.service }}
								</v-list-item-title>
							</v-list-item-content>
							<v-list-item-action>
								<v-btn color="red" icon @click="removeItem(servicoAtendido.id)">
									<v-icon size="18" color="grey darken-2">
										delete
									</v-icon>
								</v-btn>
							</v-list-item-action>
						</v-list-item>
						<v-divider :key="index"></v-divider>
					</template>
				</v-list>
			</v-flex>
		</v-layout>

		<v-layout justify-center>
			<v-flex class="pa-2" xs12>

				<v-card class="arredondaBorda">
					<div class="expandeDiv">
						<v-combobox :items="items" v-model="itemsSelecionados" return-object item-value="service"
							item-text="service" :hide-selected="true" label="Serviços Atendidos" :multiple="true"
							:small-chips="true" />
					</div>
				</v-card>

				<v-flex xs12>
					<div class="linhaSemQuebra">
						<v-btn :disabled="carregandoSalvar" @click="salvar" block color="green" class="white--text mr-2">Salvar
							<v-icon color="white" size="18" class="ml-1">save</v-icon>
							<v-progress-circular class="ml-1" indeterminate size="18" color="white"
								v-if="carregandoSalvar"></v-progress-circular>
						</v-btn>
					</div>
				</v-flex>

			</v-flex>
		</v-layout>
	</div>
</template>

<script>
	import axios from 'axios';

	export default {
		data() {
			return {
				carregandoDados: true,
				items: [],
				itemsSelecionados: [],
				carregandoSalvar: false,
			};
		},
		methods: {
			removeItem(id) {
				const selecionados = this.itemsSelecionados;
				const novos = [];

				selecionados.map((item) => {
					if (item.id === id) {
					} else {
						novos.push(item);
					}
				});

				this.itemsSelecionados = novos;
			},
			pegaItemsSeecionados() {

				axios.get(`${this.$store.getters.api}/api/v1/users/services/${this.$store.getters.getUsuario.id}`, { headers: { Authorization: `Bearer ${this.$store.getters.getToken}` } })
					.then((res) => {
						const ids_marcados = res.data.services;
						const todos = this.items;
						const itemsMarcados = [];

						todos.map((item) => {
							ids_marcados.map((i) => {
								if (i.id === item.id) {
									itemsMarcados.push(item);
								}
							});
						});

						this.itemsSelecionados = itemsMarcados;
						this.carregandoDados = false
					});
			},
			pegaDados() {
				this.$store.commit('setVueLoad', true)
				axios.get(`${this.$store.getters.api}/api/v1/services`, { headers: { Authorization: `Bearer ${this.$store.getters.getToken}` } })
					.then((res) => {
						this.$store.commit('setVueLoad', false)
						this.items = res.data;
					})
					.catch((erro) => {
						this.$store.commit('setVueLoad', false)
						this.$store.dispatch('snackbar_error', 'Erro: ' + erro)
					})
				this.pegaItemsSeecionados();
			},
			salvar() {
				this.carregandoSalvar = true;

				const service_id = [];
				const { itemsSelecionados } = this;
				itemsSelecionados.map(item => service_id.push(item.id));

				const data = {
					service_id
				};

				axios.put(`${this.$store.getters.api}/api/v1/users/services/${this.$store.getters.getUsuario.id}`, data, { headers: { Authorization: `Bearer ${this.$store.getters.getUsuario.token}` } })
					.then((res) => {
						this.carregandoSalvar = false;
						this.$store.dispatch('snackbar_success', 'Atualizado Com Sucesso!.');
					})
					.catch((err) => {
						this.carregandoSalvar = false;
						this.$store.dispatch('snackbar_error', err);
					});
			},
		},
		created() {
			this.pegaDados();
		},
	};
</script>

<style>
	.arredondaBorda {
		border-radius: 6px;
		padding: 10px;
	}
</style>