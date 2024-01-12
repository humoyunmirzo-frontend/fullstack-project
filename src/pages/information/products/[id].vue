<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '~/stores/products'

const route = useRoute()
const router = useRouter()
const id = route.params.id
const productsStore = useProductsStore()
onMounted(async () => {
  await productsStore.getProductById(id)
})
function backPreviousRoute() {
  router.back()
}
</script>

<template>
  <div class="w-full flex flex-col items-start gap-10 px-60px py-24px">
    <div class="w-full flex justify-start">
      <h-icon-button icon="ri-arrow-left-line" @click="backPreviousRoute" />
    </div>
    <div class="grid grid-cols-1 h-full w-full items-start justify-between gap-25 border rounded-8px px-4 py-2 md:grid-cols-2">
      <div class="overflow-hidden duration-300">
        <img :src="productsStore.product.images ? productsStore.product.images[0] : ''" class="h-500px w-400px cursor-zoom-in object-cover duration-300 hover:scale-[1.1]" alt="">
      </div>
      <div class="h-full flex flex-col items-end justify-between gap-1">
        <div class="flex flex-col items-start self-start gap-1">
          <div class="text-7 font-600">
            {{ productsStore.product.title }}
          </div>
          <div class="text-5 font-500">
            Category: {{ productsStore.product.category }}
          </div>
          <div class="text-5 font-500">
            Brand: {{ productsStore.product.brand }}
          </div>
          <div class="flex gap-1 text-5 font-500">
            Price: <div class="text-primary">
              ${{ numeralFormat(productsStore.product.price / productsStore.product.discountPercentage) }}
            </div>
          </div>
          <div class="flex gap-1 text-5 font-500">
            Discount: <div class="text-primary">
              ${{ numeralFormat(productsStore.product.discountPercentage) }}
            </div>
          </div>
          <div class="text-5 font-500">
            Rating: {{ productsStore.product.rating }}
          </div>
          <div class="text-5 font-500">
            Stock: {{ productsStore.product.stock }}
          </div>
          <div class="text-5 font-500">
            Information: {{ productsStore.product.description }}
          </div>
        </div>
        <h-button prepend-icon="ri-shopping-cart-line" class="flex self-end">
          Add to cart
        </h-button>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
  public: true
</route>
