<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useHelpersStore } from '~/stores/helpers'

const helpersStore = useHelpersStore()
</script>

<template>
  <main>
    <div v-if="helpersStore.showToast" class="absolute right-[24px] top-[24px] flex items-center gap-1 rounded-12px bg-danger px-6 py-4 text-white">
      <Icon icon="ri-error-warning-line" />
      <div>Check your network!</div>
    </div>
    <Overlay v-model="helpersStore.showOverlay" />

    <RouterView />
  </main>
</template>
~/stores/helpers
