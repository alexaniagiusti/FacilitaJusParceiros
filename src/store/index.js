import Vue from 'vue';
import Vuex from 'vuex';

import { stateDiligencias } from './modulos/diligencias/state'
import { actionsDiligencias } from './modulos/diligencias/actions'
import { mutationsDiligencias } from './modulos/diligencias/mutations'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    diligencias: {
      state: {
        ...stateDiligencias
      },
      actions: {
        ...actionsDiligencias
      },
      mutations: {
        ...mutationsDiligencias
      }
    }
  },
  state: {
    vueLoad : false,
    usuario: sessionStorage.getItem('usuario') ? JSON.parse(sessionStorage.getItem('usuario')) : null,
    snackbar_error: {
      mostrar: false,
      mensagem: '',
    },
    snackbar_success: {
      mostrar: false,
      mensagem: '',
    },
    snackbar_warning: {
      mostrar: false,
      mensagem: '',
    },
    snackbar_info: {
      mostrar: false,
      mensagem: '',
    }
  },
  mutations: {
    setUser(state, n){
      state.usuario = n;
    },
    setVueLoad(state, status){
      state.vueLoad = status
    },
    desativa_snackbar(state) {
      state.snackbar_success = {
        mostrar: false,
        mensagem: '',
      }
      state.snackbar_error = {
        mostrar: false,
        mensagem: '',
      }
      state.snackbar_warning = {
        mostrar: false,
        mensagem: '',
      }
      state.snackbar_info = {
        mostrar: false,
        mensagem: '',
      }
    },
    snackbar_error(state, mensagem) {
      state.snackbar_error = {
        mostrar: true,
        mensagem,
      }
    },
    snackbar_success(state, mensagem) {
      state.snackbar_success = {
        mostrar: true,
        mensagem,
      }
    },
    snackbar_warning(state, mensagem) {
      state.snackbar_warning = {
        mostrar: true,
        mensagem,
      }
    },
    snackbar_info(state, mensagem) {
      state.snackbar_info = {
        mostrar: true,
        mensagem,
      }
    },
  },
  actions: {
    desativa_snackbar(state) {
      state.commit('desativa_snackbar');
    },
    // chama a mutation snackbar_error
    snackbar_error(state, mensagem) {
      state.commit('snackbar_error', mensagem);
    },
    // chama a mutation snackbar_success
    snackbar_success(state, mensagem) {
      state.commit('snackbar_success', mensagem);
    },
    snackbar_warning(state, mensagem) {
      state.commit('snackbar_warning', mensagem);
    },
    snackbar_info(state, mensagem) {
      state.commit('snackbar_info', mensagem);
    },
  },
  getters: {
    getUsuario: state =>{
      return state.usuario;
    },
    getToken: state =>{
      return state.usuario.token;
    },
    snackbar_success(state) {
      return state.snackbar_success
    },
    snackbar_error(state) {
      return state.snackbar_error
    },
    snackbar_warning(state) {
      return state.snackbar_warning
    },
    snackbar_info(state) {
      return state.snackbar_info
    },
    api() {
    //  return 'http://co.site';
      return 'https://api.facilitajus.com.br'
    },
  },
});
