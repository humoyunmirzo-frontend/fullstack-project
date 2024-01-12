<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '~/stores/products'

const router = useRouter()

const productsStore = useProductsStore()
onMounted(async () => {
  await productsStore.getProductsWithLimit('20')
})
function showProduct(id: number) {
  router.push(`/information/products/${id}`)
}
</script>

<template>
  <div>
    <div class="mb-12 w-full gap-8 text-center text-8 font-600">
      Products
    </div>
    <div class="grid grid-cols-1 mb-12 items-stretch gap-6 md:grid-cols-4 sm:grid-cols-2">
      <TransitionGroup name="list">
        <h-card v-for="product in productsStore.productsWithLimit" :key="product.id" class="w-full cursor-pointer" :data="product" @click="showProduct(product.id)">
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
    <div class="w-full flex justify-center">
      <router-link to="/information/products">
        <h-button class="mb-12" append-icon="ri-arrow-right-line">
          More products
        </h-button>
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
ul {
  @apply flex flex-col items-start justify-between gap-1 border border-gray-200 rounded-6px shadow-md duration-500 hover:translate-y-[-12px] hover:shadow-lg;
}
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
</route>
