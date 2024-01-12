<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { ComponentColors, ComponentSizes } from '~/types/index'

interface IProp {
  color?: ComponentColors
  size?: ComponentSizes
  prependIcon?: string
  appendIcon?: string
  disabled?: boolean
  loading?: boolean
}
const props = withDefaults(defineProps<IProp>(), {
  color: 'primary',
  size: 'md',
  prependIcon: '',
  appendIcon: '',
  disabled: false,
  loading: false,
})
</script>

<template>
  <button
    class="flex items-center justify-center gap-1 text-center"
    :class="`color-${props.color} size-${props.size} ${props.disabled && 'disabledClass'} ${props.loading && 'loadingClass'}`"
    :disabled="props.disabled"
  >
    <Icon v-if="props.prependIcon" :icon="props.prependIcon" />
    <Icon v-if="props.loading" icon="ri-loader-line" class="animate-spin" />
    <slot />
    <Icon v-if="props.appendIcon" :icon="props.appendIcon" />
  </button>
</template>

<style scoped lang="scss">
.color-primary {
  @apply bg-primary text-white hover:bg-primary/90 duration-300;
}
.color-secondary {
  @apply bg-secondary text-white hover:bg-secondary/90 duration-300;
}
.color-danger {
  @apply bg-danger text-white hover:bg-danger/90 duration-300;
}
.size-sm {
  @apply px-2.5 py-1 font-400 text-4 rounded-4px;
}
.size-md {
  @apply px-3 py-1.2 font-500 text-4.5 rounded-6px;
}
.size-lg {
  @apply px-3.5 py-1.5 font-600 text-5 rounded-8px;
}
.disabledClass {
  @apply cursor-default opacity-90;
}
.loadingClass {
  @apply cursor-not-allowed opacity-90;
}
</style>
