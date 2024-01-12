<script lang="ts" setup>
import { Icon } from '@iconify/vue'

interface IProp {
  icon: string
  size?: string
  color?: string
  disabled?: boolean
}
const props = withDefaults(defineProps<IProp>(), {
  size: 'md',
  color: 'primary',
  disabled: false,
})
</script>

<template>
  <button
    class="default"
    :class="`size-${props.size} color-${props.color}`"
    :disabled="props.disabled"
  >
    <Icon
      :icon="props.icon"
    />
  </button>
</template>

<style scoped lang="scss">
.default {
  @apply rounded-1 font-normal px-2 py-1 flex text-center justify-center items-center gap-1;
}
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
  @apply px-1.5 py-1.5 rounded-full text-3;
}
.size-md {
  @apply px-2 py-2 rounded-full  text-4.5;
}
.size-lg {
  @apply px-2.5 py-2.5 rounded-full text-5;
}
</style>
