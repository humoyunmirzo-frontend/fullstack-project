import { acceptHMRUpdate, defineStore } from 'pinia'
import http from '~/api/index'
import type { IProduct } from '~/interfaces'

interface IPaginate {
  total: number
  skip: number
  limit: number
}
interface IState {
  products: IProduct[]
  product: IProduct
  paginate: IPaginate
  productsWithLimit: []
  categories: string[]
  limit: number
  total: number
}

export const useProductsStore = defineStore('products', {
  state: (): IState => ({
    products: [],
    product: [],
    productsWithLimit: [],
    categories: [],
    limit: 25,
    paginate: {
      total: 0,
      skip: 0,
      limit: 0,
    },
    total: 0,
  }),
  actions: {
    async getProducts(text = '') {
      try {
        const res = await http.get(`/products/search?q=${text}&limit=${this.paginate.limit || this.limit}&skip=${this.paginate.skip}`)
        this.products = res.data.products
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
    async getCategories() {
      try {
        const res = await http.get('/products/categories')
        this.categories = res.data
      }
      catch (error) {
      }
    },
    async  getProductById(id: number) {
      try {
        const res = await http.get(`/products/${id}`)
        this.product = res.data
      }
      catch (error) {
      }
    },
    async getProductsByCategory(category: string) {
      try {
        const res = await http.get(`/products/category/${category}?limit=${this.paginate.limit || this.limit}&skip=${this.paginate.skip}`)
        this.products = res.data.products
        const { total, skip } = res.data
        this.paginate = {
          total,
          skip,
          limit: this.limit,
        }
      }
      catch (error) {
      }
    },
    async getProductsWithLimit(limit: string) {
      try {
        const res = await http.get(`/products?limit=${limit}&skip=10&select=title,price,images,rating,discountPercentage`)
        this.productsWithLimit = res.data.products
      }
      catch (error) {
      }
    },

    async createProduct(title: string) {
      try {
        const res = await http.post('/products/add', { title })
        this.products.push(res.data)
      }
      catch (error) {

      }
    },
    async updateProduct(id: number, title: string) {
      try {
        const res = await http.put(`/products/${id}`, { title })
        const productIndex = this.products.findIndex((item: any) => item.id === id)
        this.products[productIndex] = res.data
      }
      catch (error) {

      }
    },
    async deleteProduct(id: number) {
      try {
        await http.delete(`/products/${id}`)
        const productIndex = this.products.findIndex((item: any) => item.id === id)
        this.products.splice(productIndex, 1)
      }
      catch (error) {

      }
    },
  },
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useProductsStore as any, import.meta.hot))
