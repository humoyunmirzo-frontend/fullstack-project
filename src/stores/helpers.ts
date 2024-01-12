import { acceptHMRUpdate, defineStore } from 'pinia'

interface IState {
  showOverlay: boolean
  showToast: boolean
}
export const useHelpersStore = defineStore('overlay', {
  state: (): IState => ({
    showOverlay: false,
    showToast: false,
  }),
  actions: {},
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useHelpersStore as any, import.meta.hot))
