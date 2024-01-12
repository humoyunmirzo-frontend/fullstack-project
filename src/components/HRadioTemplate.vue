<script setup lang="ts">
interface IProp {
  modelValue: any
  value: any
  uniqueKey?: string
}
const props = withDefaults(defineProps<IProp>(), {
  uniqueKey: 'id',
})
const emit = defineEmits(['update:model-value'])
const isChecked = computed(() => {
  if (typeof props.value === 'object')
    return props.modelValue[props.uniqueKey] === props.value[props.uniqueKey]
  else
    return props.modelValue === props.value
})
function check() {
  emit('update:model-value', props.value)
}
</script>

<template>
  <div @click="check">
    <slot :checked="isChecked" :data="props.modelValue" />
  </div>
</template>

<style lang="scss" scoped>
</style>
