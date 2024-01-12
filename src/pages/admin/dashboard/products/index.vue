<script lang="ts" setup>
import type { IProduct } from '~/interfaces'
import { useProductsStore } from '~/stores/products'

const router = useRouter()
function backPreviousRoute() {
  router.back()
}
const productsStore = useProductsStore()
const tableColumns: object[] = [
  {
    title: 'ID',
    value: 'id',
  },
  {
    title: 'Name',
    value: 'title',
  },
  {
    title: 'Category',
    value: 'category',
  },
  {
    title: 'Price',
    value: 'price',
  },
  {
    title: 'Discount',
    value: 'discountPercentage',
  },
  {
    title: 'Stock',
    value: 'stock',
  },
  {
    title: 'Image',
    value: 'image',
  },
  {
    title: 'Actions',
    value: 'actions',
  },
]
const showModal = ref<boolean>(false)
const searchInput = ref<string>('')
const state = ref<'show' | 'update' | 'create'>('show')
const filteredProducts = computed(() => {
  return productsStore.products
  // .filter(product =>
  //   product.title
  //     .toLowerCase()
  //     .trim()
  //     .includes(searchInput.value.toLowerCase().trim()),
  // )
})
onMounted(async () => {
  await productsStore.getProducts()
  await productsStore.getCategories()
})
function searchProducts() {
  productsStore.getProducts(searchInput.value)
}
const selectedCategory = ref<string>('all')
const productTitle = ref<string>('')
const activeProductId = ref<number>(0)
const defaultProduct: IProduct = {
  id: 0,
  title: '',
  description: '',
  price: 0,
  discountPercentage: 0,
  rating: 0,
  stock: 0,
  brand: '',
  category: '',
  thumbnail: '',
  images: [],
}
const activeProduct = ref<IProduct>(defaultProduct)
async function createNewProduct() {
  state.value = 'create'
  activeProduct.value = defaultProduct
  showModal.value = true
}
async function updateProductById(id: number) {
  state.value = 'update'
  showModal.value = true
  activeProductId.value = id
  productTitle.value = ''
}
async function deleteProductById(id: number) {
  await productsStore.deleteProduct(id)
}
async function onConfirmModal() {
  if (state.value === 'update') {
    await productsStore.updateProduct(
      activeProductId.value,
      productTitle.value,
    )
  }
  else if (state.value === 'create') {
    await productsStore.createProduct(productTitle.value)
  }
  else {
    return
  }
  productTitle.value = ''
}
async function showProduct(id: number) {
  const index = productsStore.products.findIndex((p: IProduct) => p.id === id)
  if (index >= 0) {
    activeProduct.value = productsStore.products[index]
    state.value = 'show'
    showModal.value = true
  }
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
</script>

<template>
  <h-modal
    v-model="showModal"
    :with-actions="state !== 'show'"
    closable
    @on-confirm="onConfirmModal"
  >
    <div class="py-3">
      <input
        v-if="state === 'update' || state === 'create'"
        v-model="productTitle"
        placeholder="Product name"
        class="border border-gray-300 rounded-6px px-2 py-1 outline-none placeholder:text-gray-300"
      >
      <div v-if="state === 'show'">
        <h-card :data="activeProduct">
          <div class="text-4">
            {{ activeProduct.title }}
          </div>
          <div class="text-4">
            Category: {{ activeProduct.category }}
          </div>
          <div class="text-4">
            Brand: {{ activeProduct.brand }}
          </div>
          <div class="text-4">
            Price: ${{ numeralFormat(activeProduct.price) }}
          </div>
          <div class="text-4">
            Discount: ${{ numeralFormat(activeProduct.discountPercentage) }}
          </div>
          <div class="text-4">
            Rating: {{ activeProduct.rating }}
          </div>
          <div class="text-4">
            Stock: {{ activeProduct.stock }}
          </div>
          <div class="text-4">
            Information: {{ activeProduct.description }}
          </div>
        </h-card>
      </div>
    </div>
  </h-modal>
  <div class="w-full flex flex-col items-start gap-4 px-60px py-24px">
    <div class="flex justify-start">
      <h-icon-button icon="ri-arrow-left-line" @click="backPreviousRoute" />
    </div>
    <div class="text-7 font-600">
      Products
    </div>

    <div class="w-full flex items-start justify-between">
      <div class="flex flex-col items-start gap-2">
        <input
          v-model="searchInput"
          type="search"
          placeholder="Search products"
          class="border border-gray-300 rounded-6px px-2 py-1 outline-none placeholder:text-gray-300"
          @keyup.enter="searchProducts"
        >
        <div class="text-4.5 font-500">
          Total products: {{ productsStore.products.length }}/{{
            productsStore.total
          }}
        </div>
      </div>
      <div class="flex flex-col items-start gap-2">
        <h-button prepend-icon="ri-add-line" @click="createNewProduct">
          Add new product
        </h-button>
        <select
          v-model="selectedCategory"
          class="decorated w-full border border-gray-300 rounded-6px bg-primary px-3.5 py-1.5 text-white outline-none placeholder:text-gray-300"
          @change="categoryChange"
        >
          <option
            v-for="category in productsStore.categories"
            :key="category"
            :value="category"
          >
            {{ category.charAt(0).toUpperCase() + category.slice(1) }}
          </option>
        </select>
        <h-pagination
          v-bind="productsStore.paginate"
          @on-page-change="pageChange"
        />
      </div>
    </div>
    <h-table :columns="tableColumns" :rows="filteredProducts">
      <template #image="{ data }">
        <img :src="data.images[0]" alt="" class="h-60px w-60px">
      </template>
      <template #price="{ data }">
        <td>${{ numeralFormat(data.price) }}</td>
      </template>
      <template #discountPercentage="{ data }">
        <td>${{ numeralFormat(data.discountPercentage) }}</td>
      </template>
      <template #actions="{ data }">
        <div class="flex items-center gap-1">
          <abbr title="See full information">
            <h-icon-button icon="ri-eye-line" @click="showProduct(data.id)" />
          </abbr>
          <abbr title="Update">
            <h-icon-button
              color="secondary"
              icon="ri-edit-line"
              @click="updateProductById(data.id)"
            />
          </abbr>
          <abbr title="Delete">
            <h-icon-button
              color="danger"
              icon="ri-delete-bin-line"
              @click="deleteProductById(data.id)"
            />
          </abbr>
        </div>
      </template>
    </h-table>
  </div>
</template>

<style lang="scss" scoped>

</style>
