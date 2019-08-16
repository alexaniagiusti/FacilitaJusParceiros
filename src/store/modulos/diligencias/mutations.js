export const mutationsDiligencias = {
  selecionar_diligencia(state, dados) {
    state.diligenciaSelecionada = dados
    state.modal = true
  },
  fecha_diligencia(state) {
    state.modal = false
  }
}

export default {}