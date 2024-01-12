<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '~/stores/products'

const productsStore = useProductsStore()
const router = useRouter()
onMounted(async () => {
  productsStore.limit = 35
  await productsStore.getProducts()
  await productsStore.getCategories()
})
const searchInput = ref<string>('')
const selectedCategory = ref<string>('')
const filteredProducts = computed(() => {
  return productsStore.products
})
function showProduct(id: number) {
  router.push(`/information/products/${id}`)
}
function searchProduct() {
  productsStore.getProducts(searchInput.value)
}
function pageChange(pageNumber: number) {
  productsStore.paginate.skip = (pageNumber - 1) * productsStore.paginate.limit
  if (selectedCategory.value)
    productsStore.getProductsByCategory(selectedCategory.value)
  else productsStore.getProducts()
}

function categoryChange() {
  productsStore.getProductsByCategory(selectedCategory.value)
}
function backPreviousRoute() {
  router.back()
}
</script>

<template>
  <div class="flex flex-col gap-24px px-60px py-24px">
    <div class="w-full flex justify-start">
      <h-icon-button icon="ri-arrow-left-line" @click="backPreviousRoute" />
    </div>
    <div class="w-full text-center text-8 font-600">
      Products
    </div>
    <div class="flex justify-center">
      <input
        v-model="searchInput"
        type="search"
        placeholder="Search products"
        class="border border-gray-300 rounded-6px px-2 py-1 outline-none placeholder:text-gray-300"
        @keyup.enter="searchProduct"
      >
    </div>
    <div class="w-full flex justify-end">
      <h-pagination
        v-bind="productsStore.paginate"
        @on-page-change="pageChange"
      />
    </div>
    <div class="grid grid-cols-4 items-start gap-10">
      <div class="col-span-1 flex flex-col overflow-hidden border rounded-8px">
        <div v-for="category in productsStore.categories" :key="category" :class="selectedCategory === category ? 'bg-primary text-white' : ''" class="w-full flex flex-col cursor-pointer border-b-1 px-2 py-1 text-4.5 font-500 hover:bg-primary hover:text-white" @click=" selectedCategory = category; categoryChange();">
          {{ category.charAt(0).toUpperCase() + category.slice(1) }}
        </div>
      </div>
      <div class="col-span-3 flex flex-col">
        <div class="grid grid-cols-1 mb-12 items-stretch gap-6 md:grid-cols-4 sm:grid-cols-2">
          <TransitionGroup name="list">
            <h-card v-for="product in filteredProducts" :key="product.id" class="w-full cursor-pointer" :data="product" @click=" showProduct(product.id)">
              <div class="text-5 font-600">
                {{ product.title }}
              </div>
              <div class="text-primary line-through">
                ${{ numeralFormat(product.price) }}
              </div>
              <div class="text-primary">
                ${{ numeralFormat(product.price - product.discountPercentage) }}
              </div>
              <div class="flex items-center gap-1 text-yellow">
                <Icon icon="ri-star-fill" />
                {{ product.rating }}
              </div>
              <h-button class="mt-4 w-full">
                Show
              </h-button>
            </h-card>
          </TransitionGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

<route lang="yaml">
meta:
  layout: home
  public: true
</route>
