import { acceptHMRUpdate, defineStore } from 'pinia'
import http from '~/api/index'
import type { IPost } from '~/interfaces'

interface IPaginate {
  total: number
  skip: number
  limit: number
}
interface IState {
  posts: IPost[]
  post: IPost
  comments: []
  postsWithLimit: []
  paginate: IPaginate
  limit: number
  total: number

}

export const usePostsStore = defineStore('posts', {
  state: (): IState => ({
    posts: [],
    post: [],
    comments: [],
    postsWithLimit: [],
    limit: 25,
    paginate: {
      total: 0,
      skip: 0,
      limit: 0,
    },
    total: 0,
  }),
  actions: {
    async getPosts(text = '') {
      try {
        const res = await http.get(`posts/search?q=${text}&limit=${this.paginate.limit || this.limit}&skip=${this.paginate.skip}`)
        this.posts = res.data.posts
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
    async  getPostById(id: number) {
      try {
        const res = await http.get(`/posts/${id}`)
        this.post = res.data
      }
      catch (error) {
      }
    },
    async  getPostComments(id: number) {
      try {
        const res = await http.get(`/posts/${id}/comments`)
        this.comments = res.data.comments
      }
      catch (error) {
      }
    },
    async getPostsWithLimit(limit: string) {
      try {
        const res = await http.get(`/posts?limit=${limit}`)
        this.postsWithLimit = res.data.posts
      }
      catch (error) {
      }
    },
    async createPost(title: string) {
      try {
        const res = await http.post('/posts/add', {
          title,
        }, {

        })
        this.posts.push(res.data)
      }
      catch (error) {

      }
    },
    async updatePost(id: number, title: string) {
      try {
        const res = await http.put(`/posts/${id}`, { title })
        const postIndex = this.posts.findIndex((item: any) => item.id === id)
        this.posts[postIndex] = res.data
        this.postsWithLimit[postIndex] = res.data
      }
      catch (error) {

      }
    },
    async deletePost(id: number) {
      try {
        await http.delete(`posts/${id}`)
        const postIndex = this.posts.findIndex((item: any) => item.id === id)
        this.posts.splice(postIndex, 1)
      }
      catch (error) {

      }
    },
  },
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePostsStore as any, import.meta.hot))
