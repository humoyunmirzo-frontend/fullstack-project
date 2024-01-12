<script setup lang="ts">
interface IProp {
  total: number
  skip: number
  limit: number
}
const props = defineProps<IProp>()
const emit = defineEmits(['onPageChange'])
const pageCount = computed(() => {
  if (props.limit)
    return Math.ceil(props.total / props.limit)
  else return 0
},
)
const currentPage = computed(() => {
  if (props.limit)
    return Math.ceil(props.skip / props.limit) + 1
  else return 0
},
)
function changePage(page: number) {
  emit('onPageChange', page)
}
</script>

<template>
  <div class="flex items-center overflow-hidden rounded-8px">
    <button v-for="i in pageCount" :key="i" :class="currentPage === i ? 'bg-primary' : 'bg-secondary'" class="grid place-items-center border-e-1 border-e-white px-3.5 py-1.5 text-white" @click="changePage(i)">
      {{ i }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
button:last-child {
  @apply border-none;
}
</style>
