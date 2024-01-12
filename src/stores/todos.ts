import { acceptHMRUpdate, defineStore } from 'pinia'
import http from '~/api/index'
import type { ITodo } from '~/interfaces'

interface IPaginate {
  total: number
  skip: number
  limit: number
}
interface IState {
  todos: ITodo[]
  todo: ITodo
  todosWithLimit: []
  paginate: IPaginate
  limit: number
  total: number
}

export const useTodosStore = defineStore('todos', {
  state: (): IState => ({
    todos: [],
    todo: [],
    todosWithLimit: [],
    limit: 25,
    paginate: {
      total: 0,
      skip: 0,
      limit: 0,
    },
    total: 0,
  }),
  actions: {
    async getTodos() {
      try {
        const res = await http.get(`/todos?q=limit=${this.paginate.limit || this.limit}&skip=${this.paginate.skip}`)
        const { total, skip } = res.data
        this.paginate = {
          total,
          skip,
          limit: this.limit,
        }
        this.todos = res.data.todos
        this.total = res.data.total
      }
      catch (error) {
      }
    },
    async  getTodoById(id: number) {
      try {
        const res = await http.get(`/todos/${id}`)
        this.todo = res.data
      }
      catch (error) {
      }
    },
    async getTodosWithLimit(limit: string) {
      try {
        const res = await http.get(`/todos?limit=${limit}&skip=10`)
        this.todosWithLimit = res.data.todos
      }
      catch (error) {
      }
    },
    async createTodo(todo: { todo: string, completed: boolean }) {
      try {
        const res = await http.post('/add', {
          todo,
        })
        this.todos.push(res.data)
      }
      catch (error) {

      }
    },
    async updateTodo(id: number, completed: boolean) {
      try {
        const res = await http.put(`todos/${id}`, {
          completed,
        })
        const todoIndex = this.todos.findIndex((item: any) => item.id === id)
        this.todos[todoIndex] = res.data
        this.todosWithLimit[todoIndex] = res.data
      }
      catch (error) {

      }
    },
    async deleteTodo(id: number) {
      try {
        await http.delete(`posts/${id}`)
        const todoIndex = this.todos.findIndex((item: any) => item.id === id)
        this.todos.splice(todoIndex, 1)
      }
      catch (error) {

      }
    },
  },
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTodosStore as any, import.meta.hot))
