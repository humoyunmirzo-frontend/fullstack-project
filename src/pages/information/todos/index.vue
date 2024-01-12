<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useTodosStore } from '~/stores/todos'

const todosStore = useTodosStore()
const router = useRouter()
onMounted(async () => {
  await todosStore.getTodos()
})
const searchInput = ref<string>('')
const filteredTodos = computed(() => {
  return todosStore.todos.filter(todo => todo.todo.toLowerCase().trim().includes(searchInput.value.toLowerCase().trim()))
})
function pageChange(pageNumber: number) {
  todosStore.paginate.skip = (pageNumber - 1) * todosStore.paginate.limit
  todosStore.getTodos()
}
function showTodo(id: number) {
  router.push(`/information/todos/${id}`)
}
function backPreviousRoute() {
  router.back()
}
</script>

<template>
  <div class="flex flex-col gap-24px px-60px py-24px">
    <div class="w-full flex justify-start">
      <h-icon-button icon="ri-arrow-left-line" @click="backPreviousRoute" />
    </div>
    <div class="w-full gap-8 text-center text-8 font-600">
      Todos
    </div>
    <div class="flex justify-center">
      <input
        v-model="searchInput"
        type="search"
        placeholder="Search todo"
        class="border border-gray-300 rounded-6px px-2 py-1 outline-none placeholder:text-gray-300"
      >
    </div>
    <div class="w-full flex justify-end">
      <h-pagination v-bind="todosStore.paginate" @on-page-change="pageChange" />
    </div>

    <div class="grid grid-cols-1 mb-12 items-stretch gap-6 md:grid-cols-4 sm:grid-cols-2">
      <TransitionGroup name="list">
        <h-card v-for="todo in filteredTodos" :key="todo.id" class="w-full cursor-pointer" :data="todo" @click="showTodo(todo.id)">
          <div class="text-5 font-600">
            {{ todo.todo }}
          </div>
          <div class="text-primary">
            Status: {{ todosStore.todo.completed ? 'Completed' : 'Uncompleted' }}
          </div>
        </h-card>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

<route lang="yaml">
meta:
  layout: home
  public: true
</route>
