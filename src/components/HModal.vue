<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface IProp {
  modelValue: boolean
  closable?: boolean
  withActions?: boolean
}

const props = withDefaults(defineProps<IProp>(), {
  modelValue: false,
  closable: false,
  withActions: false,
})
const emit = defineEmits(['update:modelValue', 'onCancel', 'onConfirm'])

function cancel() {
  emit('update:modelValue', false)
  emit('onCancel', 'Clicked Cancel Dialog')
}
function confirm() {
  emit('update:modelValue', false)
  emit('onConfirm', 'Clicked Confirm Dialog')
}
</script>

<template>
  <div v-show="props.modelValue" class="fixed bottom-0 left-0 right-0 top-0 z-1000 grid place-items-center bg-gray-600/40">
    <div class="max-h-90vh w-75 flex flex-col overflow-y-scroll rounded-2 bg-white p-4 shadow-md">
      <div class="w-full flex justify-end">
        <Icon v-if="props.closable" icon="ri-close-line" class="h-6 w-6 cursor-pointer text-gray-500" @click="cancel" />
      </div>
      <slot class="w-full" />
      <div v-if="props.withActions" class="flex items-center justify-end gap-2">
        <slot name="actions">
          <button class="rounded-1 bg-red-500 px-2 py-1 text-center text-white" @click="cancel">
            Cancel
          </button>
          <button class="rounded-1 bg-blue-500 px-2 py-1 text-center text-white" @click="confirm">
            Confirm
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>
