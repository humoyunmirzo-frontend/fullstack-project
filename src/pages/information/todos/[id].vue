<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useTodosStore } from '~/stores/todos'

const route = useRoute()
const router = useRouter()
const id = route.params.id
const todosStore = useTodosStore()
onMounted(async () => {
  await todosStore.getTodoById(id)
})
function backPreviousRoute() {
  router.back()
}
</script>

<template>
  <div class="w-full flex flex-col gap-6 px-60px py-24px">
    <div class="w-full flex justify-start">
      <h-icon-button icon="ri-arrow-left-line" @click="backPreviousRoute" />
    </div>
    <div
      class="flex flex-col items-start justify-between gap-1 border border-gray-200 rounded-6px px-3 py-1 shadow-md duration-500 hover:shadow-lg"
    >
      <div class="text-5 font-600">
        Todo: {{ todosStore.todo.todo }}
      </div>
      <div class="text-primary">
        Status: {{ todosStore.todo.completed ? "Completed" : "Uncompleted" }}
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
  public: true
</route>
