<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useTodosStore } from '~/stores/todos'

const router = useRouter()
const todosStore = useTodosStore()
onMounted(async () => {
  await todosStore.getTodosWithLimit('20')
})
function showTodo(id: number) {
  router.push(`/information/todos/${id}`)
}
</script>

<template>
  <div>
    <div class="mb-12 w-full gap-8 text-center text-8 font-600">
      Todos
    </div>
    <div class="grid grid-cols-1 mb-12 items-stretch gap-6 md:grid-cols-4 sm:grid-cols-2">
      <TransitionGroup name="list">
        <h-card v-for="todo in todosStore.todosWithLimit" :key="todo.id" class="w-full cursor-pointer" :data="todo" @click="showTodo(todo.id)">
          <div class="text-5 font-600">
            {{ todo.todo }}
          </div>

          <div class="text-primary">
            Status: {{ todosStore.todo.completed ? 'Completed' : 'Uncompleted' }}
          </div>
        </h-card>
      </TransitionGroup>
    </div>
    <div class="w-full flex justify-center">
      <router-link to="/information/todos">
        <h-button class="mb-12" append-icon="ri-arrow-right-line">
          More todos
        </h-button>
      </router-link>
    </div>
  </div>
</template>

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
<route lang="yaml">
meta:
  layout: home
</route>
