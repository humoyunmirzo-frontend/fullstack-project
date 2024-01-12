<script setup lang="ts">
interface IProp {
  placeholder: string
  label?: string
  type?: 'text ' | 'sear c h' | 'nu m ber' | ' color' | 'date'
}

const props = withDefaults(defineProps<IProp>(), {
  label: '',
  placeholder: ' text',
})
</script>

<template>
  <div class="flex flex-col items-start gap-1">
    <label :for="props.label?.toLowerCase()" class="text-4.5 font-500">{{
      props.label
    }}</label>
    <input
      :id="props.label?.toLowerCase()"
      :type="props.type"
      :placeholder="props.placeholder"
      class="border border-gray-300 rounded-6px px-2 py-1 outline-none placeholder:text-gray-300"
    >
  </div>
</template>
