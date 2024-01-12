import { acceptHMRUpdate, defineStore } from 'pinia'
import http from '~/api'
import type { IUser } from '~/interfaces'

interface IState {
  user: IUser | null
}
export const useUserStore = defineStore('user', {
  state: (): IState => ({
    user: null,
  }),
  actions: {
    async login(data: any) {
      try {
        const res = await http.post('/auth/login', {
          username: data.username,
          password: data.password,
        })
        localStorage.setItem('token', res.data.token)
        if (res.data.token) {
          await this.getUser()
          return res.data.token
        }
      }
      catch (error) {

      }
    },
    async getUser() {
      try {
        const res = await http.get('/auth/me')
        this.user = res.data
      }
      catch (error) {

      }
    },
    async updateUser(id: number, firstName: string, lastName: string) {
      try {
        const res = await http.put(`/users/${id}`, { firstName, lastName })
        this.user = res.data
      }
      catch (error) {

      }
    },
  },
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
