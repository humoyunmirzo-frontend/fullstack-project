import { acceptHMRUpdate, defineStore } from 'pinia'
import http from '~/api/index'
import type { IPost, ITodo, IUser } from '~/interfaces'

interface IPaginate {
  total: number
  skip: number
  limit: number
}
interface IState {
  users: IUser[]
  user: IUser
  userPosts: IPost[]
  userTodos: ITodo[]
  limit: number
  paginate: IPaginate
  usersWithLimit: []
  total: number
}

export const useUsersStore = defineStore('users', {
  state: (): IState => ({
    users: [],
    user: [],
    userPosts: [],
    userTodos: [],
    usersWithLimit: [],
    limit: 25,
    paginate: {
      total: 0,
      skip: 0,
      limit: 0,
    },
    total: 0,
  }),
  actions: {
    async getUsers(text = '') {
      try {
        const res = await http.get(`/users/search?q=${text}&limit=${this.paginate.limit || this.limit}&skip=${this.paginate.skip}`)
        this.users = res.data.users
        const { total, skip } = res.data
        this.paginate = {
          total,
          skip,
          limit: this.limit,
        }
        this.total = res.data.total
      }
      catch (error) {
      }
    },
    async getUserById(id: number) {
      try {
        const res = await http.get(`/users/${id}`)
        this.user = res.data
      }
      catch (error) {
      }
    },
    async getUserPosts(id: number) {
      try {
        const res = await http.get(`/users/${id}/posts`)
        this.userPosts = res.data.posts
      }
      catch (error) {

      }
    },
    async getUserTodos(id: number) {
      try {
        const res = await http.get(`/users/${id}/todos`)
        this.userTodos = res.data.todos
      }
      catch (error) {

      }
    },
    async getUsersWithLimit(limit: string) {
      try {
        const res = await http.get(`/users?limit=${limit}&skip=10&select=firstName,lastName,image,username`)
        this.usersWithLimit = res.data.users
      }
      catch (error) {
      }
    },
    async createUser(user: { firstName: string, lastName: string, age: number }) {
      try {
        const res = await http.post('/users/add', { user })
        this.users.push(res.data)
      }
      catch (error) {

      }
    },
    async deleteUser(id: number) {
      try {
        await http.delete(`users/${id}`)
        const userIndex = this.users.findIndex((item: any) => item.id === id)
        this.users.splice(userIndex, 1)
      }
      catch (error) {

      }
    },
  },
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUsersStore as any, import.meta.hot))
