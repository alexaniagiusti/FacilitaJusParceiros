<template>
	<div class="expandeDiv" style="flex-direction: column">
		<v-layout>
			<v-flex xs12>
				<v-list pa-0 ma-0>
					<template v-for="(cidadesAtendidas, index) in itemsSelecionados">
						<v-list-item @click="" :key="cidadesAtendidas.city">
							<v-avatar class="ml-1">
								<v-icon color="green">done</v-icon>
							</v-avatar>
							<v-list-item-content>
								<v-list-item-title>
									{{ cidadesAtendidas.city }} - {{ cidadesAtendidas.state }}
								</v-list-item-title>
							</v-list-item-content>
							<v-list-item-action>
								<v-btn color="red" icon @click="removeItem(cidadesAtendidas.id)">
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
			<v-flex xs12>
				<v-card class="arredondaBorda">
					<div class="expandeDiv">
						<v-autocomplete
							v-model="pesquisa"
							:items="items"
							chips
							hide-no-data
							return-object
							label="Cidades Atendidas"
							item-text="city"
							item-value="city"
						>
							<template v-slot:selection="data">
								<v-chip
									v-bind="data"
									:input-value="data"
									close
									@click="data.item.city"
									@click:close="removeItem(data.item.id)"
								>
									<v-avatar class="elevation-1" left>
										<v-icon>place</v-icon>
									</v-avatar>
									{{ data.item.city }} - {{ data.item.state }}
								</v-chip>
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
					</div>
					<div class="linhaSemQuebra">
						<v-btn :disabled="carregandoSalvar" @click="salvar" block color="green" class="white--text mr-2">Salvar
							<v-icon color="white" size="18" class="ml-1">save</v-icon>
							<v-progress-circular class="ml-1" indeterminate size="18" color="white"
								v-if="carregandoSalvar"></v-progress-circular>
						</v-btn>
					</div>
				</v-card>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
	import axios from 'axios';

	export default {
		data() {
			return {
				pesquisa: '',
				carregandoDados: true,
				items: [],
				itemsSelecionado: '',
				itemsSelecionados: [],
				carregandoSalvar: false,
			};
		},
		watch: {
			pesquisa(val) {
				this.itemsSelecionados.push(val)
			}
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
			pegaItemsSelecionados() {
				this.$store.commit('setVueLoad', true)
				axios.get(`${this.$store.getters.api}/api/v1/users/cities/${this.$store.getters.getUsuario.id}`,
					{ headers: { Authorization: `Bearer ${this.$store.getters.getToken}` } })
					.then((res) => {
						this.$store.commit('setVueLoad', false)
						const ids_marcados = res.data.cities;
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
				axios.get(this.$store.getters.api + '/api/v1/cities',
					{ headers: { Authorization: `Bearer ${this.$store.getters.getToken}` } })
					.then((res) => {
						this.$store.commit('setVueLoad', false)
						this.items = res.data;
						this.pegaItemsSelecionados();
					});
			},
			salvar() {
				this.$store.commit('setVueLoad', true)
				this.carregandoSalvar = true;

				const service_id = [];
				const { itemsSelecionados } = this;
				itemsSelecionados.map(item => service_id.push(item.id));

				const data = {
					city_id: service_id,
				};

				axios.put(`${this.$store.getters.api}/api/v1/users/cities/${this.$store.getters.getUsuario.id}`, data,
					{ headers: { Authorization: `Bearer ${this.$store.getters.getToken}` } })
					.then((res) => {
						this.$store.commit('setVueLoad', false)
						this.carregandoSalvar = false;
						this.$store.dispatch('snackbar_success', 'Atualizado Com Sucesso!.');
					})
					.catch((err) => {
						this.$store.commit('setVueLoad', false)
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