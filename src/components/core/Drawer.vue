<template>
	<div>
		<v-app-bar class="elevation-0" color="#061161" app fixed>
			<v-btn @click="drawer=!drawer" mt-1 icon>
				<v-icon color="white" size="20">menu</v-icon>
			</v-btn>
			<v-spacer></v-spacer>
			<v-icon color="white">account_circle</v-icon>
		<!--	<span class="white--text ml-3 mr-5"> {{ nome }} </span>  -->
		</v-app-bar>
		<v-navigation-drawer v-model="drawer" width="250" class="grey lighten-4" app>
			<div class="mb-5"
				style="border-bottom:1px solid #E0E0E0;background: linear-gradient(to right, #fff, #fff); display: flex; width: 100%; align-items: center; flex-direction: column">
				<div @click="$router.push({name: 'home'})" class="mt-3 mb-2" style="display: flex">
					<img class="mt-2 animated delay-1s fadeIn"
						src="https://firebasestorage.googleapis.com/v0/b/centraldeoportunidades-de3a9.appspot.com/o/Untitled-1.png?alt=media&token=1ecc2ffb-2b00-492f-a05e-d5a7382990c7"
						height="40">
				</div>
			<!--	<h3 class="animated delay-1s fadeIn font-weight-light black--text">{{ nome }}</h3> -->

				<v-avatar style="bottom: -28px" color="white" v-if="masculino" size="70">
					<v-img style="border: 6px solid #fff"
						src="https://firebasestorage.googleapis.com/v0/b/centraldeoportunidades-de3a9.appspot.com/o/avatar.png?alt=media&token=51d40592-131a-4f3c-939c-b08fc1613842">
					</v-img>
				</v-avatar>

				<v-avatar style="bottom: -28px" v-if="feminino" color="white" size="70">
					<v-img style="border: 1px solid #E0E0E0"
						src="https://firebasestorage.googleapis.com/v0/b/centraldeoportunidades-de3a9.appspot.com/o/avatar2.png?alt=media&token=850d414f-4b73-4fe9-b63b-e79c8c01ac2f">
					</v-img>
				</v-avatar>

				<v-avatar style="bottom: -28px" v-if="semSexo" size="70">
					<v-img style="border: 6px solid #fff"
						src="https://firebasestorage.googleapis.com/v0/b/moneycareinvestment-01.appspot.com/o/cartoon-avatar.jpeg?alt=media&token=77a0ead3-2eff-41f0-a450-746368eac5e3">
					</v-img>
				</v-avatar>
			</div>
			<!-- Grupo com informações do perfil do usuário -->
			<v-list class="pa-0 mt-0">
				<!-- <v-subheader class="ml-3">
          INÍCIO
        </v-subheader> -->

				<v-list-item @click="$router.push({'name': 'enviarDiligencia'})">
					<v-icon class="mr-5">
						archive
					</v-icon>
					<v-list-item-content>
						<v-list-item-title class="ml-3">Enviar Diligência</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item @click="$router.push({'name': 'enviarCasoJuridico'})">
					<v-icon class="mr-5">
						archive
					</v-icon>
					<v-list-item-content>
						<v-list-item-title class="ml-3">Enviar Caso Jurídico</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

			</v-list>
		</v-navigation-drawer>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				masculino: false,
				feminino: false,
				semSexo: true,
				drawer: true,
			}
		}
	}
</script>