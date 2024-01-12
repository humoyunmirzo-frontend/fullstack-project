<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface IProp {
  modelValue: boolean
}
const props = defineProps<IProp>()
</script>

<template>
  <div
    v-if="props.modelValue"
    class="fixed bottom-0 left-0 right-0 top-0 z-1000 grid place-items-center bg-black/40"
  >
    <Icon
      icon="ri-loader-2-line"
      class="animate-ping-with-spin h-16 w-16 text-primary/100"
    />
  </div>
</template>

<style>
.animate-ping-with-spin {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}
@keyframes ping {
  0% {
    transform: scale(1);
    opacity: 1;
    transform: rotate(0deg);
  }
  75%,
  100% {
    transform: scale(2);
    opacity: 0.9;
    transform: rotate(360deg);
  }
}
</style>
