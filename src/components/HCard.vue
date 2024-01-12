<script setup lang="ts">
interface IProp {
  data?: any
}
const props = defineProps<IProp>()
</script>

<template>
  <div class="flex flex-col items-start justify-between gap-1 border border-gray-200 rounded-6px shadow-md duration-500">
    <img
      v-if="props.data.images || props.data.image"
      :src="props.data.images ? props.data.images[0] : props.data.image"
      class="h-200px w-300px object-contain"
      alt=""
    >
    <div class="w-full flex flex-1 flex-col justify-between px-3 pb-1">
      <slot class="w-full flex flex-col justify-between" />
    </div>
  </div>
</template>
