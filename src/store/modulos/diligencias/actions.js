export const actionsDiligencias = {
  selecionar_diligencia({commit}, dados) {
    commit('selecionar_diligencia', dados)
  },
  fecha_diligencia({commit}) {
    commit('fecha_diligencia')
  }
}

export default {}