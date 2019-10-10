import Vue from 'vue';
import Router from 'vue-router';
import Home from './pages/Home.vue';

//Diligências
import EnviarDiligencia from './components/diligencias/Enviar.vue'

//Casos jurídicos
import enviarCasoJuridico from './components/casos/Enviar.vue'

Vue.use(Router);

export default new Router({
	base: process.env.BASE_URL,
	//mode: 'history',
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			children: [
						{
							path: '/diligencia/enviar',
							name: 'enviarDiligencia',
							component: EnviarDiligencia
						},
						{
							path: '/enviar-caso',
							name: 'enviarCasoJuridico',
							component: enviarCasoJuridico
						},
					],
				},
			],
});
